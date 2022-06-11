//_______________________________________________
// メーリングリスト保存
import { MailingList } from "./GetEmailAccount";
import { saveCSV } from "~/util/csv";
import { MAIL_ACCOUNT_CSV } from "~/conf/mailingList"
const FILE_NAME = MAIL_ACCOUNT_CSV;

/**
 * メーリングリストをcsvに保存
 * @param mailingList メーリングリスト
 */
export const SaveEmailAccount = (mailingList: MailingList): Promise<void> => {
  const saveData = [["メールアカウント", "コメント", "設定リンク"]];
  mailingList.forEach((mail) => {
    saveData.push([mail.mail, mail.comment, mail.link]);
  });
  return saveCSV(saveData, FILE_NAME);
};
