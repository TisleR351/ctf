import "./signin-form.css";

import SignupFormInput from "@/components/signup-form-input/signup-form-input";
import Link from "next/link";

export default function SigninForm() {
  return (
    <form className={"signin-form-container"}>
      <div className={"signin-form-title"}>Sign in</div>
      <SignupFormInput label={"username"} />
      <SignupFormInput label={"password"} type={"password"} />
      <Link
        href={"/forgotten-password"}
        className={"signin-form-forgotten-password"}
      >
        password forgotten?
      </Link>
      <Link href="/challenge" className={"signin-form-submit-button-link"}>
        <button type={"submit"} className={"signin-form-submit-button"}>
          Sign in
        </button>
      </Link>
    </form>
  );
}
