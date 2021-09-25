//_______________________________________________
// メーリングリストhook
import React from "react";
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

    RefreshMailingListSocket(loading.setLoadingMessage)
      .then((list) => {
        setMailingList(list);
        loading.setLoadingSuccess("");
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
          setMailingList(res.list);
        } else {
          loading.setLoadingFail(res.error);
        }
      })
      .catch(loading.setLoadingFail)
      .finally(loading.setLoadingFinish);
  };

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

    return mailList || {};
  };
  return {
    loading: loading.loading,
    mailingList,
    fn: { MailingListRefresh, MailingListLoad, MailListRefresh },
  };
};

export default useMailingAddress;
