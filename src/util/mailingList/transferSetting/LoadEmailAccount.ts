//_______________________________________________
// メーリングリスト読み込み
import { MailingList } from "./GetEmailAccount";
import { MAIL_ACCOUNT_CSV } from "~/conf/mailingList";
import { LoadCSV } from "~/util/csv";

/**
 * メーリングリストを読み込み
 * @module LoadEmailAccount
 */
export const LoadEmailAccount = async (): Promise<MailingList> => {
  const list = await LoadCSV(MAIL_ACCOUNT_CSV, {
    from_line: 2,
  }).catch((err) => {
    console.log(err);
    return [];
  });
  const data: MailingList = [];
  list.forEach((item) => {
    data.push({
      mail: item[0],
      link: item[2],
      comment: item[1],
    });
  });
  return data;
};
