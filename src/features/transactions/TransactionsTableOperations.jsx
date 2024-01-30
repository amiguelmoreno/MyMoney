import styled from "styled-components";
import FilterDrop from "../../ui/FilterDrop";
import SortBy from "../../ui/SortBy";
import { useWallets } from "../wallets/useWallets";
import { is } from "date-fns/locale";

const StyledFiltersContainer = styled.div`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  flex-direction: column;
  gap: 0.6rem;
  border-radius: 10px;
  position: absolute;
  right: 0;
  top: 5rem;
  background-color: var(--color-grey-600);
  padding: 2rem;
  z-index: 10;
  width: 28rem;

  select {
    width: 100%;
  }
`;

function TransactionsTableOperations({ isVisible }) {
  const { isLoading, wallets } = useWallets();

  console.log(isVisible);

  return (
    <StyledFiltersContainer isVisible={isVisible}>
      <FilterDrop
        filterField="type"
        options={[
          { value: "all", label: "All types" },
          { value: "income", label: "💰 Income " },
          { value: "expense", label: "💸 Expense" },
        ]}
      />

      {!isLoading && (
        <FilterDrop
          filterField="account"
          options={[
            { value: "all", label: "All wallets" },
            ...wallets.map((wallet) => ({
              value: wallet.name.toLowerCase(),
              label: wallet.name.toUpperCase(),
            })),
          ]}
        />
      )}

      <FilterDrop
        filterField="status"
        options={[
          { value: "all", label: "All Status" },
          { value: "pending", label: "🟠 Pending" },
          { value: "completed", label: "✅ Completed" },
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
          { value: "gym", label: "🏋🏻 Gym" },
          { value: "education", label: "📚 Education" },
          { value: "clothing", label: "👕 Clothes" },
          { value: "travels", label: "✈️ Travels" },
          { value: "technology", label: "🔌 Technology" },
          { value: "debts", label: "💳 Debts" },
          { value: "gifts", label: "🎁 Gifts" },
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
