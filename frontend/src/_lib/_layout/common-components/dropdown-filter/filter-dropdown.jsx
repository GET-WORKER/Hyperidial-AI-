import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children} &#x25bc;
  </Button>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={`${className} custom-dropdown-menu drop-menu-h relative`}
        aria-labelledby={labeledBy}
      >
        <div className="sticky-top px-3 py-1 bg-white">
          <Form.Control
            autoFocus
            className=" "
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>

        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

const FilterDropdown = ({ toggleText, items, handleClick }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {toggleText}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} className="py-0">
        {items.map((item, index) => (
          <Dropdown.Item
            key={index}
            eventKey={item.eventKey}
            active={item.active}
            onClick={() => handleClick(item)}
          >
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterDropdown;
