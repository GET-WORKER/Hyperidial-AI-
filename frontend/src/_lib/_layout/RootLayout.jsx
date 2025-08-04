import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import TopNavbar from "./top-navbar/top-navbar";

class RootLayout extends Component {
  render() {
    return (
      <>
        <TopNavbar />
        <Container fluid>
          <Row>
            <Col>
              <ToastContainer />
              <Outlet />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isSidebarVisible: state.isSidebarVisible,
});

export default connect(mapStateToProps)(RootLayout);
