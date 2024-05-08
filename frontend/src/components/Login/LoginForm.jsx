import { TextField, Button, Container, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { parseFormErrors } from "../../utils";

const LoginForm = ({ onSubmit, loginError }) => {
  const [errors, setErrors] = useState({});
  const [nonFieldError, setNonFieldError] = useState("");

  useEffect(() => {
    if (loginError) {
      const fieldErrors = parseFormErrors(loginError);
      setErrors(fieldErrors);
      setNonFieldError(fieldErrors["non_field_errors"] || "");
    }
  }, [loginError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, username, password } = e.target.elements;
    onSubmit({
      email: email.value,
      username: username.value,
      password: password.value,
    });
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <FormHelperText error={!!nonFieldError}>{nonFieldError}</FormHelperText>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};
export default LoginForm;
