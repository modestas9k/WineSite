import React from "react";
import * as S from "./Input.style";

function Input({
  label,
  name,
  handleChange,
  type,
  placeholder,
  SelectOptions,
}) {
  switch (type) {
    case "password":
      return (
        <S.InputBox>
          <S.Label htmlFor={name}>{label}</S.Label>
          <S.InputField
            onChange={handleChange}
            id={name}
            key={name}
            name={name}
            type="password"
            placeholder={placeholder}
            required
          />
        </S.InputBox>
      );
    case "email":
      return (
        <S.InputBox>
          <S.Label htmlFor={name}>{label}</S.Label>
          <S.InputField
            onChange={handleChange}
            id={name}
            key={name}
            name={name}
            type="email"
            placeholder={placeholder}
            required
          />
        </S.InputBox>
      );
    case "select":
      return (
        <S.InputBox>
          <S.Label htmlFor={name}>{label}</S.Label>
          <S.SelectField
            onChange={handleChange}
            id={name}
            key={name}
            name={name}
            type="select"
            placeholder={placeholder}
            required
          >
            <option value="" defaultValue>
              Select option
            </option>
            {SelectOptions &&
              SelectOptions.map((item) => {
                if (item.name && item.region && item.type && item.year) {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name} {item.region} {item.year} {item.type}
                    </option>
                  );
                } else {
                  return (
                    <option value={item.type} key={item.id}>
                      {item.type}
                    </option>
                  );
                }
              })}
          </S.SelectField>
        </S.InputBox>
      );
    default:
      return (
        <S.InputBox>
          <S.Label htmlFor={name}>{label}</S.Label>
          <S.InputField
            onChange={handleChange}
            id={name}
            name={name}
            type={type}
            key={name}
            placeholder={placeholder}
            required
          />
        </S.InputBox>
      );
  }
}

export default Input;
