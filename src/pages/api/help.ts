import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log(process.env.MONGODB_URI);
  return response.status(200).json({ text: "ok" });
};
