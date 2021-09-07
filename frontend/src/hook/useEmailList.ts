import React from "react";
import { EmailListAll } from "~/mailingList/mail/GetEmailList";
import GetEmailList from "~/util/api/GetEmailList";
import useLoading from "./useLoading";

//_______________________________________________
//　カスタムフック
export const useMailingAddress = () => {
  const [emailList, setEmailList] = React.useState<EmailListAll>();
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

  return {
    loading: loading.loading,
    emailList,
    fn: { EmailListLoad },
  };
};

export default useMailingAddress;
