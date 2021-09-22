import Nightmare from "nightmare";

import { LoginZenlogic } from "./login/LoginZenlogic";
import { GetEmailList, EmailList } from "./mail/GetEmailList";
import { SaveEmailList } from "./mail/SaveEmailList";
import { GetMailingList } from "./mailingList/GetMailingList";
import { SaveMailingList } from "./mailingList/SaveMailingList";

export const MailingList = async (): Promise<void> => {
  console.log(1);

  const n = new Nightmare({ show: false });

  await LoginZenlogic()(n); // ログイン
  let mailingList = await GetMailingList(n); // メーリングリスト一覧を取得
  void SaveMailingList(mailingList);

  const result: { [s: string]: EmailList } = {};
  for (const mail of mailingList) {
    result[mail.mail] = await GetEmailList(mail.link)(n);
  }
  void SaveEmailList(result);

  return;
};
