import { NextApiRequest, NextApiResponse } from "next";

interface Apple {
  name: string;
}

export default function apple(
  req: NextApiRequest,
  res: NextApiResponse<Apple>
) {
  res.status(200).json({
    name: "苹果",
  });
}
