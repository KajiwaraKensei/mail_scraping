import { ResponseMailingListAddress } from "~/pages/api/mailing_list";

export const GetMailingList = () => {
  return fetch("/api/mailing_list") // apiからデータを取得
    .then((res) => {
      return res.json();
    })
    .then((r: ResponseMailingListAddress) => r);
};

export default GetMailingList;
