import Nightmare from "nightmare";

import { LoginZenlogic } from "./login/LoginZenlogic";
import { GetEmailList, EmailList } from "./mail/GetEmailList";
import { SaveEmailList } from "./mail/SaveEmailList";
import { GetMailingList } from "./mailingList/GetMailingList";
import { LoadMailingList } from "./mailingList/LoadMailngList";
import { SaveMailingList } from "./mailingList/SaveMailingList";

export const MailingList = async () => {
  const n = new Nightmare({ show: true });

  let mailingList = await LoadMailingList();
  console.log(mailingList);

  await LoginZenlogic()(n); // ログイン

  if (!mailingList.length) {
    console.log("更新");

    mailingList = await GetMailingList(n); // メーリングリスト一覧を取得
  }

  void SaveMailingList(mailingList);

  const result: { [s: string]: EmailList } = {};
  for (const mail of mailingList) {
    result[mail.mail] = await GetEmailList(mail.link)(n);
  }
  void SaveEmailList(result);

  Object.keys(result).forEach((key) => {
    console.table(result[key]);
  });
};
