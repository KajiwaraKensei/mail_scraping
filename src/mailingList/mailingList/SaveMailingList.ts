import { MailingList } from "./GetMailingList";

import { saveCSV } from "~/util/csv";

export const SaveMailingList = (mailingList: MailingList) => {
  const saveData: string[][] = [
    ["メーリングリストアドレス", "コメント", "設定リンク"],
  ];
  mailingList.forEach((mail) => {
    saveData.push([mail.mail, mail.comment, mail.link]);
  });
  return saveCSV(saveData, "mailing_list.csv");
};
