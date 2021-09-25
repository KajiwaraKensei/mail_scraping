//_______________________________________________
// メーリングリスト保存
import { MailingList } from "./GetMailingList";
import { saveCSV } from "~/util/csv";
import {MAILING_LIST_CSV} from "~/conf/mailingList"
const FILE_NAME = MAILING_LIST_CSV;

/**
 * メーリングリストをcsvに保存
 * @param mailingList メーリングリスト
 */
export const SaveMailingList = (mailingList: MailingList): Promise<void> => {
  const saveData = [["メーリングリストアドレス", "コメント", "設定リンク"]];
  mailingList.forEach((mail) => {
    saveData.push([mail.mail, mail.comment, mail.link]);
  });
  return saveCSV(saveData, FILE_NAME);
};
