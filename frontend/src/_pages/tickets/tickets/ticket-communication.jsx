import { Col, Form, Tab, Tabs } from "react-bootstrap";
import Conversation from "./conversaion";
import TicketAttachments from "./ticket-closure-attachments";

function TicketCommunication() {
  return (
    <>
      <Form as={Col} className={`text-start border me-2 p-0`}>
        <Tabs
          defaultActiveKey="conversation"
          fill
          id="uncontrolled-tab-example"
        >
          <Tab
            className="rounded-0 border-start-0"
            eventKey="conversation"
            title="Conversation"
          >
            <Conversation />
          </Tab>
          <Tab className="rounded-0" eventKey="profile" title="Attachment">
            <TicketAttachments />
          </Tab>
        </Tabs>
      </Form>
    </>
  );
}
export default TicketCommunication;
