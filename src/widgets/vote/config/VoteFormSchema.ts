import { z } from 'zod';

export const voteFormSchema = z
  .record(z.custom<Vote.VoteOption['id']>(), z.boolean().optional())
  .refine((data) => {
    return Object.values(data).some((value) => value);
  });

export type VoteFormSchema = z.infer<typeof voteFormSchema>;
