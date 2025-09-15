import { Card, CardContent } from "@/components/ui/card"

export default function Article({ article }: { article: any }) {
  return (
    <Card>
      <CardContent className="px-6">
        <h2 className="font-bold mb-3 text-2xl text-gray-900 leading-tight">
          {article.title}
        </h2>
        <h3 className="text-gray-500 mb-4 text-sm">{article.created_at}</h3>
        <p className="mb-6 text-gray-700 leading-relaxed">
          {article.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag) => (
            <span key={tag.id} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium">
              #{tag.name}
            </span>
          ))}
        </div>
        <div className="text-right">
          <a href="#" className="hover:underline font-semibold">
            阅读更多 &rarr;
          </a>
        </div>
      </CardContent>
    </Card >
  )
}