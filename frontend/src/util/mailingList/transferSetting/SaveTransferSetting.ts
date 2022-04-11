//_______________________________________________
// メールリスト保存
import { EmailListAll } from "./GetTransferSetting";
import { TRANSFER_SETTING_CSV } from "~/conf/mailingList";
import { saveCSV } from "~/util/csv";

const header: string[] = [
 "メールアカウント", "メールヘッダ", "条件",  "転送先メールアドレス"
];
type Props = EmailListAll;

//_______________________________________________
// メイン処理

/**
 * メールリスト保存
 * @param mailList 保存するメールリスト
 */
export const SaveTransferSetting = (mailList: Props): void => {
  void saveAll(mailList);
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
    mailList[mailingListAddress].forEach((item) => {
      const { terms, forwardingAddress, head} = item;
      saveData.push([
        mailingListAddress,
        head,
        terms,
        forwardingAddress,
      ]);
    });
  });

  return saveCSV(saveData, TRANSFER_SETTING_CSV);
};
