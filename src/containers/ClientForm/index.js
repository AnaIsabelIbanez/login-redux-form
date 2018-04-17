import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Grid, Row, Button, Panel } from 'react-bootstrap';
import { Field } from 'redux-form';

import { getLiteral } from '../../utils/utilities';
import { Input } from '../../components/InputField';
import Map from '../../components/Map';
import { isEmptyString } from '../../utils/validators';


const required = (value) => isEmptyString(value) ? 'Required' : undefined;

// eslint-disable-next-line react/prop-types
const CustomField = ({ fields, nameField, onChange, input, meta: { touched, error }, ...props }) => (
  <span>
    <Input
      validationState={(touched && error) ? 'error' : null}
      errorMessage={error}
      {...input}
      {...props}
    />
  </span>
);

const ClientForm = ({
  submitAction,
  textButton,
  handleSubmit, pristine, reset, submitting,
  initialValues = {},
  editFormValues = {},
  ...props
}) => {
  const { address = { } } = editFormValues;
  const { geo = {} } = address;
  const latitude = parseFloat(geo.lat);
  const longitude = parseFloat(geo.lng);


  const submit = (values, dispatch, props) => {
    const id = initialValues.id ? { id: initialValues.id } : {};
    submitAction({ ...values, ...id });
  };
  return (
    <Form
      inline
      onSubmit={handleSubmit(submit)}
    >
      <Grid>
        <Row>
          <Col md={8}>

            <Panel>
              <Panel.Heading>{getLiteral('client.detail')}</Panel.Heading>
              <Panel.Body className="panel-body">
                <Row>
                  <Col md={6}>
                    <Field
                      name="name"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.name')}
                      validate={[required]}
                    />

                  </Col>
                  <Col md={6}>
                    <Field
                      name="username"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.username')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Field
                      name="email"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.email')}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      name="phone"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.phone')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Field
                      name="website"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.website')}
                    />
                  </Col>
                </Row>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col md={8}>

            <Panel>
              <Panel.Heading>{getLiteral('client.address')}</Panel.Heading>
              <Panel.Body className="panel-body">
                <Row>
                  <Col md={6}>
                    <Field
                      name="address.street"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.address.street')}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      name="address.suite"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.address.suite')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Field
                      name="address.city"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.address.city')}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      name="address.zipcode"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.address.zipcode')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Field
                      name="address.geo.lat"
                      component={CustomField}
                      type="number"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.address.geo.lat')}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      name="address.geo.lng"
                      component={CustomField}
                      type="number"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.address.geo.lng')}
                    />
                  </Col>
                </Row>
                {!isNaN(latitude) && !isNaN(longitude) && <Row>
                  <Col md={12}>

                    <Map
                      geo={{ lat: latitude, lng: longitude }}
                      isMarkerShown
                      onMark={(e) => {
                        props.change('address.geo.lng', `${e.latLng.lng()}`);
                        props.change('address.geo.lat', `${e.latLng.lat()}`);
                      }}
                    />
                  </Col>
                </Row>}
              </Panel.Body>
            </Panel>

          </Col>
        </Row>
        <Row>
          <Col md={8}>

            <Panel>
              <Panel.Heading>{getLiteral('client.company')}</Panel.Heading>
              <Panel.Body className="panel-body">
                <Row>
                  <Col md={6}>
                    <Field
                      name="company.name"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.company.name')}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      name="company.catchPhrase"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.company.catchPhrase')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Field
                      name="company.bs"
                      component={CustomField}
                      type="text"
                      width={5}
                      inputWidth={7}
                      label={getLiteral('client.company.bs')}
                    />
                  </Col>
                </Row>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Button type="submit" disabled={submitting} className="pull-right">{getLiteral(textButton)}</Button>
          </Col>
        </Row>
      </Grid>
    </Form>
  );
};

ClientForm.propTypes = {
  submitAction: PropTypes.func,
  textButton: PropTypes.string,
};

export default ClientForm;
