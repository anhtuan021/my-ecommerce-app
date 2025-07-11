import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch {
        res.status(500).json({ error: 'Server error' });
      }
      break;

    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}