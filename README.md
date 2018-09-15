# react-forming
Validation Wrapper for React input elements

## Motivation
 Most React validation libraries seem too imperative for me :smile:

# Quick Start

#### Installation

`npm install --save react-forming`  
  or  
`yarn add react-forming`

#### Usage
```javascript
  import React from 'react'
  import { FormWrapper, Input } from 'react-forming';
  import {email, required} from 'react-forming/validation';

  class SimpleForm extends React.Component {
    state = {
      value: {
        email: "",
        password: ""
      }
    }

    handleSubmit = async (e) => {
      const response = await fetch('http://api.github.com', {
        method: 'POST',
        body: this.state.value
      });
      const result = await response.json();
    };

    render() {      
      return(
        <div>
          <FormWrapper
            value={this.state.value}
            validators={{
              email: [email, required] //You can add as many validation rules for a single input field
              password: [required]
            }}
            onChange={next => {
              this.setState({value: next});
            }}
            onSubmit={this.handleSubmit}
          >{({getInputProps, isValid}) =>
            <React.Fragment>
              <Input {...getInputProps("email")} />
              <input {...getInputProps("password")} /> //Works with normal <input />
              <button disabled={!isValid}></button>
            </React.Fragment>
          }</FormWrapper>
        </div>
      );
    }
  }

```

### Validation

- All validators are 'not required' by default so you need to explicitly add a **required** rule For example

###### Example 1

```js

  import {email, notRequired, required} from 'react-forming/validation';


  <FormWrapper
    validators={{
      email: [email], //The email field becomes validated only if there's an entry
      confirmEmail: [email, required], //Add the required field for non-empty value validation
      password: [
        {message: "Password must be a least 6 characters long", rule: password},
        {message: 'Password field is required', rule: required}
      ]
    }({errors, ...rest}) => {
      const {password} = errors; //an array of errors for the validated field
      return {password.map(value => <div>{value}</div>)}
    }}
  />
```
### Type signatures:  
FormWrapper
```js
    value: Object //This is usually a key value pair of the form fields
    isValid: Boolean
    Validator: (value: String) => Boolean
    getInputProps: (key: String) => { value: String, onChange: (e: SyntheticEvent) => void }
    children: ({getInputProps: getInputProps, isValid, error: {field: Array<String>}}) => ReactNode
    onChange: (next: Object) => void
    validators: { key: Array<Validator> | Validator }
```
Input
```js  
    value: String,
    onChange: (e: SyntheticEvent) => void,
    onFocus: (e: SyntheticEvent) => void,
    onBlur: (e: SyntheticEvent) => void,
    label: String,
    labelStyle: String,
    errorStyle: String,
    className: String,
    isRequired: Boolean,
    errorMessage: String,
    errorMessageStyle: String,
    disabled: Boolean,
    validations: Array<Validator>

    //And other valid input fields e,g type, name, placeholder ...etc
```
### TODO
 - Add other input type components - Radio, Checkbox etc.
 - Add more custom validation
 - Include testing
 - May add support for flow

### Contribution
  Feel free to fork the repo and create a pr! :smile:
