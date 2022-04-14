//_______________________________________________
// メーリングリスト更新
import type { NextApiRequest, NextApiResponse } from "next";
import RefreshEmailAccount from "~/socket/server/RefreshMailingList";
import RefreshTransferSetting from "~/socket/server/RefreshMailList";


//_______________________________________________
// レスポンス
type Success = {
  success: true;
};

type Fail = {
  success: false;
  error: any;
};
export type ResponseMailingListAddressRefresh = Success | Fail;
let loading = false
//_______________________________________________
// メイン処理
export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseMailingListAddressRefresh>
) {
  try {
    if(loading === true){
      res.status(200).send({
        success: false,
        error: "既に実行しています",
      });
      return;
    }
    loading = true
    res.status(200).send({
      success: true,
    });
    const list = await RefreshEmailAccount()([])
    await RefreshTransferSetting()(list || [])

  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      error,
    });
  }finally{
    loading = false
  }
  return;
}
