import React from "react";
import { validate } from "./validation";
import InputWrapper from './InputWrapper';

export const FormWrapper = ({
  value,
  onChange,
  validators={},
  children,
  onSubmit
}) => {
  const entriesWithErrors = Object.entries(validators)
    .reduce((acc, [key, rules]) => {
      let result = validate(value[key], rules);
      acc[key] = result.map(rule => {
        if (rule.message) {
          return rule.message
        } else {
          return key;
        }
      }, {});
      return acc;
    }, {});

  const isValid = !Object.entries(entriesWithErrors).some(([_, messages]) => messages.length);

  const getInputProps = field => {
    return {
      value: value[field],
      onChange: e => {
        e.preventDefault();
        onChange({...value, [field]: e.target.value});
      }
    }
  };

  return(
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit && onSubmit(e)
      }}>
        {children({getInputProps, isValid, errors: entriesWithErrors})}
    </form>
  );
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
  type,
  items,
  children,
  optionLabel,
  optionValue,
  defaultOption,
  ...rest
}) => {
  const isString = value => typeof value === "string";
  return (
    <InputWrapper
      {...rest}
      children={props => (
        <select {...props}>
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
