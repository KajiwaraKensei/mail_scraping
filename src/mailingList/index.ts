import Nightmare from "nightmare";
const ZENLOGIC_USERNAME = "icraft-jp";
const ZENLOGIC_PASSWORD = "~%XQzU2$WptL*|EUee_9";

export const MailingList = async () => {
  const n = new Nightmare({ show: true });

  const mailingList = await n
    .goto("https://my.zenlogic.jp/")
    .type("input[id=account_username]", ZENLOGIC_USERNAME)
    .type("input[id=account_password]", ZENLOGIC_PASSWORD)
    .click("input[data-disable-with=ログイン]")
    .wait("a[href='/configurations/68698']")
    .goto("https://my.zenlogic.jp/configurations/68698/mail/mailing_lists")
    .wait("#limit")
    .select("#limit", "100")
    .wait(3000)
    .evaluate(() => {
      const data: { mail: string; link: string; comment: string }[] = [];
      const emailList = document.querySelectorAll(
        "#data-list td:nth-child(2) .punycode-email"
      )!;
      const settingLink = document.querySelectorAll(
        "#data-list td:nth-child(5) a"
      );

      const commentList = document.querySelectorAll(
        "#data-list td:nth-child(4)"
      );

      emailList.forEach((_, index) => {
        console.log(index);

        data.push({
          link: settingLink[index]?.getAttribute("href")!,
          comment: commentList[index]?.textContent!,
          mail: emailList[index]?.textContent!,
        });
      });
      return data;
    });

  console.table(mailingList);
};
