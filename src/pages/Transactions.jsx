import Row from "../ui/Row";
import TransactionsTable from "../features/transactions/TransactionsTable";
import Heading from "../ui/Heading";
import TransactionsTableOperations from "../features/transactions/TransactionsTableOperations";
import FilterModal from "../features/transactions/FilterModal";

function Transactions() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transactions</Heading>

        <FilterModal></FilterModal>
      </Row>
      <Row>
        <TransactionsTable></TransactionsTable>
      </Row>
    </>
  );
}

export default Transactions;
