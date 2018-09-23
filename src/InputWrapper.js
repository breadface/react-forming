import React from "react";
import PropTypes from "prop-types";
import { required, validate } from "./validation";

const NOOP = () => {};

export default class InputWrapper extends React.Component {
  static defaultProps = {
    value: "",
    onChange: NOOP,
    onFocus: NOOP,
    onBlur: NOOP,
    label: "",
    labelStyle: "",
    errorMessage: "",
    errorMessageStyle: "",
    className: "",
    disabled: false,
    isRequired: false,
    validations: []
  };

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    label: PropTypes.string,
    labelStyle: PropTypes.string,
    errorStyle: PropTypes.string,
    className: PropTypes.string,
    isRequired: PropTypes.bool,
    errorMessage: PropTypes.string,
    errorMessageStyle: PropTypes.string,
    disabled: PropTypes.bool,
    validations: PropTypes.arrayOf(PropTypes.func)
  };

  state = {
    error: false
  };

  render() {
    const {
      value,
      label,
      labelStyle,
      isRequired,
      errorMessage,
      errorClass,
      errorMessageStyle,
      className,
      validations,
      onBlur,
      onFocus,
      children,
      ...rest
    } = this.props;
    const { error } = this.state;
    const inputClassName = error ? `${className} ${errorClass}` : className;
    return (
      <label>
        <span className={labelStyle}>{label}</span>
        {children({
          onFocus: e => {
            this.setState({ error: false });
            onFocus(e);
          },
          onBlur: e => {
            this.setState({
              error: validate(
                value,
                isRequired ? [...validations, required] : validations
              )
            });
            onBlur(e);
          },
          value,
          className: inputClassName,
          ...rest
        })}
        {error &&
          Boolean(value) &&
          errorMessage && (
            <span className={errorMessageStyle}>{errorMessage}</span>
          )}
      </label>
    );
  }
}
