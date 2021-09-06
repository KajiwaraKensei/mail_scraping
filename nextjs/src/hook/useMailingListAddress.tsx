import React from "react";
import { MailingList } from "~/mailingList/mailingList/GetMailingList";
import {
  finishLoading,
  Loading,
  LoadingInit,
  ResetLoading,
  setFailLoading,
  setSuccessLoading,
} from "~/util/loading";
import { ResponseMailingListAddress } from "~/api/mailing_list/address_list";
import { RefreshMailingListSocket } from "~/socket/client/mailingList";

//_______________________________________________
//　カスタムフック
export const useMailingAddress = () => {
  const [mailingList, setMailingList] = React.useState<MailingList>([]);
  const [loading, setLoading] = React.useState<Loading>(LoadingInit);

  // メーリングリストアドレス取得
  React.useEffect(() => {
    void MailingListLoad();
  }, []);

  const setProcess = (process: string) => {
    setLoading((p) => ({ ...p, message: process }));
  };

  const MailingListRefresh = () => {
    setLoading(ResetLoading()); // 通信開始
    RefreshMailingListSocket(setProcess)
      .then((list) => {
        setMailingList(list);
        setLoading(setSuccessLoading()); // 通信成功
      })
      .catch((e) => {
        console.error(e);
        setLoading(setFailLoading("データの取得に失敗しました。" + e));
      })
      .finally(() => {
        setLoading(finishLoading); // 通信成功
      });
  };

  const MailingListLoad = () => {
    setLoading(ResetLoading()); // 通信開始
    fetch("/api/mailing_list/address_list") // apiからデータを取得
      .then((res) => res.json())
      .then((data: ResponseMailingListAddress) => {
        // 成功しているか？
        if (data.success) {
          setMailingList(data.list); // メーリングリストのアドレスを配列に入れる
          setLoading(setSuccessLoading()); // 通信成功
        } else {
          setLoading(
            setFailLoading("データの取得に失敗しました。" + data.error)
          ); // 通信失敗
        }
        return;
      })
      .catch((e) => {
        console.error(e);
        setLoading(setFailLoading("データの取得に失敗しました。" + e));
      })
      .finally(() => {
        setLoading(finishLoading); // 通信成功
      });
  };

  return { loading, mailingList, fn: { MailingListRefresh, MailingListLoad } };
};

export default useMailingAddress;
