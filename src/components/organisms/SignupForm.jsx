import TextInput from "../atoms/TextInput";
import { Button } from "../atoms/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup, checkEmail } from "../../apis/user";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailError, setEmailError] = useState();
  const [signupStatus, setSignupStatus] = useState();

  const onCheckEmail = async () => {
    try {
      const result = await checkEmail(email);
      if (result.data.success) {
        setEmailChecked(true);
        setEmailError("");
      }
      setSignupStatus("사용 가능한 이메일입니다. 회원가입을 진행해주세요.");
    } catch (error) {
      setEmailChecked(false);
      setEmailError("중복된 이메일이 있습니다. 다른 이메일을 입력해주세요.");
    }
  };

  useEffect(() => {
    setSignupStatus("");
    if (emailChecked) setEmailChecked(false);
  }, [email]);

  const onSubmit = async (data) => {
    if (!emailChecked) {
      alert("이메일 중복체크를 해주세요.");
      return;
    }
    mutation.mutate(data, {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다. 로그인해주세요.");
        navigate("/login");
      },
      onError: () => {
        alert("회원가입에 실패했습니다. 다시 시도해주세요");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 p-10 my-20 bg-white border border-gray-300 rounded-lg shadow-md ">
      <div className="text-2xl font-bold text-center text-primary">
        회원가입
      </div>
      <form
        noValidate
        className="flex flex-col gap-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <TextInput
            type="text"
            placeholder="이름"
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
        <div className="flex gap-4">
          <div className="flex justify-between gap-2">
            <TextInput
              type="email"
              placeholder="이메일"
              className="w-auto"
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
              variant="checkemail"
              onClick={onCheckEmail}
              disabled={isSubmitting || !email || errors.email}
            >
              중복체크
            </Button>
          </div>
        </div>
        {errors.email && (
          <small className="text-red-500" role="alert">
            {errors.email.message}
          </small>
        )}
        {emailError && ( // 이메일 오류 메시지 출력
          <small className="text-red-500" role="alert">
            {emailError}
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
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md"
        >
          회원가입
        </Button>
        {signupStatus && ( // 회원가입 상태 메시지 출력
          <small className="text-green-500" role="alert">
            {signupStatus}
          </small>
        )}
        <Link to="/login">로그인</Link>
      </form>
    </div>
  );
};

export default SignupForm;
