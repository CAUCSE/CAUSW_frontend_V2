import { CouncilFeeManagementDetail } from '@/entities/user';

export default async function CouncilFeeDetailPage({
  params,
}: {
  params: { councilFeeId: string };
}) {
  const { councilFeeId } = params;
  return (
    <div className="mb-4">
      <CouncilFeeManagementDetail councilFeeId={councilFeeId} />
    </div>
  );
}
