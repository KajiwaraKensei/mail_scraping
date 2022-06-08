import { ResponseTransferSetting } from "~/pages/api/transfer_setting";

export const GetMailingList = () => {
  return fetch("/api/transfer_setting") // apiからデータを取得
    .then((res) => {
      return res.json();
    })
    .then((r: ResponseTransferSetting) => r);
};

export default GetMailingList;
