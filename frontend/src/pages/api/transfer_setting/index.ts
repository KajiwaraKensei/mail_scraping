//_______________________________________________
// メールリスト読み込み
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailListAll } from "~/util/mailingList/transferSetting/GetTransferSetting";
import { LoadEmailList } from "~/util/mailingList/transferSetting/LoadTransferSetting";

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

export type ResponseTransferSetting = Success | Fail;

//_______________________________________________
// メイン処理
export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseTransferSetting>
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
