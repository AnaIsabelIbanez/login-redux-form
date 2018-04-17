/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Col, Grid, Row, Button } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';

import { getClientEditForm, getClientUpdate } from './selectors'
import { getFetch } from '../App/selectors';
import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducer';
import saga from './saga/rootSagas';
import { getClient, updateClient } from './actions';
import ClientForm from './ClientEditForm';
import LoadingIndicator from '../../components/LoadingIndicator';
import { CLIENT_FETCH_KEY } from '../App/fetchConstants';
import { getLiteral } from '../../utils/utilities';
import Icon from '../../components/Icon';


export class ClientEditPage extends Component {
  constructor(props) {
    super(props);
    this.props.onGetClient(this.props.match.params.id);
  }

  render() {
    const {
      fetch,
      client,
      onUpdateClient,
      initialValues,
      editFormValues = {},
    } = this.props;
    return (
      <Grid>
        {fetch[CLIENT_FETCH_KEY].fetching
          ? <LoadingIndicator />
          : <Row>
            <Row>
              <Col md={8}>
                <div className="pull-right">
                  <Icon name="angle-double-left" />
                  <Button onClick={() => this.props.history.push('/clients')} bsStyle="link">{getLiteral('common.goBack')}</Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                {client && <ClientForm
                  initialValues={{ ...initialValues }}
                  submitAction={onUpdateClient}
                  textButton={'client.save'}
                  editFormValues={editFormValues.values}
                />}
              </Col>
            </Row>
          </Row>
        }
      </Grid>
    );
  }
}

ClientEditPage.propTypes = {
  fetch: PropTypes.object,
  client: PropTypes.object,
  onGetClient: PropTypes.func,
  onUpdateClient: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  fetch: getFetch(),
  client: getClientUpdate(),
  initialValues: getClientUpdate(),
  editFormValues: getClientEditForm(),
});


export function mapDispatchToProps(dispatch) {
  return {
    onGetClient: (id) => dispatch(getClient(id)),
    onUpdateClient: (client) => dispatch(updateClient(client)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'clientUpdate', reducer });
const withSaga = injectSaga({ key: 'clientUpdate', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClientEditPage);
