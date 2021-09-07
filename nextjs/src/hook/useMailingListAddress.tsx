import React from "react";
import { MailingList } from "~/mailingList/mailingList/GetMailingList";

import { ResponseMailingListAddress } from "~/pages/api/mailing_list";
import { RefreshMailingListSocket } from "~/socket/client/mailingList";
import GetMailingList from "~/util/api/GetMailingList";
import useLoading from "./useLoading";
//_______________________________________________
//　カスタムフック
export const useMailingAddress = () => {
  const [mailingList, setMailingList] = React.useState<MailingList>([]);
  const loading = useLoading();
  // メーリングリストアドレス取得
  React.useEffect(() => {
    void MailingListLoad();
  }, []);

  /**
   * メーリングリストを再取得する
   * @module MailingListRefresh
   */
  const MailingListRefresh = () => {
    loading.setLoadingStart(); // 通信開始

    RefreshMailingListSocket(loading.setLoadingMessage)
      .then((list) => {
        setMailingList(list);
        loading.setLoadingSuccess("");
      })
      .catch(loading.setLoadingSuccess)
      .finally(loading.setLoadingFinish);
  };

  /**
   * メーリングリストをサーバーから取得する
   * @module MailingListLoad
   */
  const MailingListLoad = () => {
    loading.setLoadingStart();
    GetMailingList()
      .then((res) => {
        if (res.success === true) {
          loading.setLoadingSuccess("");
          setMailingList(res.list);
        } else {
          loading.setLoadingFail(res.error);
        }
      })
      .catch(loading.setLoadingFail)
      .finally(loading.setLoadingFinish);
  };

  return {
    loading: loading.loading,
    mailingList,
    fn: { MailingListRefresh, MailingListLoad },
  };
};

export default useMailingAddress;
