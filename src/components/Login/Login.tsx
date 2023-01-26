import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// @ts-ignore
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function LogIn() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await login(formData);
      navigate("/movements");
    } catch (error) {
      toast.error("El usuario o la contraseña son incorrectos", {
        position: "top-right",
        theme: "light",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Finnerio Test App Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={formData.username}
              onChange={(e) => {
                e.preventDefault();
                setFormData({ ...formData, username: e.target.value });
              }}
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              value={formData.password}
              onChange={(e) => {
                e.preventDefault();
                setFormData({ ...formData, password: e.target.value });
              }}
              required
              fullWidth
              name="password"
              label="Contraseña"
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
              Entrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
