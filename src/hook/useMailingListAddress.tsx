//_______________________________________________
// メーリングリストhook
import React, { useCallback } from "react";
import { MailingList } from "~/util/mailingList/mailingList/GetMailingList";
import { StoreContext } from "~/pages/_app";
import {
  RefreshMailingListSocket,
  RefreshMailListSocket,
} from "~/socket/client/mailingList";
import GetMailingList from "~/util/api/GetMailingList";
import useLoading from "./useLoading";

//_______________________________________________
//　カスタムフック
export const useMailingAddress = () => {
  const [mailingList, setMailingList] = React.useState<MailingList>([]);
  const callbackMailingList = useCallback(setMailingList, [])
  const loading = useLoading();
  const { state } = React.useContext(StoreContext);

  // メーリングリストアドレス取得
  React.useEffect(() => {
    if (state.login.state === true) {
      void MailingListLoad();
    }
  }, [state.login.state]);

  /**
   * メーリングリストを再取得する
   * @module MailingListRefresh
   */
  const MailingListRefresh = () => {
    loading.setLoadingStart(); // 通信開始

    return RefreshMailingListSocket(loading.setLoadingMessage)
      .then((list) => {
        callbackMailingList(list);
        loading.setLoadingSuccess("");
        return list;
      })
      .catch(loading.setLoadingFail)
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
          callbackMailingList(res.list);
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
