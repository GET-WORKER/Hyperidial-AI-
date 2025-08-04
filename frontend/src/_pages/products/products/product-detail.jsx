import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { setMode, setProduct, create, update, remove } from "./products-slice";
import FormHeader from "../../../_lib/_layout/common-components/form-header";

function EditForm() {
  const dispatch = useDispatch();
  const { product, mode, loading, error } = useSelector(
    (state) => state.product
  );

  const handleCancel = () => {
    dispatch(setMode(null));
  };
  const Labels = {
    id: "Product ID",
    model: "Product Model",
    make: "Product Make",
    category: "Product Category",
  };
  return (
    <>
      <Col
        as={Col}
        className={`text-start ${mode !== null ? "d-block fs-6" : "d-none"} `}
        lg={5}
        xl={4}
      >
        <FormHeader handleCancel={handleCancel} formTitle={""} />
        <Card>
          <CardBody>
            <Row className="row-cols-2 g-2">
              {product &&
                Object.keys(Labels).map((key) => (
                  <React.Fragment key={key}>
                    <Col>{Labels[key]}</Col>
                    <Col>{product[key]}</Col>
                  </React.Fragment>
                ))}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default EditForm;
