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

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  grid-column: 1/3;

  .recharts-legend-item-text {
    font-size: 18px !important;
    font-weight: 500;
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
  { name: "Debts", value: 0, emoji: "💳", color: "#CD5C5C" },
  { name: "Gifts", value: 0, emoji: "🎁", color: "#32CD32" },
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
  { name: "Debts", value: 0, emoji: "💳", color: "#CD5C5C" },
  { name: "Gifts", value: 0, emoji: "🎁", color: "#32CD32" },
];

const COLORS = [
  "#5E9A80",
  "#F08080",
  "#FFD700",
  "#00FA9A",
  "#797482",
  "#00BFFF",
  "#FF6347",
  "#20B2AA",
  "#7B68EE",
  "#CD5C5C",
  "#32CD32",
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

  if (isLoading) return <Spinner></Spinner>;

  if (transactions.length === 0) return <Empty resourceName="data"></Empty>;

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
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={dataExpenses}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
              >
                {dataExpenses.map((entry, index) => (
                  <Cell fill={entry.color} key={index} />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                layout="horizontal"
                align="center"
                width="100%"
                height="28%"
                verticalAlign="bottom"
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
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={dataIncomes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
              >
                {dataIncomes.map((entry, index) => (
                  <Cell fill={entry.color} key={index} />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                layout="horizontal"
                verticalAlign="bottom"
                width="100%"
                height="28%"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartBox>
    </ChartsContainer>
  );
}

export default ExpenseIncomeDistribution;
