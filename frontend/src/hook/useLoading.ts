import React, { useState } from "react";
import {
  finishLoading,
  LoadingInit,
  ResetLoading,
  setFailLoading,
  setSuccessLoading,
} from "~/util/loading";

export const useLoading = () => {
  const [loading, setLoading] = useState(LoadingInit);
  const setLoadingStart = (message?: string) => {
    console.log("start", message);
    setLoading(ResetLoading(message));
  };
  const setLoadingSuccess = (message: string) => {
    console.log("success", message);
    setLoading(setSuccessLoading(message));
  };

  const setLoadingFail = (message: string) => {
    console.log("fail", message);
    setLoading(setFailLoading(message));
  };

  const setLoadingFinish = () => {
    console.log("finish");
    setLoading(finishLoading);
  };

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
