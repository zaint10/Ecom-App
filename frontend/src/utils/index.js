export const parseFormErrors = (error) => {
  if (error && error.response && error.response.data) {
    const errorData = error.response.data;
    const fieldErrors = {};
    // Iterate over each field in the error data
    for (const fieldName in errorData) {
      // Extract the error message for the field
      const errorMessage = errorData[fieldName][0]; // Assuming only one error per field
      // Associate the error message with the field name
      fieldErrors[fieldName] = errorMessage;
    }
    return fieldErrors;
  }
  return {};
};
