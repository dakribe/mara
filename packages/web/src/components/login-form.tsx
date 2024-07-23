import { createForm, SubmitHandler, valiForm } from "@modular-forms/solid";
import ky from "ky";
import * as v from "valibot";

const LoginSchema = v.object({
  username: v.string(),
  password: v.string(),
});

type LoginForm = v.InferInput<typeof LoginSchema>;

async function login(username: string, password: string) {
  const json = await ky.post("http://localhost:3000/login", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  console.log(await json.json());
}

export function LoginForm() {
  const [, { Form, Field }] = createForm<LoginForm>({
    validate: valiForm(LoginSchema),
  });

  const handleLogin: SubmitHandler<LoginForm> = async (data) => {
    const bool = await login(data.username, data.password);
    console.log(bool);
  };

  return (
    <div class="w-40">
      <Form onSubmit={handleLogin}>
        <div class="flex flex-col gap-4">
          <Field name="username">
            {(field, props) => (
              <div>
                <input {...props} type="text" placeholder="username" />
              </div>
            )}
          </Field>
          <Field name="password">
            {(field, props) => (
              <input {...props} type="text" placeholder="********" />
            )}
          </Field>
          <button class="bg-brand-500 text-foreground px-4 py-2">Login</button>
        </div>
      </Form>
    </div>
  );
}
