import EditUserClient from "./EditUserClient";

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <EditUserClient params={params} />;
}
