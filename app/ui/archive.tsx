import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card"
import { Key } from "lucide-react";
import Link from "next/link";

export default function Categories({ archives }: { archives: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>归档</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {
            Object.keys(archives).map((year) => (
              <li key={year}>
                <Link href="#" className="flex justify-between hover:bg-gray-100 px-2 py-1 rounded">
                  <div>{year}</div>
                  <div>{archives[year].length}</div>
                </Link>
              </li>
            ))
          }
        </ul>
      </CardContent>
    </Card>
  )
}