/* eslint-disable import/prefer-default-export */
/**
* Validate Email Format
*/
export const emailValidator = async (email) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const check = re.test(String(email).toLowerCase());

  if (!check) {
    return { isEmailValid: false };
  }
  return { isEmailValid: check };
};
