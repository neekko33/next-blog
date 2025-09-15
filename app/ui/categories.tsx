import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link";

export default function Categories({ categories }: { categories: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>分类</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {
            categories.map((category) => (
              <li key={category.id}>
                <Link href="#" className="flex justify-between hover:bg-gray-100 px-2 py-1 rounded">
                  <div>{category.name}</div>
                  <div>{category.postsCount}</div>
                </Link>
              </li>
            ))
          }
        </ul>
      </CardContent>
    </Card>
  )
}