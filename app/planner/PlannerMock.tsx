import { Button } from "@/app/planner/components/ui/button"
import { Card, CardContent } from "@/app/planner/components/ui/card"
import { Input } from "@/app/planner/components/ui/input"
import { Label } from "@/app/planner/components/ui/label"
import { useState } from "react"

export default function PlannerMock() {
  const [uploaded, setUploaded] = useState(false)

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold">受信データアップロード</h2>
          <div className="space-y-2">
            <Label htmlFor="file">Excelファイル</Label>
            <Input id="file" type="file" onChange={() => setUploaded(true)} />
          </div>
          {uploaded && (
            <div className="text-green-600">✅ データを読み込みました</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold">予定表出力</h2>
          <p>ワンクリックで予定表（PDF or Excel）を作成します。</p>
          <Button disabled={!uploaded}>予定表を出力する</Button>
        </CardContent>
      </Card>
    </div>
  )
}
