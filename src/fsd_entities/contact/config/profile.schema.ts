import { z } from 'zod';

export const profileSchema = z.object({
  profileImage: z.any().optional().nullable(),
  email: z.string().email().optional().or(z.literal('')),
  phoneNumber: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  job: z.string().nullable().optional(),
  userCareer: z.array(
    z.object({
      id: z.string().nullable(),
      description: z.string().nullable().optional(),
      periodStart: z.string().nullable().optional(),
      periodEnd: z.string().nullable().optional(),
    }).refine(data => {
      if (data.description || data.periodStart || data.periodEnd) {
        return !!data.description?.trim();
      }
      return true;
    }, {
      message: '이력을 입력해주세요',
      path: ['description'],
    })
  ).nullable().optional(),
  githubLink: z.string().url('https:// 로 시작하는 유효한 URL을 입력해주세요.').nullable().optional().or(z.literal('')),
  linkedInLink: z.string().url('https:// 로 시작하는 유효한 URL을 입력해주세요.').nullable().optional().or(z.literal('')),
  blogLink: z.string().url('https:// 로 시작하는 유효한 URL을 입력해주세요.').nullable().optional().or(z.literal('')),
  notionLink: z.string().url('https:// 로 시작하는 유효한 URL을 입력해주세요.').nullable().optional().or(z.literal('')),
  instagramLink: z.string().url('https:// 로 시작하는 유효한 URL을 입력해주세요.').nullable().optional().or(z.literal('')),
  isPhoneNumberVisible: z.boolean().nullable(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
