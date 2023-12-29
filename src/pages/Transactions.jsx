import Row from "../ui/Row";
import TransactionsTable from "../features/transactions/TransactionsTable";
import Heading from "../ui/Heading";
import TransactionsTableOperations from "../features/transactions/TransactionsTableOperations";

function Transactions() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transactions</Heading>
        <TransactionsTableOperations></TransactionsTableOperations>
      </Row>
      <Row>
        <TransactionsTable></TransactionsTable>
      </Row>
    </>
  );
}

export default Transactions;
