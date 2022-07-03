// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../src/database/mongoose'
import { login, verify } from '../../src/services/authentication.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as keyof ResponseFuncs
  await dbConnect();

  // Responses cases
  const handleCase: ResponseFuncs = {
    POST: login,
    GET: verify,
  }

  // Check for the method, if so invoke it
  const response = handleCase[method]
  if (response) await response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}
