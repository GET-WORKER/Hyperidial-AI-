import React, { Component, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "./logout-button";
import { toggleMenu } from "./navSlice";
import { connect } from "react-redux";

class TopNavbar extends Component {
  render() {
    const { isExpanded, menuItems, toggleMenu } = this.props;

    return (
      <Navbar
        className="px-2 text-capitalize fs-6 sticky-top"
        expanded={isExpanded}
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand className="fs-6" as={Link} to="/">
          {/* <Image src="public/logo.jpg" className="brandlogo img img-responsive" /> */}
          Hyperidial-AI-
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleMenu} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto d-flex align-items-lg-center gap-4 py-4 py-lg-0">
            {menuItems.map((item, i) => (
              <React.Fragment key={item + i}>
                {!item.subItems && (
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "text-decoration-none border-bottom text-white py-2"
                        : isPending
                        ? "text-decoration-none text-white-50"
                        : "text-decoration-none text-white-50"
                    }
                    to={item.url}
                    onClick={(e) => {
                      if (window.innerWidth < 1024) {
                        e.preventDefault();
                        toggleMenu();
                      }
                    }}
                  >
                    {item.name}
                  </NavLink>
                )}
                {item.subItems && (
                  <NavDropdown
                    key={item + i}
                    title={item.name}
                    className="p-0"
                    id="nav-dropdown-reports"
                    menuVariant="dark"
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <NavDropdown.Item
                        key={item + subIndex}
                        as={NavLink}
                        to={subItem.url}
                        onClick={(e) => {
                          if (window.innerWidth < 1024) {
                            e.preventDefault();
                            toggleMenu();
                          }
                        }}
                      >
                        {subItem.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                )}
              </React.Fragment>
            ))}
          </Nav>
          <Nav className="ms-auto logout-nav">
            <LogoutButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
const mapDispatchToProps = {
  toggleMenu,
};
const mapStateToProps = (state) => ({
  menuItems: state.menu.menuItems,
  isExpanded: state.menu.isExpanded,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar);
