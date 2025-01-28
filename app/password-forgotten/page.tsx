import { Suspense } from "react";
import PasswordForgottenForm from "@/components/password-forgotten-form/passwordForgottenForm";
import BaseLayout from "@/modules/layout/layout";

export default function ResetPasswordPage() {
  return (
    <BaseLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <PasswordForgottenForm />
      </Suspense>
    </BaseLayout>
  );
}
