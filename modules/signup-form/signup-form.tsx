import "./signup-form.css";

import SignupFormInput from "@/components/signup-form-input/signup-form-input";
import Link from "next/link";

export default function SignupForm() {
  return (
    <form className={"signup-form-container"}>
      <div className={"signup-form-title"}>Sign up</div>
      <SignupFormInput label={"email"} type={"email"} />
      <SignupFormInput label={"username"} />
      <SignupFormInput label={"password"} type={"password"} />
      <SignupFormInput label={"confirm password"} type={"password"} />
      <Link href="/challenge" className={"signup-form-submit-button-link"}>
        <button type={"submit"} className={"signup-form-submit-button"}>
          Sign up
        </button>
      </Link>
    </form>
  );
}
