import { ResponseEmailListAddress } from "~/pages/api/email_list";

export const GetMailingList = () => {
  return fetch("/api/email_list") // apiからデータを取得
    .then((res) => {
      return res.json();
    })
    .then((r: ResponseEmailListAddress) => r);
};

export default GetMailingList;
