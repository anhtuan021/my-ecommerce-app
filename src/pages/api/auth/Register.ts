import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please add information" });
    }

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "This account is already existed" });
    }

    await User.create({ email, password });

    res.status(201).json({ message: "Account is created" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;

