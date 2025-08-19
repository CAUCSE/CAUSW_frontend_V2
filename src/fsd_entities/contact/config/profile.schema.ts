import { z } from 'zod';

export const profileSchema = z.object({
  profileImage: z.any().optional().nullable(),
  email: z.string().email().optional().or(z.literal('')),
  phoneNumber: z
    .string()
    .min(1, { message: '휴대폰 번호를 입력해주세요.' })
    .regex(/^\d{3}-\d{3,4}-\d{4}$/, 'ex) 010-1234-5678 형식으로 입력해주세요.')
    .nullable()
    .optional(),
  description: z.string().nullable().optional(),
  job: z.string().nullable().optional(),
  userCareer: z
    .array(
      z
        .object({
          id: z.string().nullable(),
          description: z.string().nullable().optional(),
          periodStart: z.string().nullable().optional(),
          periodEnd: z.string().nullable().optional(),
        })
        .refine(
          (data) => {
            if (data.description || data.periodStart || data.periodEnd) {
              return !!data.description?.trim();
            }
            return true;
          },
          {
            message: '이력을 입력해주세요',
            path: ['description'],
          },
        ),
    )
    .nullable()
    .optional(),
  githubLink: z.string().url('https:// 로 시작하는 유효한 URL을 입력해주세요.').nullable().optional().or(z.literal('')),
  linkedInLink: z
    .string()
    .url('https:// 로 시작하는 유효한 URL을 입력해주세요.')
    .nullable()
    .optional()
    .or(z.literal('')),
  blogLink: z.string().url('https:// 로 시작하는 유효한 URL을 입력해주세요.').nullable().optional().or(z.literal('')),
  notionLink: z.string().url('https:// 로 시작하는 유효한 URL을 입력해주세요.').nullable().optional().or(z.literal('')),
  instagramLink: z
    .string()
    .url('https:// 로 시작하는 유효한 URL을 입력해주세요.')
    .nullable()
    .optional()
    .or(z.literal('')),
  isPhoneNumberVisible: z.boolean().nullable(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
