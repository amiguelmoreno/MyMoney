import styled from "styled-components";
import FilterDrop from "../../ui/FilterDrop";
import SortBy from "../../ui/SortBy";

const StyledFiltersContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  border-radius: 10px;

  select {
    background-color: var(--color-brand-600);
    color: white;
  }
`;

function TransactionsTableOperations() {
  return (
    <StyledFiltersContainer>
      <FilterDrop
        filterField="status"
        options={[
          { value: "all", label: "All Status" },
          { value: "pending", label: "🟠 Pending" },
          { value: "received", label: "✅ Received" },
          { value: "sent", label: "💸 Sent" },
        ]}
      />
      <FilterDrop
        filterField="date"
        options={[
          { value: "all", label: "All Time" },
          { value: "day-1", label: "Last day" },
          { value: "day-7", label: "Last 7 days" },
          { value: "month", label: "This month" },
          { value: "day-30", label: "Last 30 days" },
          { value: "day-90", label: "Last 90 days" },
        ]}
      />
      <FilterDrop
        filterField="category"
        options={[
          { value: "all", label: "All Categories" },
          { value: "groceries", label: "🛒 Groceries" },
          { value: "housing", label: "🏠 Housing" },
          { value: "transportation", label: "🚗 Transportation" },
          { value: "health", label: "🏥 Health" },
          { value: "entertainment", label: "🎬 Entertainment" },
          { value: "education", label: "📚 Education" },
          { value: "clothing", label: "👕 Clothing and Accessories" },
          { value: "travel", label: "✈️ Travel and Vacations" },
          { value: "technology", label: "🔌 Technology" },
          { value: "debt", label: "💳 Debts and Loans" },
          { value: "gifts", label: "🎁 Gifts and Donations" },
        ]}
      ></FilterDrop>
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
    </StyledFiltersContainer>
  );
}

export default TransactionsTableOperations;
