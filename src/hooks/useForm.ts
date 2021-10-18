import { ChangeEvent, FormEvent, useState } from "react";

type Fn = (a: string | number) => string | number;

export const useForm = (options: any) => {
  const [data, setData] = useState(options?.initialValues || {});
  const [errors, setErrors] = useState<any>({});

  const handleChange = (key: string, sanitizeFn?: Fn) => (e: any) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;

    setData({
      ...data,
      [key]: value,
    });
  };

  const customHandleChange =
    (key: string, sanitizeFn?: Fn) => (inputValue: any) => {
      const value = sanitizeFn ? sanitizeFn(inputValue) : inputValue;
      setData({ ...data, [key]: value });
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validations = options?.validations;

    if (validations) {
      let valid = true;
      const newErrors = {};

      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          //eslint-disable-next-line
          //@ts-ignore
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit(data);
    }
  };

  return {
    setData,
    data,
    handleChange,
    customHandleChange,
    handleSubmit,
    errors,
  };
};
