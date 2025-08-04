import { useEffect } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  DropdownButton,
  DropdownItem,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { TbUserPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidSend } from "react-icons/bi";
import {
  createCommunication,
  fetchTicketCommunicationById,
} from "./tickets-slice";
import moment from "moment";
import { useForm } from "react-hook-form";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

function Conversation() {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const { ticket, communications, currentPage, customer } = useSelector(
    (state) => state.ticket
  );
  const { user } = useSelector((state) => state.auth);

  const handleSend = (data) => {
    dispatch(createCommunication(data));
    setValue("message", "");
  };
  useEffect(() => {
    dispatch(fetchTicketCommunicationById(ticket?.id));
    console.log("ticket", ticket, communications);
    if (ticket) {
      setValue("ticket_id", ticket?.id);
    }
    console.log("user", user);
  }, [dispatch]);
  return (
    <>
      <Col
        className=""
        style={{
          backgroundImage: `url('https://th.bing.com/th/id/OIP.jJiZRRi1db_YyUnpHSBUiwHaK4?w=200&h=293&c=7&r=0&o=5&pid=1.7')`,
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <Row className="py-2 m-0 bg-white shadow-1 align-content-center ">
          <Col>
            <figure></figure>
            <h6>{ticket?.customer?.farmer_name}</h6>
          </Col>
          <Col className="text-end align-content-center">
            <Badge className="mx-2 text-uppercase">
              ticket id : {ticket?.id}
            </Badge>
            <Button className="border mx-2" variant="light">
              <TbUserPlus />
            </Button>
            <DropdownButton
              as={ButtonGroup}
              drop={"down-end"}
              variant="secondary"
              title={"..."}
            >
              <DropdownItem eventKey="1">Archive</DropdownItem>
              <DropdownItem eventKey="2">Export</DropdownItem>
              <DropdownItem eventKey="3">Print</DropdownItem>
            </DropdownButton>
          </Col>
        </Row>
        <Row className="flex-1 m-0 contact-list g-2 px-4 align-content-start">
          {/*  {communications?.map((row) =>
            row.created_by == user?.id ? (
              <>
                <div className="row m-0 align-items-start gap-2 text-capitalize p-2 m-0">
                  <div
                    className=" col d-flex flex-column justify-content-end  p-0"
                    style={{ fontSize: "15px" }}
                  >
                    <div className="col p-0 d-flex justify-content-end">
                      <div className="bg-light p-2 rounded shadow-sm border mw-75 ">
                        {row?.message}
                      </div>
                    </div>
                    <div className="fs-s text-gray text-end py-2">
                      {row?.sender?.name} -{" "}
                      {moment(row?.created_at).format("DD/MM/YYYY hh:mma")}
                    </div>
                  </div>
                </div>
                {row.file_url && (
                  <div className="d-flex justify-content-end">
                    <img src={row?.file_url} className="w-50" height="auto" />
                  </div>
                )}
              </>
            ) : (
              <div className="row m-0 justify-content-start align-items-start gap-2 text-capitalize p-2 m-0">
                <div className=" col p-0 fs-m">
                  <div className="bg-light p-2 rounded shadow-sm border col mw-75 p-0">
                    {row?.message}
                  </div>
                  <div className="fs-s text-gray py-2">
                    {row?.sender?.name} -{" "}
                    {moment(row?.created_at).format("DD/MM/YYYY hh:mma")}
                  </div>
                </div>
              </div>
            )
          )} */}
          {communications?.map((row, i) =>
            row.created_by == user?.id ? (
              <Col
                key={"indexx" + i}
                xs={12}
                className="me-auto justify-content-end text-end"
              >
                <Card>
                  <CardBody className="pt-2 px-2 pb-0">
                    <small className="">
                      <Row className="m-0 p-2 justify-content-end g-2 align-items-center">
                        <Col xs={12}> {row?.message} </Col>
                        <Col>
                          {/* {row?.sender?.name} */}

                          {moment(row?.created_at).format("lll")}
                          <span className="px-2">
                            <IoCheckmarkDoneOutline />
                          </span>
                        </Col>
                      </Row>
                    </small>
                  </CardBody>
                </Card>
              </Col>
            ) : (
              <Col className="ms-auto" xs={12} key={"indexx" + i}>
                <Card>
                  <CardBody className="pt-2 px-2 pb-0">
                    <small className="">
                      <Row className="m-0 p-2 justify-content-start g-2 align-items-center">
                        <Col xs={12}> {row?.message} </Col>
                        <Col>
                          {/* {row?.sender?.name} */}

                          {moment(row?.created_at).format("lll")}
                          <span className="px-2">
                            <IoCheckmarkDoneOutline />
                          </span>
                        </Col>
                      </Row>
                    </small>
                  </CardBody>
                </Card>
              </Col>
            )
          )}
        </Row>
        <Row className="m-0 py-2">
          <InputGroup>
            <FormControl {...register("message")} />
            <Button onClick={handleSubmit(handleSend)}>
              <BiSolidSend />
            </Button>
          </InputGroup>
        </Row>
      </Col>
    </>
  );
}
export default Conversation;
