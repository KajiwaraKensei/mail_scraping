import Nightmare from "nightmare";
const DOMAIN = "https://my.zenlogic.jp/";
const ZENLOGIC_USERNAME = "icraft-jp";
const ZENLOGIC_PASSWORD = "~%XQzU2$WptL*|EUee_9";
const LOGIN_CHECK = "a[href='/configurations/68698']";

export const LoginZenlogic =
  (login: string = DOMAIN, selector: string = LOGIN_CHECK) =>
  (n: Nightmare) => {
    return n
      .goto(login) // サイトへ移動
      .type("input[id=account_username]", ZENLOGIC_USERNAME) // ユーザーID入力
      .type("input[id=account_password]", ZENLOGIC_PASSWORD) // パスワード入力
      .click("input[data-disable-with=ログイン]") // ログインボタンクリック
      .wait(selector); // ログインが終わるまで待つ
  };
