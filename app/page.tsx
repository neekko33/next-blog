import Image from "next/image";
import Author from "../components/author";
import Categories from "../components/categories";
import Tags from "../components/tags";
import Archive from "../components/archive";
import Article from "../components/article";
import Pagination from "../components/pagination";
import { Card } from "@/components/ui/card";

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || "1")
  const categoryId = searchParams.category || ""
  const tagId = searchParams.tag || ""

  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (categoryId) params.set("category", categoryId);
  if (tagId) params.set("tag", tagId);

  const [homeRes, archivesRes, postsRes] = await Promise.all([
    fetch("http://localhost:3000/api/home"),
    fetch("http://localhost:3000/api/archives"),
    fetch(`http://localhost:3000/api/posts?${params.toString()}`),
  ]);

  const [homeJson, archivesJson, postsJson] = await Promise.all([
    homeRes.json(),
    archivesRes.json(),
    postsRes.json(),
  ]);

  const { profile, categories, tags } = homeJson;

  return (
    <main className="flex w-full gap-8">
      <div className="w-[350px] space-y-4">
        <Author profile={profile} />
        <Categories categories={categories} categoryId={categoryId} />
        <Tags tags={tags} tagId={tagId} />
        <Archive archives={archivesJson} />
      </div>
      <div className="flex-1">
        <div className="space-y-4 mb-6">
          {
            (categoryId || tagId) && <div className="text-sm mb-4 font-semibold border rounded-lg shadow-sm p-4 flex justify-between">
              <div>
                <span className="mr-2 text-gray-600">{categoryId ? "分类" : "标签"}: </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-bold">{categoryId ? categories.find(c => c.id === Number(categoryId))?.name : tags.find(c => c.id === Number(tagId))?.name}</span>
              </div>
              <div className="text-gray-600">
                共<span className="mx-1">{postsJson.total}</span>篇
              </div>
            </div>
          }
          {postsJson.data.map((post) => (
            <Article key={post.id} article={post} />
          ))}
        </div>
        <Pagination total={postsJson.total} page={postsJson.page} pageSize={postsJson.pageSize} />
      </div>
    </main>
  )
}
