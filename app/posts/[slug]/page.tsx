export default async function Post({ params }: { params: { slug: string } }) {
  const post = await fetch(`http://localhost:3001/api/posts/${params.slug}`);
  const postJson = await post.json();

  return (
    <main className="w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{postJson.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{new Date(postJson.created_at).toLocaleDateString()}</p>
      <div className="prose prose-lg">
        {postJson.content}
      </div>
    </main>
  )
}