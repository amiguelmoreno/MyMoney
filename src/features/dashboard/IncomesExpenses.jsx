import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../../utils/helpers";
import { useTransactions } from "../transactions/useTransactions";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useDashTransactionContext } from "./DashboardTransactionsContext";
import styled from "styled-components";

const PieDescription = styled.div`
  position: absolute;
  color: inherit;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 500;
  white-space: nowrap;
`;

const startData = [
  {
    type: "income",
    value: 0,
    color: "var(--color-brand-600)",
  },
  {
    type: "expense",
    value: 0,
    color: "var(--color-red-600)",
  },
];

function prepareData(startData, transactions) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field, amount) {
    return arr.map((obj) =>
      obj.type === field ? { ...obj, value: obj.value + amount } : obj
    );
  }

  const data = transactions.reduce((arr, cur) => {
    const type = cur.type;
    if (type === "income") return incArrayValue(arr, "income", cur.amount);
    if (type === "expense") return incArrayValue(arr, "expense", cur.amount);

    return arr;
  }, startData);

  return data;
}

function IncomesExpenses() {
  const { isLoading } = useTransactions();
  const { transactions } = useDashTransactionContext();

  if (isLoading) return <Spinner></Spinner>;

  if (transactions.length === 0) return <Empty resourceName="data"></Empty>;

  const data = prepareData(startData, transactions);

  return (
    <>
      <ResponsiveContainer
        width="100%"
        height="100%"
        style={{ position: "relative" }}
      >
        <PieDescription>
          <p>Income / Expenses</p>
        </PieDescription>
        <PieChart>
          <Pie
            data={data}
            nameKey="type"
            dataKey="value"
            innerRadius={90}
            outerRadius={120}
            cx="50%"
            cy="50%"
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.type} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [
              `${formatCurrency(value)}`,
              `${name.charAt(0).toUpperCase() + name.slice(1)}`,
            ]}
          />
          {/* <Legend
            verticalAlign="bottom"
            layout="vertical"
            width="80%"
            iconSize={20}
            iconType="circle"
            formatter={(value, entry) =>
              `${
                value === "income" ? "Incomes" : "Expenses"
              } - ${formatCurrency(entry.payload.value)}`
            }
          /> */}
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default IncomesExpenses;
