import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET': {
      const { userId } = req.query;
      if (!userId) return res.status(400).json({ error: 'Missing userId in query' });

      try {
        const orders = await Order.find({ userId }).populate('products.productId');
        return res.status(200).json(orders);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch orders' });
      }
    }

    case 'POST': {
      const { userId, products, totalAmount } = req.body;
      if (!userId || !products || !totalAmount) {
        return res.status(400).json({ error: 'Missing required fields in body' });
      }

      try {
        const newOrder = await Order.create({ userId, products, totalAmount });
        return res.status(201).json(newOrder);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to create order' });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
