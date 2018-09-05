# react-forming
Validation Wrapper for React input elements

## Motivation
 Most React validation libraries seem too imperative for me :smile:

# Quick Start

`npm install --save react-forming or yarn add react-forming`

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
    
    render() {      
      return(
        <div>
          <FormWrapper
            value={this.state.value}
            validators={{
              email: [email, required] //You can add as many validtion rules for a single input field
              password: [required]
            }}
            onChange={next => {
              this.setState({value: next});
            }}
          >{({getInputProps, isValid}) => 
            <React.Fragment>
              <Input {...getInputProps("email")} />
              <Input {...getInputProps("password")} />
              <button disabled={!isValid}></button>
            </React.Fragment>
          }</FormWrapper>
        </div>
      );
    }
  }

```


### Type signatures:  
FormWrapper
```js
    value: Object //This is usually a key value pair of the form fields 
    isValid: Boolean 
    Validator: (value: String) => Boolean
    getInputProps: (key: String) => { value: String, onChange: (e: SyntheticEvent) => void }
    children: ({getInputProps: getInputProps, isValid}) => ReactNode
    onChange: (next: Object) => void 
    validators: { key: Array<Validator> }
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