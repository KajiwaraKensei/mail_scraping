import { ResponseMailAccount } from "~/pages/api/mail_accounts";

export const GetMailingList = () => {
  return fetch("/api/mail_accounts") // apiからデータを取得
    .then((res) => {
      return res.json();
    })
    .then((r: ResponseMailAccount) => r);
};

export default GetMailingList;
