//_______________________________________________
// メーリングリストhook
import React, { useCallback } from "react";
import { MailingList } from "~/util/mailingList/transferSetting/GetEmailAccount";
import { StoreContext } from "~/pages/_app";
import {
  RefreshMailAccountSocket,
} from "~/socket/client/transferSetting";
import GetMailingList from "~/util/api/GetMailAccounts";
import useLoading from "./useLoading";

//_______________________________________________
//　カスタムフック
export const useMailSetting = () => {
  const [mailSettings, setMailSettings] = React.useState<MailingList>([]);
  const callbackMailSettings = useCallback(setMailSettings, [])
  const loading = useLoading();
  const { state } = React.useContext(StoreContext);

  // メールアカウントロード
  React.useEffect(() => {
    if (state.login.state === true) {
      void EmailSettingLoad();
    }
  }, [state.login.state]);


  /**
   * メールアカウントを再取得する
   * @module EmailSettingRefresh
   */
  const EmailSettingRefresh = async () => {
    loading.setLoadingStart(); // 通信開始

    await RefreshMailAccountSocket(loading.setLoadingMessage)
      .then((list) => {
        console.log(list);

        callbackMailSettings(list);
        loading.setLoadingSuccess("");
        return list;
      })
      .catch(loading.setLoadingFail)
      .finally(loading.setLoadingFinish);

    return
  };

  /**
   * メールアカウントをサーバーから取得する
   * @module EmailSettingLoad
   */
  const EmailSettingLoad = () => {
    loading.setLoadingStart();
    GetMailingList()
      .then(async (res) => {
        if (res.success === true) {
          loading.setLoadingSuccess("");
          callbackMailSettings(res.list);
        } else {
          loading.setLoadingFail(res.error);
        }
      })
      .catch(loading.setLoadingFail)
      .finally(loading.setLoadingFinish);
  };



  return {
    loading: loading.loading,
    mailSettings,
    fn: { EmailSettingRefresh, EmailSettingLoad },
  };
};

export default useMailSetting;
