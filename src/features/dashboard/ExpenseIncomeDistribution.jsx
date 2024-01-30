import Heading from "../../ui/Heading";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTransactions } from "../transactions/useTransactions";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import ChartBox from "../../ui/ChartBox";
import Empty from "../../ui/Empty";
import { useDashTransactionContext } from "./DashboardTransactionsContext";
import { formatCurrency } from "../../utils/helpers";

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column: 1/3;
  gap: 1rem;

  .recharts-legend-item-text {
    font-size: 18px !important;
    font-weight: 500;
  }

  @media (width <= 1250px) {
    grid-column: 1/4;
  }
`;

const StyledLegend = styled.ul`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  gap: 0.2rem;
  text-align: center;

  @media (width <= 1250px) {
    padding: 3rem;
  }

  @media (width <= 1250px) {
    padding: 0rem;
    font-size: 1.4rem;
  }

  li {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;

    .name {
      text-align: left;
    }

    .percent,
    .quantity {
      text-align: end;
    }
  }
`;

const startDataExpenses = [
  { name: "Groceries", value: 0, emoji: "🛒", color: "#5E9A80" },
  { name: "Housing", value: 0, emoji: "🏠", color: "#F08080" },
  { name: "Transportation", value: 0, emoji: "🚗", color: "#FFD700" },
  { name: "Health", value: 0, emoji: "🏥", color: "#00FA9A" },
  { name: "Entertainment", value: 0, emoji: "🎬", color: "#797482" },
  { name: "Education", value: 0, emoji: "📚", color: "#00BFFF" },
  { name: "Clothing", value: 0, emoji: "👕", color: "#FF6347" },
  { name: "Travels", value: 0, emoji: "✈️", color: "#20B2AA" },
  { name: "Technology", value: 0, emoji: "🔌", color: "#7B68EE" },
  { name: "Debts", value: 0, emoji: "💳", color: "var(--color-red-600)" },
  { name: "Gifts", value: 0, emoji: "🎁", color: "#32CD32" },
  { name: "Gym", value: 0, emoji: "🏋🏻", color: "#a8bcea" },
];

const startDataIncomes = [
  { name: "Groceries", value: 0, emoji: "🛒", color: "#5E9A80" },
  { name: "Housing", value: 0, emoji: "🏠", color: "#F08080" },
  { name: "Transportation", value: 0, emoji: "🚗", color: "#FFD700" },
  { name: "Health", value: 0, emoji: "🏥", color: "#00FA9A" },
  { name: "Entertainment", value: 0, emoji: "🎬", color: "#797482" },
  { name: "Education", value: 0, emoji: "📚", color: "#00BFFF" },
  { name: "Clothing", value: 0, emoji: "👕", color: "#FF6347" },
  { name: "Travels", value: 0, emoji: "✈️", color: "#20B2AA" },
  { name: "Technology", value: 0, emoji: "🔌", color: "#7B68EE" },
  { name: "Debts", value: 0, emoji: "💳", color: "var(--color-red-600)" },
  { name: "Gifts", value: 0, emoji: "🎁", color: "#32CD32" },
  { name: "Gym", value: 0, emoji: "🏋🏻", color: "#a8bcea" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="var(--color-grey-700)"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderLegend = ({ value, payload }) => {
  console.log(payload);

  const sortedPayload = payload
    .slice()
    .sort((a, b) => b.payload.value - a.payload.value);

  return (
    <StyledLegend>
      {sortedPayload.map((entry, index) => {
        console.log(entry.color);

        return (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            <div className="name">{entry.payload.name}</div>
            <div className="quantity">
              ${formatCurrency(entry.payload.value)}
            </div>
            <div className="percent">
              ${(entry.payload.percent * 100).toFixed(1)}%
            </div>
          </li>
        );
      })}
    </StyledLegend>
  );
};

function prepareData(startData, transactions, type) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field, amount) {
    return arr.map((obj) =>
      obj.name.toLowerCase() === field.toLowerCase()
        ? { ...obj, value: obj.value + amount }
        : obj
    );
  }

  const data = transactions.reduce((arr, cur) => {
    const category = cur.category.toLowerCase();

    // Solo incrementar si el tipo es "expense"
    if (cur.type.toLowerCase() === type) {
      if (type === "expense") return incArrayValue(arr, category, -cur.amount);

      if (type === "income") return incArrayValue(arr, category, cur.amount);
    }

    return arr;
  }, startData);

  return data.filter((entry) => entry.value !== 0);
}

function ExpenseIncomeDistribution() {
  const { isLoading } = useTransactions();
  const { transactions } = useDashTransactionContext();
  const alignmentProps =
    window.innerWidth >= 850
      ? { verticalAlign: "middle", align: "right", width: "50%" }
      : { align: "center", verticalAlign: "bottom", width: "90%" };

  if (isLoading) return <Spinner></Spinner>;

  const dataExpenses = prepareData(startDataExpenses, transactions, "expense");
  const dataIncomes = prepareData(startDataIncomes, transactions, "income");

  console.log(dataExpenses);

  return (
    <ChartsContainer>
      <ChartBox type="cheese">
        <Heading as="h2">Expenses Distribution</Heading>
        {dataExpenses.length === 0 ? (
          <Empty resourceName="data"></Empty>
        ) : (
          <ResponsiveContainer width="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={dataExpenses}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
              >
                {dataExpenses.map((entry, index) => (
                  <Cell fill={entry.color} key={index} stroke={entry.color} />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                layout="vertical"
                height="auto"
                content={(props) => renderLegend(props)}
                {...alignmentProps}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartBox>

      <ChartBox type="cheese">
        <Heading as="h2">Incomes Distribution</Heading>
        {dataIncomes.length === 0 ? (
          <Empty resourceName="data"></Empty>
        ) : (
          <ResponsiveContainer width="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={dataIncomes}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
              >
                {dataIncomes.map((entry, index) => (
                  <Cell fill={entry.color} key={index} stroke={entry.color} />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                layout="vertical"
                height="auto"
                content={(props) => renderLegend(props)}
                {...alignmentProps}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartBox>
    </ChartsContainer>
  );
}

export default ExpenseIncomeDistribution;
