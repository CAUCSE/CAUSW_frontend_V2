declare namespace Banner {
  export interface Banner {
    id: string;
    url: string;
    image: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export interface BannerListResponseDto {
    count: number;
    events: Banner[];
  }
}
