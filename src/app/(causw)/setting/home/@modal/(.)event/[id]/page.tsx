import { EventEditModal } from "@/_deprecated/entities/home";

export default function BannerEditModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return <EventEditModal bannerId={id} />;
}
