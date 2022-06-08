import { InputHTMLAttributes, useCallback, useMemo, useState } from "react";
export const useInput = (
  initState?: string | null,
  inputProps?: InputHTMLAttributes<HTMLInputElement>
) => {
  const [value, setValue] = useState(initState || "");
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);


  return {
    ...inputProps,
    value,
    onChange: handleChange,
  };
};
