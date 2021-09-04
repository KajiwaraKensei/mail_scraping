import Nightmare from "nightmare";

import { LoginZenlogic } from "./login/LoginZenlogic";
import { GetEmailList, EmailList } from "./mail/GetEmailList";
import { GetMailingList } from "./mailingList/GetMailingList";
import { SaveMailingList } from "./mailingList/SaveMailingList";

export const MailingList = async () => {
  const n = new Nightmare({ show: true });
  await LoginZenlogic()(n); // ログイン

  const mailingList = await GetMailingList(n); // メーリングリスト一覧を取得
  void SaveMailingList(mailingList);

  const result: { [s: string]: EmailList } = {};
  for (const mail of mailingList) {
    //result[mail.mail] = await GetEmailList(mail.link)(n);
  }
  Object.keys(result).forEach((key) => {
    console.table(result[key]);
  });
};
