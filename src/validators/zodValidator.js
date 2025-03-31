export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      if (req?.uploadingError) {
        throw new Error(req?.uploadingError);
      }
      schema.parse(req.body);
      return next();
    } catch (error) {
      // also write the logic of deleting the file here if validation fails
      // can  add it like return req from the upload with some key like uploading error and if it is then
      // return error
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: (req?.uploadingError && [req?.uploadingError]) || error.errors,
      });
    }
  };
};
