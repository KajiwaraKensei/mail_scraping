import { MailingList } from "./GetMailingList";

import { saveCSV } from "~/util/csv";

const FILE_NAME = "csv/mailing_list.csv";

/**
 * メーリングリストをcsvに保存
 * @module delay
 * @param fileName 保存するファイル名
 * @param data 保存データ
 */
export const SaveMailingList = (mailingList: MailingList): Promise<void> => {
  const saveData: string[][] = [
    ["メーリングリストアドレス", "コメント", "設定リンク"],
  ];
  mailingList.forEach((mail) => {
    saveData.push([mail.mail, mail.comment, mail.link]);
  });
  return saveCSV(saveData, FILE_NAME);
};
