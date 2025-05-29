'use client';

import React from 'react';

import { ResetPasswordForm } from '@/fsd_widgets/auth';

const PasswordResetPage = () => {
  return (
    <div className="bg-board-page-background flex min-h-screen flex-col items-center justify-center px-4 sm:px-0">
      <ResetPasswordForm />
    </div>
  );
};

export default PasswordResetPage;
