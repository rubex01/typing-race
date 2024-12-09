

export const mapApiValidationErrors = (errors) => {

  const result = {};

  errors.forEach((error) => {
    error.path.forEach((path) => {

        if (!result[path]) {
          result[path] = [];
        }

        result[path].push(error.message);
    });
  })

  return result;

}
