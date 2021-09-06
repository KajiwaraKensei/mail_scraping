import type { NextApiRequest, NextApiResponse } from "next";
import { LoadMailingList } from "~/mailingList/mailingList/LoadMailngList";
import { MailingList } from "~/mailingList/mailingList/GetMailingList";

type Success = {
  success: true;
  list: MailingList;
};

type Fail = {
  success: false;
  error: any;
};
export type ResponseMailingListAddress = Success | Fail;

export default async function handler(
  req: NextApiRequest,
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
