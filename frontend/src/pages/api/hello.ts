import type { NextApiRequest, NextApiResponse } from "next";
import { LoadMailingList } from "~/mailingList/mailingList/LoadMailngList";
import { MailingList } from "~/mailingList";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  MailingList();
  console.log(new Date());

  res.status(200).json({ name: "John Doe" });
}
