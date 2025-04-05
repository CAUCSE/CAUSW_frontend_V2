declare namespace Occasion {
  export interface CreateCeremonyRequestDto {
    description: string;
    startDate: string;
    endDate: string;
    category: 'MARRIAGE' | 'FUNERAL' | 'ETC';
  }
}
