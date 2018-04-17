import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import styled from 'styled-components';
import FieldWithTooltip from './FieldWithTooltip';


export const InputField = ({ className = '', width, inputWidth, label, value, onChange, error, errorMessage, validationState, ...props }) => (<FormGroup validationState={validationState}>
  <div className={className} >
    {label && <Col componentClass={ControlLabel} md={width} className="input-label">{label}</Col>}
    <Col md={inputWidth || width}>
      <FormControl
        className="input-field"
        type="text"
        value={value}
        onChange={onChange}
        validationstate={error === true ? 'error' : null}
        {...props}
      />
    </Col>
  </div>
</FormGroup>);

export const InputWithError = ({ ...props }) => (<FieldWithTooltip
  id={props.name}
  message={props.errorMessage}
>
  <InputField
    {...props}
  />
</FieldWithTooltip>);

export const InputValidation = ({ ...props }) => props.errorMessage && props.validationState === 'error'
  ? <InputWithError {...props} />
  : <InputField {...props} />;


InputField.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  inputWidth: PropTypes.number,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  value: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  validationState: PropTypes.string,
};

export const GenericInput = styled(InputValidation)`
    .input-label {
        text-align: right;
    }
    .input-field {
        text-align: left;
        width: 100%;
    }
`;

export const Input = styled(InputValidation)`
    padding: 20px 0;
`;

export const InputForm = GenericInput.extend`
    padding: 20px 0;
`;
