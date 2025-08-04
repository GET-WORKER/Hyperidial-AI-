import { Component } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import TopNavbar from "./top-navbar/top-navbar";

class RootLayout extends Component {
  render() {
    return (
      <>
        <TopNavbar />
        <ToastContainer />
        <Outlet />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isSidebarVisible: state.isSidebarVisible,
});

export default connect(mapStateToProps)(RootLayout);
