import React from "react";
import validator from "validator";

const isEmpty = value => {
  if (!value) return true;
  return value.toString().trim().length === 0;
};

const notRequired = next => value => {
  if (!isEmpty(value)) return next(value);
};

export const required = value => {
  if (isEmpty(value)) {
    return true;
  }
};

export const email = notRequired(value => {
  if (!validator.isEmail(value)) {
    return true;
  }
});

export const number = notRequired(value => {
  if (!/^\d+$/.test(value)) {
    return true;
  }
});

export const passwordMatch = otherPassword =>
  notRequired(value => {
    if (otherPassword !== value) {
      return true;
    }
  });

export const maxLength = length =>
  notRequired(value => {
    if (value.toString().length > length) {
      return true;
    }
  });

export const minLength = length =>
  notRequired(value => {
    if (length > value.toString().length) {
      return true;
    }
  });

export const validate = (value, validations) => {
  return validations.some(rules => Boolean(rules(value)));
};
