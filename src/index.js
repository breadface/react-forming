import React from "react";
import { validate } from "./validation";
import InputWrapper from './InputWrapper';


//TODO:: Might want to return a <form> wrapper
export const FormWrapper = ({
  value,
  onChange,
  validators={},
  children,
  errorClassName
}) => {
  const isInvalid = Object.entries(validators)
    .map(([key, validations]) => {
      return validate(value[key], validations);
    }).some(Boolean);

  const getInputProps = field => {
    return {
      value: value[field],
      onChange: e => {
        e.preventDefault();
        onChange({...value, [field]: e.target.value});
      }
    }
  };
  return children({getInputProps, isValid: !isInvalid});
};


//Input components
export const Input = props => {
  return (
    <InputWrapper
      {...props}
      children={props => <input {...props}  />}
    />
  );
};

export const Select = ({
  optionValue,
  optionLabel,
  defaultOption,
  items,
  children,
  ...rest
}) => {
  const isString = value => typeof value === "string";
  return (
    <InputWrapper
      {...rest}
      children={props => (
        <select {...props} type={undefined}>
          <option value="">{defaultOption || "Select an option"}</option>
          {items.map((item, index) => (
            <option
              key={index}
              value={isString(item) ? item : item[optionValue]}
            >
              {isString(item) ? item : item[optionLabel]}
            </option>
          ))}
        </select>
      )}
    />
  );
};
