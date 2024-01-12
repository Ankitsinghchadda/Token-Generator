import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { TokenForm } from "@/components/TokenForm"


export default function CreateToken() {
  return (
    <Card className={'m-10 p-10 max-md:my-10 max-md:mx-3 max-md:py-6 max-md:px-4 '}>
      <CardHeader>
        <CardTitle>Create Token</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
            <TokenForm/>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-green-500">Fee: 0.07BNB</span>
      </CardFooter>
    </Card>
  )
}
