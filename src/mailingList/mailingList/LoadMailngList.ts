import { MailingList } from "./GetMailingList";

import { MAILING_LIST_CSV } from "~/conf/mailingList";
import { LoadCSV } from "~/util/csv";

/**
 * メーリングリストのcsvを取得
 * @module LoadMailingList
 * @param fileName 保存するファイル名
 * @param data 保存データ
 */
export const LoadMailingList = async (): Promise<MailingList> => {
  const list = await LoadCSV(MAILING_LIST_CSV, {
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
