import type { NextApiRequest, NextApiResponse } from "next";
import { LoadMailingList } from "~/mailingList/mailingList/LoadMailngList";
import {
  GetMailingList,
  MailingList,
} from "~/mailingList/mailingList/GetMailingList";

type Success = {
  success: true;
  list: MailingList;
};

type Fail = {
  success: false;
  error: any;
};
export type ResponseMailingListAddressRefresh = Success | Fail;

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
}
