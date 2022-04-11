//_______________________________________________
// 通信
import { useCallback, useState } from "react";
import {
  finishLoading,
  LoadingInit,
  ResetLoading,
  setFailLoading,
  setSuccessLoading,
} from "~/util/loading";

//_______________________________________________
// メイン
export const useLoading = () => {
  const [loading, setLoading] = useState(LoadingInit);
  const callbackLoading = useCallback(setLoading, [])
  /**
   * 通信開始
   * @param message セットしたいメッセージ
   */
  const setLoadingStart = (message?: string) => {
    callbackLoading(ResetLoading(message));
  };

  /**
   * 通信成功
   * @param message セットしたいメッセージ
   */
  const setLoadingSuccess = (message: string) => {
    callbackLoading(setSuccessLoading(message));
  };

  /**
   * 通信失敗
   * @param message セットしたいメッセージ
   */
  const setLoadingFail = (message: any) => {
    callbackLoading(setFailLoading(message?.message || ""));
  };

  /**
   * 通信終了
   * @param message セットしたいメッセージ
   */
  const setLoadingFinish = () => {
    callbackLoading(finishLoading);
  };

  /**
   * メッセージだけ更新
   * @param message セットしたいメッセージ
   */
  const setLoadingMessage = (message: string) => {
    callbackLoading((n) => ({ ...n, message }));
  };
  return {
    loading,
    setLoadingStart,
    setLoadingSuccess,
    setLoadingFail,
    setLoadingFinish,
    setLoadingMessage,
    callbackLoading,
  };
};

export default useLoading;
