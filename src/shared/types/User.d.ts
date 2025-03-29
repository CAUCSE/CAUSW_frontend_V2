declare namespace User {
  interface ResetPasswordFormData {
    originPassword: string;
    updatedPassword: string;
    confirmPassword: string;
  }

  interface ResetPasswordRequest {
    originPassword: string;
    updatedPassword: string;
  }
} 