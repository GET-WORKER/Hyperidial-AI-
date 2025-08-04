import { Component, useEffect } from "react";
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
  InputGroup,
  FormControl,
  Badge,
} from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchAllTickets,
  fetchClosureAttachmentsById,
  fetchTicketCommunicationById,
  setCustomer,
  setMode,
  setSearch,
  setTicket,
} from "./tickets-slice";
import Pagination from "../../../_lib/_layout/common-components/pagination";
import { fetchcustomerById } from "../../people/customers/customer-slice";
import { FaSearch } from "react-icons/fa";
import moment from "moment";

function ListView() {
  const dispatch = useDispatch();
  const {
    tickets,
    ticket,
    currentPage,
    totalPages,
    isCustomerSelect,
    search,
    loading,
    error,
    mode,
  } = useSelector((state) => state.ticket);

  const handleSelect = (_ticket) => {
    if (!isCustomerSelect) {
      dispatch(setTicket(_ticket));
      dispatch(setMode("view"));
      dispatch(setCustomer({ data: _ticket.customer, state: false }));
      dispatch(fetchTicketCommunicationById(_ticket.id));
      dispatch(fetchClosureAttachmentsById(_ticket?.id));
    }
  };

  useEffect(() => {
    dispatch(fetchAllTickets({ page: currentPage, size: 10, filter: null }));
    console.log(tickets, ticket, "tickets");
  }, [dispatch]);

  const onPageChange = (page) => {
    dispatch(fetchAllTickets({ page, size: 10, filter: null }));
  };
  const handleSearch = () => {
    dispatch(fetchAllTickets({ page: currentPage, size: 10, filter: search }));
  };

  return (
    <>
      <Col
        className="d-flex flex-column  justify-content-between border-end"
        lg={7}
        xl={3}
      >
        <Row className="contact-list align-content-start">
          <SearchBox
            dispatch={dispatch}
            handleSearch={handleSearch}
            search={search}
          />
          <ListGroup className="p-0  border-0 ">
            {tickets?.map((row, i) => (
              <ListGroupItem
                key={i + "key"}
                onClick={() => handleSelect(row)}
                active={row.id === ticket?.id}
                className="border-end-0 border-start-0 rounded-0"
              >
                <Row className="p-1 px-3">
                  <Col xs={12}>
                    <Row className="fw-medium">
                      <Col className="text-start">
                        <small>{row.customer?.farmer_name}</small>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <small variant={"success"}>Ticket ID</small>
                        <Badge className="mx-2 fw-semibold">{row.id}</Badge>
                      </Col>
                      <Col>
                        <small>
                          {moment(row.created_at).format("MMM Do YY")}
                        </small>
                      </Col>
                    </Row>
                    <div className="fs-s d-flex gap-1 fw-light "></div>
                  </Col>
                  <Col></Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Row>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Col>
    </>
  );
}
export default ListView;

function SearchBox({ dispatch, handleSearch, search }) {
  return (
    <>
      <Col className="p-2 border-0 h-max">
        <InputGroup className="p-0">
          <FormControl
            placeholder="Search Conversation . . ."
            className="shadow-none border-0 rounded-0"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <InputGroup.Text
            onClick={handleSearch}
            className="cursor-pointer border-0 btn btn-secondary bg-secondary-subtle text-dark rounded-0 "
          >
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
      </Col>
    </>
  );
}
