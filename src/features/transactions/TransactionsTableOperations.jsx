import styled from "styled-components";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function TransactionsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "🟠 Pending" },
          { value: "received", label: "✅ Received" },
          { value: "sended", label: "💸 Sent" },
        ]}
      />

      <Filter
        filterField="date"
        options={[
          { value: "all", label: "All" },
          { value: "day-1", label: "Last day" },
          { value: "day-7", label: "Last 7 days" },
          { value: "month", label: "This month" },
          { value: "day-30", label: "Last 30 days" },
          { value: "day-90", label: "Last 90 days" },
        ]}
      />

      <SortBy
        options={[
          { value: "concept-asc", label: "Sort by concept name (A-Z)" },
          { value: "concept-desc", label: "Sort by  concept name(Z-A)" },
          { value: "amount-asc", label: "Sort by amount (low first)" },
          { value: "amount-desc", label: "Sort by amount (high first)" },
          { value: "date-asc", label: "Sort by date (oldest first)" },
          { value: "date-desc", label: "Sort by date (newest first)" },
        ]}
      />
    </TableOperations>
  );
}

export default TransactionsTableOperations;
