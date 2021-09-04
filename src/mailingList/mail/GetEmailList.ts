import Nightmare from "nightmare";

export type EmailList = {
  email: string;
  comment: string;
  post: boolean;
  subscribe: boolean;
}[];

export const GetEmailList =
  (mailingLink: string) =>
  async (n: Nightmare): Promise<EmailList> => {
    console.log(mailingLink);

    await n.goto(mailingLink).wait(2500);

    return n
      .evaluate(() => {
        const data: EmailList = [];
        const emailList =
          document.querySelectorAll<HTMLInputElement>("#ml_members__address") ||
          [];
        const commentList =
          document.querySelectorAll<HTMLInputElement>("#ml_members__comment") ||
          [];
        const postList = document.querySelectorAll<HTMLInputElement>(
          "input[name='ml[members][][post]']"
        )!;
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
      })
      .then((r: EmailList) => r);
  };
