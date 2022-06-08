//_______________________________________________
// メーリングリスト取得
import type { NextApiRequest, NextApiResponse } from "next";
import { LoadEmailAccount } from "~/util/mailingList/transferSetting/LoadEmailAccount";
import { MailingList } from "~/util/mailingList/transferSetting/GetEmailAccount";

//_______________________________________________
// レスポンスの型
type Success = {
  success: true;
  list: MailingList;
};

type Fail = {
  success: false;
  error: any;
};

export type ResponseMailAccount = Success | Fail;

//_______________________________________________
// メイン処理
export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseMailAccount>
) {
  try {
    const list = await LoadEmailAccount();

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
