import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link";

export default function Categories({ tags, tagId }: { tags: any[], tagId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>标签</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {
            tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/?tag=${tag.id}`}
                className={
                  `text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium hover:bg-gray-200 ${Number(tagId) === tag.id ? "bg-gray-200 font-semibold" : ""}
                `}>
                #{tag.name}
              </Link>
            ))
          }
        </div>
      </CardContent>
    </Card>
  )
}