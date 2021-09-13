//_______________________________________________
// メールリスト読み込み
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailListAll } from "~/mailingList/mail/GetEmailList";
import { LoadEmailList } from "~/mailingList/mail/LoadEmailList";

//_______________________________________________
// レスポンス
type Success = {
  success: true;
  list: EmailListAll;
};

type Fail = {
  success: false;
  error: any;
};

export type ResponseEmailListAddress = Success | Fail;

//_______________________________________________
// メイン処理
export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseEmailListAddress>
) {
  try {
    const list = await LoadEmailList();

    res.status(200).send({
      success: true,
      list,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      error,
    });
  }
}
