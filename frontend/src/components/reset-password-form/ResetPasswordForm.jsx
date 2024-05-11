import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResetPasswordForm = ({ onSubmit }) => {
  const initialValues = {
    new_password1: "",
    new_password2: "",
  };

  const validationSchema = Yup.object().shape({
    new_password1: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    new_password2: Yup.string()
      .oneOf([Yup.ref("new_password1"), null], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    const { errors } = await onSubmit(values);
    setErrors(errors);
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Create New Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="new_password1">Password</label>
              <Field type="password" name="new_password1" />
              <ErrorMessage name="new_password1" component="div" />
            </div>
            <div>
              <label htmlFor="new_password2">Confirm Password</label>
              <Field type="password" name="new_password2" />
              <ErrorMessage name="new_password2" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
