import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shadcn/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        enrolled: 'border-transparent bg-[#599972] text-white rounded-full', // 재학생
        graduated: 'border-transparent bg-gray-500 text-white rounded-full', // 졸업생
        leave_of_absence: 'border-transparent bg-yellow-600 text-white rounded-full', // 휴학생
        president: 'border-transparent bg-[#5D5999] text-white rounded-full', // 학생회장
        vice_president: 'border-transparent bg-[#3B5998] text-white rounded-full', // 부학생회장
        leader_alumni: 'border-transparent bg-[#996B59] text-white rounded-full', // 동문회장
        alumni_manager: 'border-transparent bg-[#805E4D] text-white rounded-full', // 동문회 관리자
        leader_1: 'border-transparent bg-[#7AA2E3] text-white rounded-full', // 1학년 대표
        leader_2: 'border-transparent bg-[#6794DC] text-white rounded-full', // 2학년 대표
        leader_3: 'border-transparent bg-[#507CD3] text-white rounded-full', // 3학년 대표
        leader_4: 'border-transparent bg-[#3C68C7] text-white rounded-full', // 4학년 대표
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
