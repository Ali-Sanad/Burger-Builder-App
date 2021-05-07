export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...oldObject.updatedProperties,
  };
};

export const checkValidity = (value, rule) => {
  let isValid = true;
  if (!rule) {
    return true;
  }

  if (rule.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rule.minLength) {
    isValid = value.length >= rule.minLength && isValid;
  }
  if (rule.maxLength) {
    isValid = value.length <= rule.maxLength && isValid;
  }
  if (rule.isEmail) {
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};
