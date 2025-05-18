// ✅ 修正済：pages/api/staff-count/create.ts
import { prisma } from "@/lib/prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { date, count } = req.body
  if (!date || typeof count !== "number") {
    return res.status(400).json({ error: "Invalid input" })
  }

  try {
    const record = await prisma.staffCount.create({
      data: {
        date: new Date(date),
        count,
      },
    })
    return res.status(200).json(record)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Failed to save staff count" })
  }
}