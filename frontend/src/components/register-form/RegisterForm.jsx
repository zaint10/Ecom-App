import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const registerFormValidationSchema = Yup.object({
  first_name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  last_name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  username: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password1: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), null], "Passwords must match")
    .required("Required"),
  phone: Yup.string()
    .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Invalid phone number")
    .required("Required"),
});
const RegisterForm = ({ onSubmit }) => {
  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password1: "",
          password2: "",
          phone: "",
        }}
        validationSchema={registerFormValidationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          const { errors } = await onSubmit(values);
          if (errors) {
            setErrors(errors);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValidating }) => (
          <Form>
            <div>
              <label htmlFor="first_name">First Name</label>
              <Field type="text" name="first_name" />
              <ErrorMessage name="first_name" />
            </div>

            <div>
              <label htmlFor="last_name">Last Name</label>
              <Field type="text" name="last_name" />
              <ErrorMessage name="last_name" />
            </div>

            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field type="text" name="email" />
              <ErrorMessage name="email" />
            </div>

            <div>
              <label htmlFor="password1">Password</label>
              <Field type="text" name="password1" />
              <ErrorMessage name="password1" />
            </div>

            <div>
              <label htmlFor="password2">Confirm Password</label>
              <Field type="text" name="password2" />
              <ErrorMessage name="password2" />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" />
            </div>

            <button type="submit" disabled={!isValidating && isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
