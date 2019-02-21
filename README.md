# react-forming
Validation Wrapper for React input elements

## Motivation
 Most React validation libraries seem too imperative for me :smile:

# Quick Start

#### Installation

```js
npm install --save react-forming
  // or  
yarn add react-forming
```

#### Usage
```js
  import React from 'react'
  import FormWrapper from 'react-forming';
  import { email, required } from 'react-forming/validation';

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
          children={({getInputProps, disabled, hasSubmitted}) => {
          }
            <React.Fragment>
              <input {...getInputProps("email")} />
              <input {...getInputProps("password")} />
              <button disabled={disabled}></button>
            </React.Fragment>
          />
        </div>
      );
    }
  }

```

### Validation

- All validators are 'not required' by default so you need to explicitly add a **required** rule For example

###### Displaying validation errors

```js

  import {email, notRequired, minLength, required} from 'react-forming/validation';


  <FormWrapper
    validators={{
      email: [email], //The email field becomes validated only if there's an entry
      confirmEmail: [email, required], //Add the required field for non-empty value validation
      password: [
        { message: "Password must be a least 6 characters long", rule: minLength(6)},
        { message: 'Password field is required', rule: required}
      ]
    }}
    children={({errors, ...rest}) => {
      const {password} = errors; //an array of errors for the validated field
      return {password.map(value => <div>{value}</div>)}
    }}
  />
```
#### Type signatures:

```flow
 // FormWrapper props
 type Rule = (value: string) => boolean;
 type getInputProps = (key: string) => { value: string, onChange: (e: SyntheticEvent) => void };

 {
  value: {[key: string]: string},
  disabled: boolean,
  children: ({getInputProps: getInputProps, disabled, error: {[string]: Array<string>}}) => React.Node,
  onChange: (next: value) => void,
  validators: { key: Array<Rule> | Rule }
  }
```
#### Validation rules:

```js
  import { notRequired } from 'react-forming/validation';

  export const newValidationRule = notRequired(value => {
    return { error: Boolean(value) };
  });
```


### TODO
 - Add input components with validation - Radio, Checkbox etc.
 - Add more custom validation
 - Include testing
 - May add support for flow

### Contribution
  Feel free to fork the repo and create a pr! :smile:
