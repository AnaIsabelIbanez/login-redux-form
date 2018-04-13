import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { changeUsername, changePassword, doLogin } from './actions';
import { getUsername, getPassword } from './selectors';
import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducer';
import saga from './saga';


class Login extends Component {
    doLogin = (ev) => {
      const { username, password } = this.props;
      ev.preventDefault();
      this.props.doLogin({ username, password });
    };

    render() {
      return (
        <Form onSubmit={this.doLogin} >
          <FormGroup validationState="error">
            <ControlLabel>User</ControlLabel>
            <FormControl
              type="text"
              placeholder="User"
              value={this.props.username}
              onChange={({ target }) => this.props.changeUsername(target.value)}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup validationState="error">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="Password"
              value={this.props.password}
              onChange={({ target }) => this.props.changePassword(target.value)}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup>
            <Col smOffset={4} sm={10}>
              <Button type="submit">
                            Login
              </Button>
            </Col>
          </FormGroup>
        </Form>
      );
    }
}

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
