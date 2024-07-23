import { LoginForm } from "../components/login-form";

export function Login() {
  return (
    <div class="flex justify-center items-center min-h-dvh">
      <div class="bg-brand-900 p-10">
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
