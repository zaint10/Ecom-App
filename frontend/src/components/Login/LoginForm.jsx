import { TextField, Button, Container } from "@mui/material";

const LoginForm = ({ onSubmit }) => {
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
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
