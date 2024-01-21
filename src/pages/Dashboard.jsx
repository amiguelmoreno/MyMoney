import DashTableOperations from "../features/dashboard/DashTableOperations";
import DashTables from "../features/dashboard/DashTables";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashTableOperations></DashTableOperations>
      </Row>
      <Row>
        <DashTables></DashTables>
      </Row>
    </>
  );
}

export default Dashboard;
