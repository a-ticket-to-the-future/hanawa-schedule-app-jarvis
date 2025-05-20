// ✅ 修正済：pages/api/staff-count/get.ts
import { prisma } from "@/lib/db/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.query
  if (!date || typeof date !== "string") {
    return res.status(400).json({ error: "Date is required" })
  }

  try {
    const record = await prisma.staffCount.findFirst({
      where: { date: new Date(date) },
    })
    if (!record) return res.status(404).json({ error: "No data" })
    return res.status(200).json(record)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Failed to fetch staff count" })
  }
}