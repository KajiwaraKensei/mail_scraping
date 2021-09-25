//_______________________________________________
// メールリスト取得
import { Page } from "puppeteer";
import { LoginZenlogic } from "../login/LoginZenlogic";

export type EmailList = {
  email: string;
  comment: string;
  post: boolean;
  subscribe: boolean;
}[];

//_______________________________________________
// メイン処理
export type EmailListAll = { [s: string]: EmailList };

/** メールリスト読み込み
 * @param mailingLink 取得するメーリングリストのリンク
 * @returns 全てのメールリスト
 */

export const GetEmailList =
  (mailingLink: string) =>
  async (n: Page): Promise<EmailList> => {
    console.log(mailingLink);

    // メール一覧のページに移動
    await n.goto(mailingLink);
    await n.waitForTimeout(2500);

    // 値取得
    return await n.evaluate(() => {
      const data: EmailList = [];
      const emailList =
        document.querySelectorAll<HTMLInputElement>("#ml_members__address") ||
        [];
      const commentList =
        document.querySelectorAll<HTMLInputElement>("#ml_members__comment") ||
        [];
      const postList =
        document.querySelectorAll<HTMLInputElement>(
          "input[name='ml[members][][post]']"
        ) || [];
      const subscribeList =
        document.querySelectorAll<HTMLInputElement>(
          "input[name='ml[members][][subscribe]']"
        ) || [];

      emailList.forEach((_, index) => {
        data.push({
          email: emailList[index].value,
          comment: commentList[index].value,
          post: postList[index].checked,
          subscribe: subscribeList[index].checked,
        });
      });

      return data;
    });
  };
