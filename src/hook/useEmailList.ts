//_______________________________________________
// メールリスト
import React, { useCallback } from "react";

import { EmailList, EmailListAll } from "~/util/mailingList/mail/GetEmailList";
import GetEmailList from "~/util/api/GetEmailList";
import useLoading from "./useLoading";
import { MailingList } from "~/util/mailingList/mailingList/GetMailingList";
import { RefreshMailListSocket } from "~/socket/client/mailingList";

//_______________________________________________
// カスタムフック

let emailListOg: EmailListAll = {}
let backKeyword = ""
export const useEmailList = () => {
  const [emailList, setEmailList] = React.useState<EmailListAll>({});
  const callbackEmailList = useCallback(setEmailList, [])
  const loading = useLoading();
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

    const mailList = await RefreshMailListSocket(
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
        "メーリングリストアドレス",
        "メールアドレス",
        "コメント",
        "投稿",
        "購読",
      ],
    ];
    Object.keys(list).forEach((mailingListAddress) => {
      const mailList = list[mailingListAddress];
      mailList.forEach(({ email, comment, post, subscribe }) => {
        data.push([
          mailingListAddress,
          email,
          comment,
          post ? "1" : "0",
          subscribe ? "1" : "0",
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
      return
    }
    Object.keys(emailListOg).forEach((key)=>{

      // メーリングリスト名に含まれる場合
      if(key.indexOf(keyword) > -1){
        next[key] = emailListOg[key]
        
        return
      }

      emailListOg[key].forEach((item)=>{

        // キーワードに一致しない
        if(item.comment.indexOf(keyword) < 0 && item.email.indexOf(keyword) < 0){
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
    setEmailListItem,
    setEmailList: setEmailListFunction,
    fn: { EmailListLoad, toCSV, filterList, MailListRefresh },
  };
};

export default useEmailList;
