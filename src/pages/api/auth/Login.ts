import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please add information" });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "This account is not existed" });

    const isValid = await user.comparePassword(password);
    if (!isValid) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!, 
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login success", token });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;

