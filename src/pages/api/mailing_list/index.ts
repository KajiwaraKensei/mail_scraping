//_______________________________________________
// メーリングリスト取得
import type { NextApiRequest, NextApiResponse } from "next";
import { LoadMailingList } from "~/util/mailingList/mailingList/LoadMailngList";
import { MailingList } from "~/util/mailingList/mailingList/GetMailingList";

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

export type ResponseMailingListAddress = Success | Fail;

//_______________________________________________
// メイン処理
export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseMailingListAddress>
) {
  try {
    const list = await LoadMailingList();

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
