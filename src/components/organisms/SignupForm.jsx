import TextInput from "../atoms/TextInput";
import { Button } from "../atoms/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup, checkEmail } from "../../apis/user";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Close from "/close.svg";

const PATTERNS = {
  username: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,20}$/,
  email: /\S+@\S+\.\S+/,
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,24}$/,
  tel: /^[0-9]{10,11}$/,
};

const MESSAGES = {
  username: {
    required: "이름을 입력해주세요.",
    pattern: "이름은 2자 이상 20자 이하, 영어 또는 한글로 입력해주세요.",
  },
  email: {
    required: "이메일을 입력해주세요.",
    pattern: "이메일 형식에 맞지 않습니다.",
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    pattern:
      "비밀번호는 영문, 숫자, 특수기호 조합 8자리 이상으로 입력해주세요.",
  },
  passwordConfirm: {
    required: "비밀번호를 입력해주세요.",
    mismatch: "비밀번호가 일치하지 않습니다.",
  },
  tel: {
    required: "전화번호를 입력해주세요.",
    pattern: "전화번호는 10자리 또는 11자리 숫자여야 합니다",
  },
};

const SignupForm = () => {
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (data) => {
      signup(data);
    },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });

  const email = watch("email");

  const onCheckEmail = async () => {
    setEmailCheckMessage("");
    try {
      const result = await checkEmail(email);
      if (result.data.success) {
        setEmailChecked(true);
        setEmailCheckMessage("사용 가능한 이메일입니다.");
      } else {
        setEmailCheckMessage("이메일 중복 확인에 실패했습니다.");
      }
    } catch (error) {
      setEmailChecked(false);
      setEmailCheckMessage(
        "중복된 이메일이 있습니다. 다른 이메일을 입력해주세요."
      );
    }
  };

  useEffect(() => {
    if (email) {
      setEmailChecked(false);
      setEmailCheckMessage("");
    }
  }, [email]);

  const onSubmit = async (data) => {
    setSubmitMessage("");
    if (!emailChecked) {
      setEmailCheckMessage("이메일 중복체크를 해주세요.");
      return;
    }
    mutation.mutate(data, {
      onSuccess: () => {
        setSubmitMessage("회원가입이 완료되었습니다. 로그인해주세요.");
        navigate("/login");
      },
      onError: (error) => {
        setSubmitMessage(
          error.response?.data?.message ||
            "회원가입에 실패했습니다. 다시 시도해주세요."
        );
      },
    });
  };

  return (
    <div className="relative flex flex-col justify-center h-screen p-4">
      <Button
        className="absolute left-4 top-4"
        onClick={() => {
          navigate("/");
        }}>
        <img src={Close} alt="닫기 버튼" />
      </Button>
      <div className="grid gap-16">
        <h1 className="text-2xl font-bold text-center">회원가입</h1>
        <form
          noValidate
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <TextInput
              type="text"
              placeholder="이름"
              className="w-full"
              {...register("username", {
                required: MESSAGES.username.required,
                pattern: {
                  value: PATTERNS.username,
                  message: MESSAGES.username.pattern,
                },
              })}
            />
          </div>
          {errors.username && (
            <small className="text-red-500" role="alert">
              {errors.username.message}
            </small>
          )}

          <div className="flex justify-between gap-2">
            <TextInput
              type="email"
              placeholder="이메일"
              className="w-full"
              {...register("email", {
                required: MESSAGES.email.required,
                pattern: {
                  value: PATTERNS.email,
                  message: MESSAGES.email.pattern,
                },
              })}
            />

            <Button
              type="button"
              variant="small"
              onClick={onCheckEmail}
              disabled={isSubmitting || !email || errors.email}>
              중복체크
            </Button>
          </div>

          {errors.email && (
            <small className="text-red-500" role="alert">
              {errors.email.message}
            </small>
          )}
          {emailCheckMessage && (
            <small className="text-red-500" role="alert">
              {emailCheckMessage}
            </small>
          )}

          <TextInput
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              required: MESSAGES.password.required,
              pattern: {
                value: PATTERNS.password,
                message: MESSAGES.password.pattern,
              },
            })}
          />
          {errors.password && (
            <small className="text-red-500" role="alert">
              {errors.password.message}
            </small>
          )}
          <TextInput
            type="password"
            placeholder="비밀번호 확인"
            {...register("passwordConfirm", {
              required: MESSAGES.passwordConfirm.required,
              validate: {
                check: (value) => {
                  if (getValues("password") !== value) {
                    return MESSAGES.passwordConfirm.mismatch;
                  }
                },
              },
            })}
          />
          {errors.passwordConfirm && (
            <small className="text-red-500" role="alert">
              {errors.passwordConfirm.message}
            </small>
          )}
          <TextInput
            type="tel"
            placeholder="전화번호"
            {...register("tel", {
              required: MESSAGES.tel.required,
              pattern: {
                value: PATTERNS.tel,
                message: MESSAGES.tel.pattern,
              },
            })}
          />
          {errors.tel && (
            <small className="text-red-500" role="alert">
              {errors.tel.message}
            </small>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="long"
            className="rounded-xl">
            회원가입
          </Button>
          {submitMessage && (
            <small
              className={
                submitMessage.includes("실패") ? "text-red-500" : "text-primary"
              }
              role="alert">
              {submitMessage}
            </small>
          )}

          <Link
            to="/login"
            className="w-full p-4 font-semibold text-center text-gray-700 bg-white h-14 rounded-xl active:filter active:brightness-75">
            로그인
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
