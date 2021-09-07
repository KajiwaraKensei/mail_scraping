import React from "react";
import { EmailList, EmailListAll } from "~/mailingList/mail/GetEmailList";
import GetEmailList from "~/util/api/GetEmailList";
import useLoading from "./useLoading";

//_______________________________________________
//　カスタムフック
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
          console.log(res);

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

  return {
    loading: loading.loading,
    emailList,
    setEmailListItem,
    setEmailList,
    fn: { EmailListLoad },
  };
};

export default useEmailList;
