import { createSelector } from 'reselect';

const selectClientUpdate = (state) => state.clientUpdate;
const selectForm = (state) => state.form;

const getClientUpdate = () => createSelector(
  selectClientUpdate,
  (state) => state.clientUpdate
);

const getClientEditForm = () => createSelector(
  selectForm,
  (state) => state.clientEdit
);


export {
  getClientUpdate,
  getClientEditForm,
};
