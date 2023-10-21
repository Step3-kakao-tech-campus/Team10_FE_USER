import React from "react";
import { Bottomsheet } from "../atoms/Bottomsheet";
import bdbdlogo from "/bdbd.svg";
import { Input } from "../atoms/Input";

export const LoginForm = () => {
  return (
    <Bottomsheet>
      <div className="relative w-full h-24">
        <img
          className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-36"
          src={bdbdlogo}
          alt="뽀득뽀득 로고"
        />
      </div>
      <div className="flex-row">
        <Input className="my-2" placeholder="이메일"></Input>
        <Input className="my-2" placeholder="비밀번호"></Input>
        <div className="my-2 font-semibold">회원가입</div>
      </div>
    </Bottomsheet>
  );
};
