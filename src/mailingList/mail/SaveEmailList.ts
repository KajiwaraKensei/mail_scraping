import { EmailList } from "./GetEmailList";

import { MAIL_CSV, MAIL_U_CSV } from "~/conf/mailingList";
import { saveCSV } from "~/util/csv";
const header: string[] = [
  "メーリングリストアドレス",
  "メールアドレス",
  "コメント",
  "投稿",
  "購読",
];
type Props = {
  [k: string]: EmailList;
};
/**
 * メーリングリストをcsvに保存
 * @module delay
 * @param fileName 保存するファイル名
 * @param data 保存データ
 */
export const SaveEmailList = (mailList: Props): void => {
  void saveAll(mailList);
  void SaveEmailListSortUser(mailList);
  return;
};

export const saveAll = (mailList: Props): Promise<void> => {
  const saveData = [header];
  Object.keys(mailList).forEach((mailingListAddress) => {
    mailList[mailingListAddress].forEach((item) => {
      const { email, post, comment, subscribe } = item;
      saveData.push([
        mailingListAddress,
        email,
        comment,
        post ? "1" : "0",
        subscribe ? "1" : "0",
      ]);
    });
  });
  return saveCSV(saveData, MAIL_CSV);
};

export const SaveEmailListSortUser = (mailList: Props): Promise<void> => {
  const saveData = [
    ["メールアドレス", "メーリングリストアドレス", "コメント", "投稿", "購読"],
  ];
  const userList: { [k: string]: string[][] } = {};
  Object.keys(mailList).forEach((mailingListAddress) => {
    mailList[mailingListAddress].forEach((item) => {
      const { email, post, comment, subscribe } = item;
      if (!userList[email]) {
        userList[email] = [];
      }
      userList[email].push([
        email,
        mailingListAddress,
        comment,
        post ? "1" : "0",
        subscribe ? "1" : "0",
      ]);
    });
  });
  Object.keys(userList).forEach((email) => {
    saveData.push(...userList[email]);
  });
  return saveCSV(saveData, MAIL_U_CSV);
};
