import TextInput from "../atoms/TextInput";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/user";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/Button";

const LoginForm = () => {
  const mutation = useMutation({
    mutationFn: (data) => {
      return login(data);
    },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <form
      noValidate
      className="grid gap-4 p-4"
      onSubmit={handleSubmit((data) => {
        mutation.mutate(data, {
          onSuccess: () => {
            navigate("/");
          },
          onError: (error) => {
            console.error(error);
          },
        });
      })}>
      <TextInput
        type="email"
        placeholder="이메일"
        {...register("email", {
          required: "이메일은 필수 입력힙니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "이메일 형식에 맞지 않습니다.",
          },
        })}
      />
      {errors.email && (
        <small className="text-red-500" role="alert">
          {errors.email.message}
        </small>
      )}
      <TextInput
        type="password"
        placeholder="비밀번호"
        {...register("password", {
          required: "비밀번호는 필수 입력입니다.",
        })}
      />
      {errors.password && (
        <small className="text-red-500" role="alert">
          {errors.password.message}
        </small>
      )}
      <Button type="submit" disabled={isSubmitting} variant="long">
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
