//_______________________________________________
// 通信
import { useState } from "react";
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

  /**
   * 通信開始
   * @param message セットしたいメッセージ
   */
  const setLoadingStart = (message?: string) => {
    console.log("start", message);
    setLoading(ResetLoading(message));
  };

  /**
   * 通信成功
   * @param message セットしたいメッセージ
   */
  const setLoadingSuccess = (message: string) => {
    console.log("success", message);
    setLoading(setSuccessLoading(message));
  };

  /**
   * 通信失敗
   * @param message セットしたいメッセージ
   */
  const setLoadingFail = (message: any) => {
    console.log("fail", message);
    setLoading(setFailLoading(message?.message || ""));
  };

  /**
   * 通信終了
   * @param message セットしたいメッセージ
   */
  const setLoadingFinish = () => {
    console.log("finish");
    setLoading(finishLoading);
  };

  /**
   * メッセージだけ更新
   * @param message セットしたいメッセージ
   */
  const setLoadingMessage = (message: string) => {
    setLoading((n) => ({ ...n, message }));
  };
  return {
    loading,
    setLoadingStart,
    setLoadingSuccess,
    setLoadingFail,
    setLoadingFinish,
    setLoadingMessage,
    setLoading,
  };
};

export default useLoading;
