//_______________________________________________
// メーリングリストをスクレイピング
import { Page } from "puppeteer";

//_______________________________________________
// 定数
const DOMAIN = "https://my.zenlogic.jp";
const BASE_URL = DOMAIN + "/configurations/68698/mail/accounts";

export type MailingList = {
  mail: string;
  link: string;
  comment: string;
}[];

export type MailingListItem = {
  mail: string;
  link: string;
  comment: string;
};

//_______________________________________________
// メイン処理

/**
 * メールアカウント取得
 * @module GetEmailAccount
 * @param n
 * @returns メーリングリスト
 */
export async function GetEmailAccount(n: Page): Promise<MailingList> {
  await n.goto(BASE_URL); // メーリングリストのページに移動
  await n.waitForTimeout(2000);

  // ページ数を取得
  const page = await getPageCount(n);
  // 全てのメールアドレス表示
  for (let i = 0; i < page; i++) {
    await n.waitForSelector('.control-group > div > #more-mail-accounts > span > .btn')
    await n.click('.control-group > div > #more-mail-accounts > span > .btn')
  }
  return await getData(n);
}

/**
 * 件数取得
 * @module getPageCount
 * @param n
 * @returns ページ数
 */
const getPageCount = async (n: Page) => {
  await n.waitForSelector('#tools-mail-accounts > #count-accounts > div > .ml20 > span:nth-child(2)')
  return await n
    .evaluate(() => {
      const target: any =
        document.querySelector('#tools-mail-accounts > #count-accounts > div > .ml20 > span:nth-child(2)') ;
      const count = target.innerText      ;

      return Math.floor((Number(count) - 1) / 100);
    })
    .then((c: number) => c);
};

/**
 * ページを指定してメーリングリストを取得
 * @module getData
 * @param page ページ番号
 * @param limit 表示件数
 * @returns メーリングリスト
 */
const getData =
  async (n: Page) => {
    await n.waitForTimeout(2000);

    const res =  await n.evaluate(() => {
      const DOMAIN = "https://my.zenlogic.jp";
      const data: MailingList = [];

      // Email取得
      const emailList =
      document.querySelectorAll("#data-list > tr > td:nth-child(2)")|| []

      // ドメイン名取得
      const domainList =
      document.querySelectorAll("#data-list > tr > td:nth-child(3)")|| []

      // 詳細へ移動するリンク取得
      const settingLink =document.querySelectorAll("#data-list > tr > td:nth-child(6) > a") || []
      
      // コメント取得
      const commentList = document.querySelectorAll("#data-list > tr > td:nth-child(4)")

      // 取得したデータをまとめる
      emailList.forEach((_, index) => {
        data.push({
          link: (settingLink[index].getAttribute("href") || ""),
          comment: commentList[index].textContent || "",
          mail: (emailList[index].textContent || "") + "@" + domainList[index].textContent || "",
        });
      });
      return data;
    });
    
    return res
  };
