import { useState } from "react";

interface Options<T> {
  validate?: (form: T) => boolean;
}

export const useFormFields = <T extends Record<string, string>>(
  fields: (keyof T)[],
  options?: Options<T>
) => {
  const [form, setForm] = useState<T>(() =>
    fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {} as T)
  );

  const handleChange =
    (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  //form의 모든 값이 빈칸이 아닌지 검사
  const defaultValidation = () =>
    Object.values(form).every((value) => value.trim() !== "");

  //검사 요소(로그인: 디폴트(모든 값 입력) | 회원가입: 디폴트 + 비번 2개 입력창 입력값 같은지
  const isValid = options?.validate
    ? options.validate(form)
    : defaultValidation();

  return { form, handleChange, isValid };
};
