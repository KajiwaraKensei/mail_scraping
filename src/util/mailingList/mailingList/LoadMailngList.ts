//_______________________________________________
// メーリングリスト読み込み
import { MailingList } from "./GetMailingList";
import { MAILING_LIST_CSV } from "~/conf/mailingList";
import { LoadCSV } from "~/util/csv";

/**
 * メーリングリストを読み込み
 * @module LoadMailingList
 */
export const LoadMailingList = async (path = MAILING_LIST_CSV): Promise<MailingList> => {
  const list = await LoadCSV(path, {
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
