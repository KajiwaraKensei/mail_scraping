//_______________________________________________
// メールリスト取得
import { Page } from "puppeteer";

export type EmailList = {
  terms: string;
  forwardingAddress: string
  head: string
}[];

//_______________________________________________
// メイン処理
export type EmailListAll = { [s: string]: EmailList };

/** メールリスト読み込み
 * @param mailingLink 取得するメーリングリストのリンク
 * @returns 全てのメールリスト
 */

export const GetTransferSetting =
  (mailingLink: string) =>
  async (n: Page): Promise<EmailList> => {
    console.log(mailingLink);

    // メール一覧のページに移動
    await n.goto(mailingLink);
    await n.waitForTimeout(2500);

    // 値取得
    const res = await n.evaluate(() => {
      const data: EmailList = [];
  
        const termsList =
        document.querySelectorAll<HTMLInputElement>("#email-forwarding-app > div > div:nth-child(3) > div > div:nth-child(3) > div > table > tbody > tr") ||
        [];
       

        termsList.forEach((item) => {
          let count = 2;
          const head = item.querySelector(`td:nth-child(${count++})`)?.textContent || ""
          let terms = item.querySelector(`.col-keyword.clickable > p`)?.textContent || ""
          if(terms !== ""){
            count++
          }
          terms +=  item.querySelector(`td:nth-child(${count++})`)?.textContent || ""
           
          const forwardingAddress = item.querySelector(`td:nth-child(${count++})`)?.textContent || ""
          data.push({
            head, 
            terms,
            forwardingAddress
          })
        });

      return data;
    });
    
    return res
  };
