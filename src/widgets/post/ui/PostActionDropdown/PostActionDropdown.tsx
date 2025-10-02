'use client';

import { useRef, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { EllipsisVertical } from 'lucide-react';

import { BlockUserDialog } from '@/widgets/block';
import { ReportReasonDialog } from '@/widgets/report';

import { useDeletePost, useSubscribePost, useUnsubscribePost } from '@/entities/post';
import { isAdmin, useMyInfo } from '@/entities/user';

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
  const { data: userInfo } = useMyInfo();
  const roles = userInfo?.roles || [];

  const { mutate: deletePost } = useDeletePost();
  const { mutate: unsubscribePost } = useUnsubscribePost();
  const { mutate: subscribePost } = useSubscribePost();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openReport = () => {
    setDropdownOpen(false);
    setReportOpen(true);
  };

  const openBlockUser = () => {
    setDropdownOpen(false);
    setBlockOpen(true);
  };
  const canDeletePost = isOwner || isAdmin(roles);
  const canReportAndBlock = !isOwner;
  const canViewForm = isOwner && isPostForm;

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
          {canDeletePost && <DropdownMenuItem onClick={() => deletePost({ postId })}>삭제하기</DropdownMenuItem>}

          <DropdownMenuItem
            onClick={() => {
              isPostSubscribed ? unsubscribePost({ postId }) : subscribePost({ postId });
            }}
          >
            {isPostSubscribed ? '알람 끄기' : '알람 켜기'}
          </DropdownMenuItem>

          {canViewForm && (
            <DropdownMenuItem onClick={() => router.push(`${pathname}/formInfo/${formData?.formId}`)}>
              신청 현황 보기
            </DropdownMenuItem>
          )}

          {canReportAndBlock && (
            <>
              <DropdownMenuItem onClick={openReport}>신고하기</DropdownMenuItem>
              <DropdownMenuItem onClick={openBlockUser}>차단하기</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ReportReasonDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportType="POST"
        targetId={postId}
        anchorRect={triggerRef.current?.getBoundingClientRect() ?? null}
        width={260}
        offset={8}
      />

      <BlockUserDialog open={blockOpen} onOpenChange={setBlockOpen} targetId={postId} targetKind="post" />
    </>
  );
};
