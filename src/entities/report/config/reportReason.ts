// 신고 사유 Enum (서버 Enum과 동일 키 값)
export enum ReportReason {
  SPAM_AD = 'SPAM_AD', // 낚시/놀람/도배
  ABUSE_LANGUAGE = 'ABUSE_LANGUAGE', // 욕설/비하
  COMMERCIAL_AD = 'COMMERCIAL_AD', // 상업적 광고 및 판매
  INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT', // 음란물/불건전한 만남 및 대화
  FRAUD_IMPERSONATION = 'FRAUD_IMPERSONATION', // 유출/사칭/사기
  OFF_TOPIC = 'OFF_TOPIC', // 게시판 성격에 부적절함
  POLITICAL_CONTENT = 'POLITICAL_CONTENT', // 정당/정치인 비하 및 선거운동
  ILLEGAL_VIDEO = 'ILLEGAL_VIDEO', // 불법촬영물 등의 유통
}

// 한글 라벨 (간단 표시용)
export const ReportReasonLabels: Record<ReportReason, string> = {
  [ReportReason.SPAM_AD]: '낚시/놀람/도배',
  [ReportReason.ABUSE_LANGUAGE]: '욕설/비하',
  [ReportReason.COMMERCIAL_AD]: '상업적 광고 및 판매',
  [ReportReason.INAPPROPRIATE_CONTENT]: '음란물/불건전한 만남 및 대화',
  [ReportReason.FRAUD_IMPERSONATION]: '유출/사칭/사기',
  [ReportReason.OFF_TOPIC]: '게시판 성격에 부적절함',
  [ReportReason.POLITICAL_CONTENT]: '정당/정치인 비하 및 선거운동',
  [ReportReason.ILLEGAL_VIDEO]: '불법촬영물 등의 유통',
};

// UI에서 사용할 라벨 + 확인 팝업 메시지
export const ReportReasonMeta: Record<
  ReportReason,
  {
    label: string;
    confirmTitle: string;
    confirmBody: string;
  }
> = {
  [ReportReason.INAPPROPRIATE_CONTENT]: {
    label: '음란물/불건전한 만남 및 대화',
    confirmTitle: '음란물/불건전한 만남 및 대화',
    confirmBody:
      '청소년유해매체물, 외설, 음란물, 음담패설, 신체사진을 포함하거나, 불건전한 만남, 채팅, 대화, 통화를 위한 게시물인가요? \n\n허위 신고 시 제재될 수 있습니다.',
  },
  [ReportReason.POLITICAL_CONTENT]: {
    label: '정당/정치인 비하 및 선거운동',
    confirmTitle: '정치 관련 비하/선거운동',
    confirmBody:
      '특정 정당/정치인을 비난/비하/모욕하거나 지지/홍보/선거운동 및 선거 관련법에 위배되는 게시물인가요? \n\n허위 신고 시 제재될 수 있습니다.',
  },
  [ReportReason.OFF_TOPIC]: {
    label: '게시판 성격에 부적절함',
    confirmTitle: '게시판 성격에 부적절',
    confirmBody:
      '게시물의 주제가 게시판의 성격에 크게 벗어나, 다른 이용자에게 불편을 끼칠 수 있는 게시물인가요? \n\n허위 신고 시 제재될 수 있습니다.',
  },
  [ReportReason.ILLEGAL_VIDEO]: {
    label: '불법촬영물 등의 유통',
    confirmTitle: '불법촬영물/불법 유통',
    confirmBody:
      '불법촬영물, 허위영상물, 아동 • 청소년 성착취물 등 관련법에 위배되는 게시물인가요? \n\n허위 신고 시 제재될 수 있습니다.',
  },
  [ReportReason.SPAM_AD]: {
    label: '낚시/놀람/도배',
    confirmTitle: '낚시/놀람/도배',
    confirmBody: '중복글, 도배글, 낚시글, 내용없는 게시물인가요? \n\n허위 신고 시 제재될 수 있습니다.',
  },
  [ReportReason.FRAUD_IMPERSONATION]: {
    label: '유출/사칭/사기',
    confirmTitle: '유출/사칭/사기',
    confirmBody:
      '게시물 무단 유출, 타인의 개인정보 유출, 관리자 사칭 등 타인의 권리를 침해하거나 관련법에 위배되는 게시물인가요? \n\n허위 신고 시 제재될 수 있습니다.',
  },
  [ReportReason.ABUSE_LANGUAGE]: {
    label: '욕설/비하',
    confirmTitle: '욕설/비하',
    confirmBody:
      '비아냥, 비속어 등 예의범절에 벗어나거나, 특정인이나 단체, 지역을 비방하는 등 논란 및 분란을 일으킬 수 있는 게시물인가요? \n\n허위 신고 시 제재될 수 있습니다.',
  },
  [ReportReason.COMMERCIAL_AD]: {
    label: '상업적 광고 및 판매',
    confirmTitle: '상업적 광고/판매',
    confirmBody:
      '타 서비스, 앱, 사이트 등 게시판 외부로 회원을 유도하거나 공동구매, 할인 쿠폰, 홍보성 이벤트 등 허가되지 않은 광고/홍보 게시물인가요? \n\n허위 신고 시 제재될 수 있습니다.',
  },
};
