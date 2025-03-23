"use client";

import {
  AllowAnonymousToggle,
  BoardDetailForm,
  RoleSelectSection,
} from "@/_deprecated/entities";
import { BoardRscService, useBoardStore, useUserStore } from "@/shared";
import { useParams, useRouter } from "next/navigation";

import { PreviousButton } from "@/shared/ui/previousButton";
import React from "react";

const CreateCircleBoardPage = () => {
  const {
    clearBoardInfo,
    boardName,
    setIsNameValid,
    boardDescription,
    allowAnonymous,
    selectedRoles,
  } = useBoardStore();
  const { applyBoard, createBoard } = BoardRscService();
  const isPresidents = useUserStore((state) => state.isPresidents);
  const isVicePresidents = useUserStore((state) => state.isVicePresidents);
  const isAdmin = useUserStore((state) => state.isAdmin);
  const hasAuth = isAdmin() || isPresidents() || isVicePresidents();
  const router = useRouter();
  const params = useParams();
  const circleId = params.id;
  const roles = {
    학생회장: ["PRESIDENT"],
    부학생회장: ["VICE_PRESIDENT"],
    관리자: ["ADMIN"],
    동문회장: ["LEADER_ALUMNI"],
    교수: ["PROFESSOR"],
    학년대표: ["LEADER_1", "LEADER_2", "LEADER_3", "LEADER_4"],
    학생회: ["COUNCIL"],
    "일반 사용자": ["COMMON"],
  };

  const handleSubmit = async () => {
    if (!boardName.trim()) {
      setIsNameValid(false);
      return;
    }
    if (hasAuth) {
      const boardRequest: Board.CreateBoardDto = {
        boardName: boardName,
        description: boardDescription,
        boardCategory: "APP_NOTICE",
        createRoleList: selectedRoles as User.Role[],
        isAnonymousAllowed: allowAnonymous,
        circleId: circleId as string,
      };
      try {
        await createBoard(boardRequest);
        router.back();
        clearBoardInfo();
      } catch (error) {
        console.error("게시물 생성 에러: ", error);
      }
    } else {
      const boardRequest: Board.ApplyBoardDto = {
        boardName: boardName,
        description: boardDescription,
        isAnonymousAllowed: allowAnonymous,
        circleId: circleId as string,
      };
      try {
        await applyBoard(boardRequest);
        router.back();
        clearBoardInfo();
      } catch (error) {
        console.error("게시물 생성 에러: ", error);
      }
    }
  };
  return (
    <div className="relative bottom-12 top-0 h-full w-full lg:bottom-0">
      <div className="w-full flex-col items-center">
        <PreviousButton />
      </div>
      <div className="flex h-full flex-col p-2 pt-10 lg:p-10">
        <BoardDetailForm />
        <RoleSelectSection roles={roles} />
        <AllowAnonymousToggle />
      </div>

      <button
        onClick={handleSubmit}
        className="fixed bottom-28 left-1/2 -translate-x-1/2 transform rounded-3xl bg-confirm-btn px-6 py-3 font-bold text-white xl:bottom-6"
      >
        {hasAuth ? "게시판 생성" : "게시판 생성 신청"}
      </button>
    </div>
  );
};

export default CreateCircleBoardPage;
