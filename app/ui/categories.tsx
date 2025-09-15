import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link";

export default function Categories({ categories, categoryId }: { categories: any[], categoryId: string }) {
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
                <Link
                  href={`/?category=${category.id}`}
                  className={`flex justify-between px-2 py-1 rounded ${Number(categoryId) === category.id ? "bg-gray-100" : "hover:bg-gray-100"}`}
                >
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