//_______________________________________________
// メールリスト保存
import { EmailListAll } from "./GetEmailList";
import { MAIL_CSV, MAIL_U_CSV } from "~/conf/mailingList";
import { saveCSV } from "~/util/csv";

const header: string[] = [
  "メーリングリストアドレス",
  "メールアドレス",
  "コメント",
  "投稿",
  "購読",
];
type Props = EmailListAll;

//_______________________________________________
// メイン処理

/**
 * メールリスト保存
 * @param mailList 保存するメールリスト
 */
export const SaveEmailList = (mailList: Props): void => {
  void saveAll(mailList);
  void SaveEmailListSortUser(mailList);
  return;
};

/**
 * メールリスト保存処理
 * @param mailList 保存するメールリスト
 */
export const saveAll = (mailList: Props): Promise<void> => {
  const saveData = [header];

  // csv形式に変換
  Object.keys(mailList).forEach((mailingListAddress) => {
    // key = mailing_list address name
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

/**
 * ユーザー順に保存
 * @param mailList 保存するメールリスト
 */
export const SaveEmailListSortUser = (mailList: Props): Promise<void> => {
  const saveData = [
    ["メールアドレス", "メーリングリストアドレス", "コメント", "投稿", "購読"],
  ];
  const userList: { [k: string]: string[][] } = {};

  // ユーザー順のデータ作成
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

  // csv形式に変換
  Object.keys(userList).forEach((email) => {
    saveData.push(...userList[email]);
  });

  return saveCSV(saveData, MAIL_U_CSV);
};
