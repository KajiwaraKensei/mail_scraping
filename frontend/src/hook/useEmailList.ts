//_______________________________________________
// メールリスト
import React from "react";

import { EmailList, EmailListAll } from "~/util/mailingList/mail/GetEmailList";
import GetEmailList from "~/util/api/GetEmailList";
import useLoading from "./useLoading";

//_______________________________________________
// カスタムフック
export const useEmailList = () => {
  const [emailList, setEmailList] = React.useState<EmailListAll>({});
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
    GetEmailList()
      .then((res) => {
        if (res.success === true) {
          loading.setLoadingSuccess("");
          setEmailList(res.list);
        } else {
          loading.setLoadingFail(res.error);
        }
      })
      .catch(loading.setLoadingFail)
      .finally(loading.setLoadingFinish);
  };

  /**
   * メールリストをサーバーから取得する
   * @module EmailListLoad
   */
  const setEmailListItem = (key: string, item: EmailList) => {
    setEmailList((n) => ({ ...n, [key]: item }));
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

  return {
    loading: loading.loading,
    emailList,
    setEmailListItem,
    setEmailList,
    fn: { EmailListLoad, toCSV },
  };
};

export default useEmailList;
