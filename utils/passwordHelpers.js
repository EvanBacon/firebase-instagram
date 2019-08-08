/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
export const passwordValidator = (password) => {
  const numbers = password.match(/\d+/g);
  const uppers = password.match(/[A-Z]/);
  const lowers = password.match(/[a-z]/);
  const special = password.match(/[!@#$%\^&*\+]/);
  const length = password.match(/^.{8,}$/);

  let allErrors = {
    isPassValid: true,
    signupError: [],
  };

  if (numbers === null) {
    allErrors = {
      ...allErrors,
      isPassValid: false,
      signupError: [...allErrors.signupError, 'error_no_number'],
    };
  }

  if (uppers === null) {
    allErrors = {
      ...allErrors,
      isPassValid: false,
      signupError: [...allErrors.signupError, 'error_one_upper'],
    };
  }

  if (lowers === null) {
    allErrors = {
      ...allErrors,
      isPassValid: false,
      signupError: [...allErrors.signupError, 'error_one_lower'],
    };
  }

  if (special === null) {
    allErrors = {
      ...allErrors,
      isPassValid: false,
      signupError: [...allErrors.signupError, 'error_one_special'],
    };
  }

  if (length === null) {
    allErrors = {
      ...allErrors,
      isPassValid: false,
      signupError: [...allErrors.signupError, 'error_eight_chars'],
    };
  }

  return allErrors;
};

/**
 * Score Password Strength
 */
export const scorePassword = (password) => {
  let score = 0;
  if (!password) {
    return { passwordScore: score };
  }

  // award every unique letter until 5 repetitions
  const letters = {};
  for (let i = 0; i < password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1;
    score += 5.0 / letters[password[i]];
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    nonWords: /\W/.test(password),
  };

  let variationCount = 0;
  for (const check in variations) {
    variationCount += (variations[check] === true) ? 1 : 0;
  }
  score += (variationCount - 1) * 10;
  return {
    passwordScore: parseInt(score, 10),
  };

  // const numbers = password.match(/\d+/g);
  // const uppers  = password.match(/[A-Z]/);
  // const lowers  = password.match(/[a-z]/);
  // const special = password.match(/[!@#$%\^&*\+]/);
  // const length  = password.match(/^.{8,}$/);

  // const checkForNull = [ numbers, uppers, lowers, special, length ];
  // let updateState = [];
  // checkForNull.forEach( val => {
  //     if ( null !== val ) {
  //         updateState = [...updateState, val];
  //     }
  // });
};
