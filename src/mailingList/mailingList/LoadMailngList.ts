import { LoadCSV } from "~/util/csv";
import { MailingList } from "./GetMailingList";

const FILE_NAME = "mailing_list.csv";

/**
 * メーリングリストのcsvを取得
 * @module delay
 * @param fileName 保存するファイル名
 * @param data 保存データ
 */
export const LoadMailingList = async () => {
  const list = await LoadCSV(FILE_NAME, {
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
