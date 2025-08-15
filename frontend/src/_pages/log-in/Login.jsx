import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "./authSlice";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onsubmit = (data) => {
    console.log(data, "data");
    dispatch(login(data));
  };
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <Container className="w-25  log-screen mx-auto mt-10">
      <h3 className="text-center  mt-5">Login Page</h3>
      <Form xs={12} onSubmit={handleSubmit(onsubmit)}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            className="shadow-none"
            {...register("email")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className="shadow-none"
            {...register("password")}
          />
        </Form.Group>
        <Col className="py-4   justify-content-between d-flex  m-0">
          {/*  <p className="px-4  text-primary">New User?</p> */}
          <NavLink className="no-underline" to={"/registerform"}>
            New User?
          </NavLink>
          <Button className="btn btn-danger w-25" type="submit">
            Login
          </Button>
        </Col>
      </Form>
    </Container>
  );
}
export default Login;
