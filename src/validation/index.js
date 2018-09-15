import React from "react";
import validator from "validator";

const isEmpty = value => {
  if (!value) return true;
  return value.toString().trim().length === 0;
};

const notRequired = next => value => {
  if (!isEmpty(value)) {
    // return validate(value, next);
    return next(value);
  } else {
    return {error: false};
  }  
};

export const required = value => {
  if (isEmpty(value)) {
    return {error: true};
  } else {
    return {error: false};
  }
};

export const email = notRequired(value => {
  if (!validator.isEmail(value)) {
    return {error: true};
  } else {
    return {error: false};
  }
});

export const number = notRequired(value => {
  if (!/^\d+$/.test(value)) {
    return { error: true};
  } else {
    return {error: false};
  }
});

export const passwordMatch = otherPassword =>
  notRequired(value => {
    if (otherPassword !== value) {
      return {error: true};
    } else {
      return {error: false};
    }
  });

export const maxLength = length =>
  notRequired(value => {
    if (value.toString().length > length) {
      return {error: true};
    } else {
      return {error: false};
    }
  });

export const minLength = length =>
  notRequired(value => {
    if (length > value.toString().length) {
      return {error: true};
    } else {
      return {error: false};
    }
  });

export const validate = (value, validations) => {
  const rules = Array.isArray(validations) ? validations : [validations];
    //multiple validation against a field
  return rules.map(validator => {
    if (validator.rule) {
      return { ...validator.rule(value), ...validator};
    } else {
      return validator(value);
    }
  }).filter(rule => rule.error);  
};
