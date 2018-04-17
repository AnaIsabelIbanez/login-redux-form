import { reduxForm } from 'redux-form';
import ClientForm from '../ClientForm';

export default reduxForm({
  form: 'clientCreate',
  enableReinitialize: true,
})(ClientForm);
