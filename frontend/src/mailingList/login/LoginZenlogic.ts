//_______________________________________________
// サイトログイン
import puppeteer, { Page } from "puppeteer";

const DOMAIN = "https://my.zenlogic.jp/";
const ZENLOGIC_USERNAME = process.env.USER_ID || "";
const ZENLOGIC_PASSWORD = process.env.PASSWORD || "";
const LOGIN_CHECK = "a[href='/configurations/68698']";

//_______________________________________________
// メイン処理

/** サイトログイン
 * @param login ログインページ
 * @param selector ログインの確認
 */
export const LoginZenlogic =
  (login: string = DOMAIN, selector: string = LOGIN_CHECK) =>
  async (n: Page, isTry?: boolean): Promise<Page> => {
    console.log(ZENLOGIC_PASSWORD);
    console.log(ZENLOGIC_USERNAME);
    try {
      !isTry && n.goto(login); // サイトへ移動
      await n.waitForSelector("input[id=account_username]");
      await n.type("input[id=account_username]", ZENLOGIC_USERNAME); // ユーザーID入力
      await n.type("input[id=account_password]", ZENLOGIC_PASSWORD); // パスワード入力
      await n.click("input[data-disable-with=ログイン]"); // ログインボタンクリック
      await n.waitForSelector(selector); // ログインが終わるまで待つ
      return n;
    } catch (error) {
      if (isTry) {
        return n;
      }
      return LoginZenlogic(login, selector)(n, true);
    }
  };
