declare namespace Home {
  export type GetHomePostsResponseDto = {
    board: {
      id: string;
      name: string;
      category: string;
    };
    posts: Post.Posts;
  }[];

  type Event = {
    id: string;
    url: string;
    image: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };

  export type GetEventsResponseDto = {
    count: number;
    events: Event[];
  };

  type Calendar = {
    id: string;
    year: number;
    month: number;
    image: string;
    createdAt: string;
    updatedAt: string;
  };

  export type GetCalendarsResponseDto = {
    counts: number;
    calendars: Calendar[];
  };

  /* export type GetHomePageResponse = {
    board: Model.Board;
    posts: Model.Post[];
  }[]; */
}
