//_______________________________________________
// メーリングリスト更新
import type { NextApiRequest, NextApiResponse } from "next";
import {
  GetMailingList,
  MailingList,
} from "~/mailingList/mailingList/GetMailingList";

//_______________________________________________
// レスポンス
type Success = {
  success: true;
  list: MailingList;
};

type Fail = {
  success: false;
  error: any;
};
export type ResponseMailingListAddressRefresh = Success | Fail;

//_______________________________________________
// メイン処理
export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseMailingListAddressRefresh>
) {
  try {
    const list = await GetMailingList();

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
  return;
}
