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
    setLoading(ResetLoading(message));
  };
  const setLoadingSuccess = (message: string) => {
    setLoading(setSuccessLoading(message));
  };

  const setLoadingFail = (message: string) => {
    setLoading(setFailLoading(message));
  };

  const setLoadingFinish = () => {
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
