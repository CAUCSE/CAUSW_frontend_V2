declare namespace Calendar {
  export interface CalendarsResponseDto {
    count: number;
    calendars: CalendarResponseDto[];
  }

  export interface CalendarResponseDto {
    id: string;
    year: number;
    month: number;
    image: string;
    createdAt: string;
    updatedAt: string;
  }
}
