'use client';

import React from 'react';

import { ResetPasswordForm } from '@/fsd_widgets/auth';

import { PreviousButton } from '@/fsd_shared';

const PasswordResetPage = () => {
  return (
    <div className="bg-board-page-background relative flex h-full flex-col items-center justify-center px-4 sm:px-0">
      <PreviousButton className="absolute top-6 left-6 pl-5" />
      <ResetPasswordForm />
    </div>
  );
};

export default PasswordResetPage;
