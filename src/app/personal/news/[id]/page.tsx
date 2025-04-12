import NewsDetailClient from "./NewsDetailClient";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <NewsDetailClient params={params} />;
}
