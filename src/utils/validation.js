const checkvalidity = (value = '', rules) => {
  let valid = true;
  // This is to prevent multiple if's statements to alter an already resolved rule

  if (rules.required) {
    valid = value.trim() !== '' && valid;
  }

  if (rules.minLength) {
    valid = value.length >= rules.minLength && valid;
  }

  if (rules.maxLength) {
    valid = value.length <= rules.maxLength && valid;
  }

  return valid;
}

export default checkvalidity;