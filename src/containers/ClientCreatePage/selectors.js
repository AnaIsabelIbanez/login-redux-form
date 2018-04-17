import { createSelector } from 'reselect';

export const selectClientUpdate = (state) => state.clientCreate;
const selectForm = (state) => state.form;

const getClientCreate = () => createSelector(
  selectClientUpdate,
  (state) => state.clientCreate
);

const getClientCreateForm = () => createSelector(
  selectForm,
  (state) => state.clientCreate
);

export {
  getClientCreate,
  getClientCreateForm,
};
