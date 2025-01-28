import ResetPasswordForm from "@/modules/reset-password-form/resetPasswordForm";
import Background from "@/components/background/background";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <>
      <Background />
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}
