import { EmailListAll } from "./GetEmailList";

import { MAIL_CSV } from "~/conf/mailingList";
import { LoadCSV } from "~/util/csv";

/**
 * メールのcsvを取得
 * @module LoadMailingList
 * @param fileName 保存するファイル名
 * @param data 保存データ
 */
export const LoadEmailList = async (): Promise<EmailListAll> => {
  const list = await LoadCSV(MAIL_CSV, {
    from_line: 2,
  });

  const data: EmailListAll = {};

  list.forEach((item) => {
    // 未定義の場合
    if (!data[item[0]]) {
      data[item[0]] = [];
    }

    // データ追加
    data[item[0]].push({
      email: item[1] || "",
      comment: item[2] || "",
      post: item[3] === "1",
      subscribe: item[4] === "1",
    });
  });

  return data;
};
