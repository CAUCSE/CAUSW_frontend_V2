'use client';

import { useRef, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { EllipsisVertical } from 'lucide-react';

import { ReportReasonDialog } from '@/fsd_widgets/report';

import { useDeletePost, useSubscribePost, useUnsubscribePost } from '@/fsd_entities/post';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shadcn/components/ui';
import { buttonVariants } from '@/shadcn/components/ui/button';

interface PostActionDropdownProps {
  postId: Post.PostDto['id'];
  isPostSubscribed: Post.PostDto['isPostSubscribed'];
  isOwner: Post.PostDto['isOwner'];
  isPostForm: Post.PostDto['isPostForm'];
  formData: Post.PostDto['formResponseDto'];
}

export const PostActionDropdown = ({
  postId,
  isPostSubscribed,
  isOwner,
  isPostForm,
  formData,
}: PostActionDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: deletePost } = useDeletePost();
  const { mutate: unsubscribePost } = useUnsubscribePost();
  const { mutate: subscribePost } = useSubscribePost();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openReport = () => {
    setAnchorRect(triggerRef.current?.getBoundingClientRect() ?? null);
    setDropdownOpen(false); // ✅ 드롭다운 먼저 닫기
    setReportOpen(true); // ✅ 신고 패널 열기
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            ref={triggerRef}
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'absolute top-4 right-4 cursor-pointer',
            })}
          >
            <EllipsisVertical className="size-4 text-[#B4B1B1]" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {/* 글 삭제: 작성자만 */}
          {isOwner && <DropdownMenuItem onClick={() => deletePost({ postId })}>삭제하기</DropdownMenuItem>}

          {/* 알림 on/off */}
          <DropdownMenuItem
            onClick={() => {
              isPostSubscribed ? unsubscribePost({ postId }) : subscribePost({ postId });
            }}
          >
            {isPostSubscribed ? '알람 끄기' : '알람 켜기'}
          </DropdownMenuItem>

          {/* 신청 현황 보기: 소유 + 폼글 */}
          {isOwner && isPostForm && (
            <DropdownMenuItem onClick={() => router.push(`${pathname}/formInfo/${formData?.formId}`)}>
              신청 현황 보기
            </DropdownMenuItem>
          )}

          {/* 신고하기: 작성자가 아닐 때만 */}
          {!isOwner && <DropdownMenuItem onClick={openReport}>신고하기</DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ 버튼 위치 기준으로 뜨는 신고 사유 패널 */}
      <ReportReasonDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportType="POST"
        targetId={postId}
        anchorRect={anchorRect}
        width={260}
        offset={8}
      />
    </>
  );
};
