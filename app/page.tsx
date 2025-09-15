import Image from "next/image";
import Author from "./ui/author";
import Categories from "./ui/categories";
import Tags from "./ui/tags";
import Archive from "./ui/archive";
import Article from "./ui/article";
import Pagination from "./ui/pagination";

export default async function Home() {
  const data = await fetch("http://localhost:3001/api/home")
  const json = await data.json()
  const { profile, categories, tags } = json

  const archives = await fetch("http://localhost:3001/api/archives")
  const archivesJson = await archives.json()

  const posts = await fetch("http://localhost:3001/api/posts")
  const postsJson = await posts.json()

  return (
    <main className="flex w-full gap-8">
      <div className="w-[350px] space-y-4">
        <Author profile={profile} />
        <Categories categories={categories} />
        <Tags tags={tags} />
        <Archive archives={archivesJson} />
      </div>
      <div className="flex-1">
        <div className="space-y-4 mb-6">
          {postsJson.map((post) => (
            <Article key={post.id} article={post} />
          ))}
        </div>
        <Pagination />
      </div>
    </main>
  )
}
