import { create } from "zustand";

interface PostListState {
  isBoardFavorite: boolean;
  posts: Post.PostResponseDto[];
  boardName: string;
  page: number;
  initialLoading: boolean;
  scrollLoading: boolean;
  hasMore: boolean;

  setIsBoardFavorite: (value: boolean) => void;
  setPosts: (
    post:
      | Post.PostResponseDto[]
      | ((prevPosts: Post.PostResponseDto[]) => Post.PostResponseDto[]),
  ) => void;
  setBoardName: (name: string) => void;
  setPage: (page: number | ((prev: number) => number)) => void;
  setInitialLoading: (loading: boolean) => void;
  setScrollLoading: (loading: boolean) => void;
  setHasMore: (value: boolean) => void;
}

export const usePostListStore = create<PostListState>((set) => ({
  isBoardFavorite: false,
  posts: [],
  boardName: "",
  page: 0,
  initialLoading: true,
  scrollLoading: false,
  hasMore: false,

  setIsBoardFavorite: (value: boolean) =>
    set(() => ({ isBoardFavorite: value })),
  setPosts: (posts) =>
    set((state) => ({
      posts: typeof posts === "function" ? posts(state.posts) : posts,
    })),
  setBoardName: (name: string) => set(() => ({ boardName: name })),
  setPage: (page) =>
    set((state) => ({
      page:
        typeof page === "function"
          ? (page as (prev: number) => number)(state.page)
          : page,
    })),
  setInitialLoading: (loading: boolean) =>
    set(() => ({ initialLoading: loading })),
  setScrollLoading: (loading: boolean) =>
    set(() => ({ scrollLoading: loading })),
  setHasMore: (value: boolean) => set(() => ({ hasMore: value })),
}));
