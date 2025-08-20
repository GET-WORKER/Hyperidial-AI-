import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate, NavLink } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { login } from "./authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e")`, // 🌌 Replace with AI-style bg
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay for darkening effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 0,
        }}
      ></div>

      <Container className="position-relative z-1">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <div className="p-4 border rounded-3 shadow-lg bg-white bg-opacity-90">
              <h3 className="text-center mb-4 fw-bold">Login</h3>

              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    isInvalid={!!errors.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    isInvalid={!!errors.password}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to="/registerform" className="text-decoration-none">
                    New User?
                  </NavLink>
                  <Button variant="danger" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
