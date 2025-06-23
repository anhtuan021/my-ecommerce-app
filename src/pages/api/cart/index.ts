import dbConnect from '../../../lib/dbConnect';
import Cart from '../../../models/Cart';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET': {
      const { userId } = req.query;
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      return res.status(200).json(cart || { userId, items: [] });
    }

    case 'POST': {
      const { userId, productId, quantity } = req.body;
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = await Cart.create({ userId, items: [{ productId, quantity }] });
      } else {
        const item = cart.items.find((item) => item.productId.toString() === productId);
        if (item) item.quantity += quantity;
        else cart.items.push({ productId, quantity });
        await cart.save();
      }
      return res.status(200).json(cart);
    }

    case 'DELETE': {
      const { userId, productId } = req.body;
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } } },
        { new: true }
      );
      return res.status(200).json(cart);
    }

    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
