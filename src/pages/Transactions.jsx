import Row from "../ui/Row";
import TransactionsTable from "../features/transactions/TransactionsTable";
import Heading from "../ui/Heading";
import FilterModal from "../features/transactions/FilterModal";
import TransactionsGenerator from "../features/transactions/TransactionsGenerator";

function Transactions() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transactions</Heading>

        <FilterModal></FilterModal>
      </Row>
      <Row>
        <TransactionsTable></TransactionsTable>
        {/*  <TransactionsGenerator></TransactionsGenerator> */}
      </Row>
    </>
  );
}

export default Transactions;
