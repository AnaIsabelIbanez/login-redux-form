import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Row, Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { changeUsername, changePassword, doLogin } from './actions';
import { getUsername, getPassword } from './selectors';
import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducer';
import saga from './saga/rootSaga';
import { InputField } from '../../components/InputField';


class Login extends Component {
    doLogin = (ev) => {
      const { username, password } = this.props;
      ev.preventDefault();
      this.props.doLogin({ username, password });
    };

    render() {
      return (
        <Form onSubmit={this.doLogin} >
          <Grid>
            <Row>
              <Col md={8}>
                <InputField
                  validationState={this.props.username === '' ? 'error' : ''}
                  width={8}
                  inputWidth={8}
                  error
                  label="User"
                  type="text"
                  placeholder="User"
                  value={this.props.username}
                  onChange={({ target }) => this.props.changeUsername(target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <InputField
                  validationState={this.props.username === '' ? 'error' : ''}
                  width={8}
                  inputWidth={8}
                  error
                  label="Password"
                  type="password"
                  placeholder="Password"
                  value={this.props.password}
                  onChange={({ target }) => this.props.changePassword(target.value)}
                />
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <Col md={8}>
                  <Col md={8}>
                    <div className="pull-right">
                      <Button type="submit">
                        Login
                      </Button>
                    </div>
                  </Col>
                </Col>
              </FormGroup>
            </Row>
          </Grid>
        </Form>
      );
    }
}

export const GenericInput = styled(InputField)`
    .input-label {
        text-align: right;
    }
    .input-field {
        text-align: left;
        width: 100%;
    }
`;

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  doLogin: PropTypes.func,
  changeUsername: PropTypes.func,
  changePassword: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  username: getUsername(),
  password: getPassword(),
});

const mapDispatchToProps = {
  changeUsername,
  changePassword,
  doLogin,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Login);
