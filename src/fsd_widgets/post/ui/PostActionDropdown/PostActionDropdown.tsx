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

  const [reportOpen, setReportOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openReport = () => {
    setAnchorRect(triggerRef.current?.getBoundingClientRect() ?? null);
    setReportOpen(true);
  };

  const dropdownMenuList: { text: string; handleClick: () => void }[] = [
    { text: '삭제하기', handleClick: () => deletePost({ postId }) },
    {
      text: isPostSubscribed ? '알람 끄기' : '알람 켜기',
      handleClick: () => {
        isPostSubscribed ? unsubscribePost({ postId }) : subscribePost({ postId });
      },
    },
    { text: '신고하기', handleClick: () => openReport() },
    ...(isOwner && isPostForm
      ? [
          {
            text: '신청 현황 보기',
            handleClick: () => router.push(`${pathname}/formInfo/${formData?.formId}`),
          },
        ]
      : []),
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Shadcn 버튼 사용 시 asChild 사용 불가로 인한 일반 button 사용 */}
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
          {dropdownMenuList.map((menu) => (
            <DropdownMenuItem key={menu.text} onClick={menu.handleClick}>
              {menu.text}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
        <ReportReasonDialog
          open={reportOpen}
          onOpenChange={setReportOpen}
          reportType="POST"
          targetId={postId}
          anchorRect={anchorRect} // ← 위치
          width={260}
          offset={8}
        />
      </DropdownMenu>
    </>
  );
};
