import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import {
  setMode,
  setCenter,
  create,
  update,
  remove,
  fetchAll,
  addDistrict,
  fetchDistricts,
  setDistrict,
  updateDistrict,
} from "./service-center-slice";
import { showDialog } from "../../../_lib/_layout/common-components/confirmation-dialog/confirmation-slice";
import FilterDropdown from "../../../_lib/_layout/common-components/dropdown-filter/filter-dropdown";

function EditForm() {
  const dispatch = useDispatch();
  const { register, unregister, handleSubmit, setValue } = useForm();
  const {
    service_center,
    districts,
    currentPage,
    is_add_district,
    mode,
    loading,
    error,
  } = useSelector((state) => state.service);

  const handleSave = (data) => {
    const { name, org_type, org_code, email, address, district } = data;
    const serviceData = { name, org_type, org_code, email, address };
    if (mode === "edit" && service_center?.id) {
      dispatch(
        showDialog({
          title: "service center",
          message: "Update",
          onConfirm: () => {
            dispatch(update(serviceData)).then(() => {
              dispatch(fetchAll({ page: currentPage, size: 10, filter: null }));
              dispatch(setMode(null));
              dispatch(setCenter(service_center));
            });
          },
          onCancel: () => {},
        })
      );
    }
    if (mode === "create") {
      dispatch(
        showDialog({
          title: "service center",
          message: "Create",
          onConfirm: () => {
            dispatch(create(serviceData)).then(() => {
              dispatch(fetchAll({ page: currentPage, size: 10, filter: null }));
              dispatch(setMode(null));
            });
          },
          onCancel: () => {},
        })
      );
    }
    console.log(data);
  };
  const handleCancel = () => {
    dispatch(setMode(null));
    dispatch(setCenter(null));
  };

  const handleDelete = (id) => {
    dispatch(
      showDialog({
        title: "service center",
        message: "Delete",
        onConfirm: () => {
          dispatch(remove(id));
          dispatch(setMode(null));
        },
        onCancel: () => {},
      })
    );
  };
  const handleAddDistricts = () => {
    dispatch(addDistrict(true));
  };
  const handleDistrictListClick = (data) => {
    dispatch(setDistrict(data));
    if (data) {
      const service_districts = {
        ...data,
        service_center_id: service_center?.id,
      };
      dispatch(updateDistrict(service_districts)).then(() => {
        dispatch(fetchDistricts());
      });
    }
  };
  useEffect(() => {
    if (service_center) {
      setValue("name", service_center.id);
      setValue("name", service_center.org_name);
      setValue("email", service_center.email);
      setValue("org_type", service_center.org_type);
      setValue("org_code", service_center.org_code);
      setValue("address", service_center.address);
    }
    dispatch(fetchDistricts());
  }, [service_center, setValue]);

  return (
    <>
      <Form
        as={Col}
        className={`text-start ${mode !== null ? "d-block fs-6" : "d-none"} `}
        lg={5}
        xl={4}
      >
        <Row className="d-flex justify-content-center  align-items-center py-1">
          <Col className=" fw-medium">
            {mode === "edit"
              ? "Edit Form"
              : mode === "create"
              ? "New Form"
              : "View"}
          </Col>
          <Col className="text-end pe-4">
            {mode === "view" && (
              <Button
                variant="light"
                className="border"
                onClick={handleCancel}
                size="sm"
              >
                <MdClose className="fs-4" />
              </Button>
            )}
          </Col>
        </Row>
        <Form.Group as={Row} className="my-3">
          <Col xs={12}>
            <Form.Label>org_name:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              name="name"
              {...register("name")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col xs={12}>
            <Form.Label>email:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              name="email"
              {...register("email")}
              readOnly={mode === "view"}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-3">
          <Col md={6}>
            <Form.Label>org_type:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              name="org_type"
              {...register("org_type")}
              readOnly={mode === "view"}
            />
          </Col>
          <Col md={6}>
            <Form.Label>org_code:</Form.Label>
            <Form.Control
              disable={mode === "view"}
              className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
              name="org_code"
              {...register("org_code")}
              readOnly={mode === "view"}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            disable={mode === "view"}
            className={`rounded-0 ${mode === "view" && "shadow-none border"}`}
            name="address"
            readOnly={mode === "view"}
            {...register("address")}
            as="textarea"
          />
        </Form.Group>
        {mode !== "create" && (
          <Form.Group className="mb-3">
            <Form.Label>Districts:</Form.Label>
            <ListGroup className="drop-menu-h border mb-2" variant="flush">
              {districts
                .filter((r) => r.service_center_id === service_center?.id)
                .map((item, i) => (
                  <ListGroupItem>{item.name}</ListGroupItem>
                ))}
            </ListGroup>
            {mode === "edit" && (
              <FilterDropdown
                toggleText="select districts"
                items={districts}
                handleClick={handleDistrictListClick}
              />
            )}
          </Form.Group>
        )}

        <ButtonGroup>
          {mode === "edit" || mode === "create" ? (
            <>
              <Button
                variant="success"
                type="submit"
                onClick={handleSubmit(handleSave)}
              >
                Save
              </Button>
              <Button
                className={`${mode === "create" ? "d-none" : "d-block"}`}
                variant="info"
                onClick={() => handleDelete("delete")}
              >
                Delete
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              {mode === "view" && (
                <Button
                  variant="secondary"
                  onClick={() => dispatch(setMode("edit"))}
                >
                  Edit
                </Button>
              )}
            </>
          )}
        </ButtonGroup>
      </Form>
    </>
  );
}

export default EditForm;
