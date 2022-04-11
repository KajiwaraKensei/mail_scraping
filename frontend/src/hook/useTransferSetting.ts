//_______________________________________________
// メールリスト
import React, { useCallback, useState } from "react";

import GetEmailList from "~/util/api/GetTransferSetting";
import useLoading from "./useLoading";
import { EmailList, EmailListAll } from "~/util/mailingList/transferSetting/GetTransferSetting";
import { RefreshTransferSettingSocket } from "~/socket/client/transferSetting";
import {MailingList} from "util/mailingList/transferSetting/GetEmailAccount"
//_______________________________________________
// カスタムフック

let emailListOg: EmailListAll = {}
let backKeyword = ""
export const useTransferSetting = () => {
  const [emailList, setEmailList] = React.useState<EmailListAll>({});
  const callbackEmailList = useCallback(setEmailList, [])
  const loading = useLoading();
  const [isAllShow, setIsAllShow] = useState(false)
  const callbackIsAllShow = useCallback(setIsAllShow, [])

  // メーリングリストアドレス取得
  React.useEffect(() => {
    void EmailListLoad();
  }, []);

  /**
   * メールリストをサーバーから取得する
   * @module EmailListLoad
   */
  const EmailListLoad = () => {
    loading.setLoadingStart();
    return GetEmailList()
      .then((res) => {
        if (res.success === true) {
          loading.setLoadingSuccess("");
          callbackEmailList(res.list);
          emailListOg = res.list;
          return res.list;
        } else {
          loading.setLoadingFail(res.error);
          return {};
        }
      })
      .catch(loading.setLoadingFail)
      .finally(loading.setLoadingFinish);
  };

  /**
   * @module setEmailListItem
   */
  const setEmailListItem = (key: string, item: EmailList) => {
    emailListOg = {...emailListOg, [key]: item}
    filterList()
  };

  const setEmailListFunction = (list: EmailListAll) => {
    callbackEmailList(list)
    emailListOg = list
    filterList()
  }


  /**
   * メールリストを再取得
   * @param mailingList メーリングリスト
   */
   const MailListRefresh = (mailingList: MailingList) => async () => {
    loading.setLoadingStart(); // 通信開始

    const mailList = await RefreshTransferSettingSocket(
      mailingList,
      loading.setLoadingMessage
    )
      .then((list) => {
        loading.setLoadingSuccess("");
        return list;
      })
      .catch(loading.setLoadingFail)
      .finally(loading.setLoadingFinish);
      mailList && setEmailListFunction(mailList)
    return mailList || {};
  };

  /**
   * メールリストをcsv形式に変換
   * @param list メールリスト
   * @returns CSV形式のメールリスト
   */
  const toCSV = (list: EmailListAll = emailList) => {
    const data: string[][] = [
      [
        "メールアカウント", "メールヘッダ", "条件",  "転送先メールアドレス"
    ],
    ];
    Object.keys(list).forEach((mailAccount) => {
      const mailList = list[mailAccount];
      mailList.forEach(({terms, head, forwardingAddress}) => {
        data.push([
        mailAccount,
          head,
          terms,
          forwardingAddress,
        ]);
      });
    });

    return data;
  };

  const filterList = (keyword: string = backKeyword) => {
    backKeyword = keyword;
    const next: EmailListAll = {}
    if(keyword === ""){
      callbackEmailList(emailListOg)
      callbackIsAllShow(true)
      return
    }
    callbackIsAllShow(false)
    Object.keys(emailListOg).forEach((key)=>{

      // メーリングリスト名に含まれる場合
      if(key.indexOf(keyword) > -1){
        next[key] = emailListOg[key]
        
        return
      }

      emailListOg[key].forEach((item)=>{

        // キーワードに一致しない
        if(item.terms.indexOf(keyword) < 0 && item.forwardingAddress.indexOf(keyword) < 0){
          return
        }
        // 初回限定
        if(next[key] === undefined){
          next[key] = []
        }
        next[key].push(item)
      })
    })
    callbackEmailList(next)
  }

  return {
    loading: loading.loading,
    emailList,
    isAllShow,
    setEmailListItem,
    setEmailList: setEmailListFunction,
    fn: { EmailListLoad, toCSV, filterList, MailListRefresh },
  };
};

export default useTransferSetting;
