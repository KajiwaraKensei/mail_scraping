//_______________________________________________
// チェックリスト
import React, { useCallback, useState } from "react";

export type CheckList = { [key: string]: boolean };

//_______________________________________________
// メイン
export const useCheckList = (name: string) => {
  const [checkList, setCheckList] = React.useState<CheckList>({});
  const callbackCheckList = useCallback(setCheckList, [])

  /**
   * ローカルストレージからチェックリストを読み込み
   */
  const refreshCheckList = () => {
    callbackCheckList(() => getLocalStorage(name));
  };

  /**
   * チェックリスト変更
   * @param key キー
   * @param value 値
   */
  const changeCheckList = (key: string, value: boolean) => {
    callbackCheckList((n) => ({ ...n, [key]: value }));
    saveCheckList();
  };

  /**
   * チェックリスト保存
   */
  const saveCheckList = () => {
    if (!localStorage) {
      return;
    }
    localStorage.setItem("check_list" + name, JSON.stringify(checkList));
  };

  /**
   * チェックが入っているデータを取得
   * @param data チェックしたいデータ
   * @returns チェックしているデータ
   */
  const checkData = <T>(data: { [key: string]: T }) => {
    const pickup: { [key: string]: T } = {};
    Object.keys(data).forEach((key) => {
      if (checkList[key]) {
        pickup[key] = data[key];
      }
    });
    return pickup;
  };

  /**
   * 全てチェック
   * @param keys 追加でチェックしたいキー
   */
  const checkAll = (keys?: string[]) => () => {
    callbackCheckList((n) => {
      const _n = JSON.parse(JSON.stringify(n));
      keys &&
        keys.forEach((key) => {
          _n[key] = true;
        }); // 追加のキー

      Object.keys(_n).forEach((k) => (_n[k] = true));
      return _n;
    });
  };

  /**
   * チェックボックスの処理
   * @param keys イベントのキー
   */
  const handleChangeCheckBox =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      changeCheckList(key, e.target.checked);
    };

  // 読み込み時
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
      handleChangeCheckBox,
    },
  };
};

export default useCheckList;

/** ローカルストレージからチェックリストを読み込み
 * @returns 読み込み後のデータ
 */
const getLocalStorage = (name: string) => {
  if (!localStorage) {
    return {};
  }
  const local = localStorage.getItem("check_list_" + name);
  if (local === null) {
    return {};
  }

  const data: CheckList = JSON.parse(local);
  return data;
};
