import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET': {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(product);
    }

    case 'PUT': {
  const updateData = req.body;

  const updateQuery: any = {
    name: updateData.name,
    description: updateData.description,
    price: updateData.price,
  };

  if (updateData.image && updateData.image.trim() !== '') {
    updateQuery.image = updateData.image.trim();
  } else {
    updateQuery.$unset = { image: "" };
  }

  const updated = await Product.findByIdAndUpdate(id, updateQuery, {
    new: true,
    runValidators: true,
  });

  if (!updated) return res.status(404).json({ message: 'Not found' });
  return res.status(200).json(updated);
}


    case 'DELETE': {
      await Product.findByIdAndDelete(id);
      return res.status(204).end();
    }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
