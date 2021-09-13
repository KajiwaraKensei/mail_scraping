import React from "react";

export type CheckList = { [key: string]: boolean };

export const useCheckList = (name: string) => {
  const getLocalStorage = () => {
    if (!localStorage) {
      return {};
    }
    const local = localStorage.getItem("check_list" + name);
    if (local === null) {
      return {};
    }

    const data: CheckList = JSON.parse(local);
    return data;
  };

  const refreshCheckList = () => {
    setCheckList(getLocalStorage);
  };

  const [checkList, setCheckList] = React.useState<CheckList>({});
  const changeCheckList = (key: string, value: boolean) => {
    setCheckList((n) => ({ ...n, [key]: value }));
  };

  const saveCheckList = () => {
    if (!localStorage) {
      return;
    }
    localStorage.setItem("check_list" + name, JSON.stringify(checkList));
  };

  const checkData = <T>(data: { [key: string]: T }) => {
    const pickup: { [key: string]: T } = {};
    Object.keys(data).forEach((key) => {
      if (checkList[key]) {
        pickup[key] = data[key];
      }
    });
    return pickup;
  };

  const checkAll = (keys?: string[]) => () => {
    setCheckList((n) => {
      const _n = JSON.parse(JSON.stringify(n));
      keys &&
        keys.forEach((key) => {
          _n[key] = true;
        });

      Object.keys(_n).forEach((k) => (_n[k] = true));
      console.log(n, _n);

      return _n;
    });
  };

  React.useEffect(() => {
    refreshCheckList();
  }, []);
  return {
    checkList,
    setCheckList,
    fn: {
      refreshCheckList,
      changeCheckList,
      saveCheckList,
      checkAll,
      checkData,
    },
  };
};

export default useCheckList;
