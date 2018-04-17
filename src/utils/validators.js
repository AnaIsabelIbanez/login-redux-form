/* eslint-disable no-useless-escape */
const MAX_LENGTH_TEXT_FIELD = 100;
const REGEX_PHONE = /^[0-9-+ ]{0,20}$/;
const REGEX_POSTAL_CODE = /^([0-9a-zA-Z]{1}([0-9a-zA-Z]+|[- ][0-9a-zA-Z]+)){0,}$/;
const REGEX_WEBSITE = /^(((http[s]?):\/\/)?(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/;
const REGEX_UNSECURE_STRING = /[<>]/;
const REGEX_DATE = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/;
// http://emailregex.com/ Email Address Regular Expression That 99.99% Works
const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_INTEGER = /^[0-9]+$/;

export function isEmptyString(value) {
  return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
}

export function isValidEmail(value = '') {
  return REGEX_EMAIL.test(value);
}

export function isNotEmptyString(value) {
  return !(value === undefined || value === null || (typeof value === 'string' && value.trim() === ''));
}

export function isInvalidEmail(value) {
  if (value) {
    return !isValidEmail(value);
  }
  return false;
}

export function isValidPhoneFax(value = '') {
  return REGEX_PHONE.test(value);
}

export function isValidPostalCode(value = '') {
  return REGEX_POSTAL_CODE.test(value);
}

export function isValidWebsite(value = '') {
  return REGEX_WEBSITE.test(value);
}

export const isInvalidString = (value, maxLength = MAX_LENGTH_TEXT_FIELD) => (!value || value.length > maxLength || REGEX_UNSECURE_STRING.test(value));

export const isValidDate = (value) => REGEX_DATE.test(value);

export const isInvalidDate = (value) => !isValidDate(value);

export const isInteger = (value) => REGEX_INTEGER.test(value);

