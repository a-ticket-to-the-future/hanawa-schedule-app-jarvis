// pages/api/schedule/create.ts
import { prisma } from "@/lib/prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { workDate, department, pieces, productivity, people } = req.body

  try {
    const record = await prisma.workSchedule.create({
      data: {
        workDate: new Date(workDate),
        department,
        pieces,
        productivity,
        people,
      },
    })

    res.status(200).json(record)
  } catch (error) {
    console.error("エラー:", error)
    res.status(500).json({ error: "登録に失敗しました。" })
  }
}