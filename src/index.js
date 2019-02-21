import React from "react";
import { validate } from "./validation";

class FormWrapper extends React.Component {
  state = {
    hasSubmitted: false,
    submitError: null
  }

  render() {
    let {
      value,
      onChange,
      validators={},
      children,
      onSubmit
    } = this.props;

    let { submitError, hasSubmitted } = this.state;

    const errors =  {};
    for (let [key, rules] of Object.entries(validators)) {
      let result = validate(value[key], rules);
      errors[key] = result.map(rule => {
        if (rule.message) {
          return rule.message
        } else {
          return key;
        }
      });
    }

    const disabled = Object.entries(errors).some(([_, messages]) => messages.length);

    let handleSubmit = async () => {
      try {
        if (disabled) {
          return;
        }
        if (onSubmit) {
          await onSubmit();
          this.setState({ hasSubmitted: true });
        }
      } catch (err) {
        this.setState({ submitError: err, hasSubmitted: false });
      }
    };

    const getInputProps = field => {
      return {
        value: value[field],
        onChange: (e) => {
          e.preventDefault();
          onChange({
            ...value,
            [field]: e.target.value
          });
        },
        onKeyDown: (e) => {
          if (e.which === 13) {
            handleSubmit();
          }
        }
      }
    };

    return children({
      onSubmit: handleSubmit,
      hasSubmitted,
      getInputProps,
      submitError,
      disabled,
      errors
    });
  }
}

export default FormWrapper;
