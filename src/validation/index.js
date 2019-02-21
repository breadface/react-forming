import React from "react";
import validator from "validator";

const isEmpty = value => {
  if (!value) return true;
  return value.toString().trim().length === 0;
};

export const notRequired = next => value => {
  if (!isEmpty(value)) {
    // return validate(value, next);
    return next(value);
  } else {
    return { error: false };
  }
};

export const required = value => {
  return {
    error: isEmpty(value)
  };
};

export const email = notRequired(value => {
  return {
    error: !validator.isEmail(value)
  };
});

export const number = notRequired(value => {
  return {
    error: !/^\d+$/.test(value)
  }
});

export const phoneNumber =  (locale) => notRequired(value => {
  return {
    error: !validator.isMobilePhone(value, locale)
  }
});

export const passwordMatch = otherPassword =>
  notRequired(value => {
    return {
      error: otherPassword !== value
    };
  });

export const maxLength = length =>
  notRequired(value => {
    return {
      error: value.toString().length > length
    };
  });

export const minLength = length =>
  notRequired(value => {
    return {
      error: length > value.toString().length
    };
  });

export const validate = (value, validations) => {
  const rules = Array.isArray(validations) ? validations : [validations];
  return rules
    .map(validator => {
      if (validator.rule) {
        return { ...validator.rule(value), ...validator };
      } else {
        return validator(value);
      }
    })
    .filter(rule => rule.error);
};
