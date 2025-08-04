import { Form, Button, Container, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const submitForm = (data) => {
    setLoading(true);
    // Mock authentication: replace with your own logic or credentials
    setTimeout(() => {
      setLoading(false);
      if (data.email === "admin@example.com" && data.password === "password") {
        setIsAuthenticated(true);
        toast.success("Login successful!");
      } else {
        toast.error("Invalid credentials");
      }
    }, 1000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Adjust the path as needed
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card className="mx-auto" style={{ width: "400px" }}>
        <Card.Body>
          <div className="text-center">
            <Image src="logo.png" className="brandlogo img img-fluid" />
          </div>
          <h4 className="text-center">Operations and Maintenance</h4>
          <Form
            onSubmit={handleSubmit(submitForm)}
            className="mt-3 mx-auto"
            style={{ maxWidth: "400px" }}
          >
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email")}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoComplete="false"
                type="password"
                placeholder="Enter password"
                {...register("password")}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Login {loading && <Spinner animation="border" size="sm" />}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default Login;
