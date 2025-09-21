import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Author({ profile }: { profile: any }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center">
        <Avatar className="w-32 h-32 mb-4 ring-2 ring-offset-2 ring-gray-300 hover:rotate-360 transition-transform duration-300 cursor-pointer">
          <AvatarImage src={profile.avatarUrl ?? 'https://github.com/neekko33.png'} alt="Author" />
          <AvatarFallback>{profile.name}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
        <p className="text-center text-gray-600">{profile.bio}</p>
        <div className="flex space-x-4 mt-6 w-full font-semibold">
          <div className="flex-1 text-center">
            <div>文章</div>
            <div>{profile.postsCount}</div>
          </div>
          <div className="flex-1 text-center">
            <div>分类</div>
            <div>{profile.categoriesCount}</div>
          </div>
          <div className="flex-1 text-center">
            <div>标签</div>
            <div>{profile.tagsCount}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}