export type Loading = {
  loading: boolean | undefined;
  isError: boolean;
  message: string;
};

export const LoadingInit: Loading = {
  loading: undefined,
  isError: false,
  message: "",
};

export const ResetLoading =
  (message?: string) =>
  (loading: Loading): Loading => {
    return {
      ...loading,
      loading: true,
      message: message || "",
      isError: false,
    };
  };

export const setSuccessLoading =
  (message?: string) =>
  (loading: Loading): Loading => {
    return {
      ...loading,
      message: message || "",
      isError: false,
    };
  };

export const setFailLoading =
  (message: string) =>
  (loading: Loading): Loading => {
    return {
      ...loading,
      message,
      isError: true,
    };
  };

export const finishLoading = (loading: Loading): Loading => {
  return {
    ...loading,
    loading: false,
  };
};
