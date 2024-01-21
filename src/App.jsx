import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Wallets from "./pages/Wallets";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./ui/GlobalStyles";
import Settings from "./pages/Settings";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { TransactionProvider } from "./features/dashboard/DashboardTransactionsContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles></GlobalStyles>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout></AppLayout>}>
              <Route
                index
                element={<Navigate replace to="dashboard" />}
              ></Route>
              <Route
                path="dashboard"
                element={
                  <TransactionProvider>
                    <Dashboard />
                  </TransactionProvider>
                }
              ></Route>
              <Route path="transactions" element={<Transactions />}></Route>
              <Route path="wallets" element={<Wallets />}></Route>
              <Route path="settings" element={<Settings />}></Route>
            </Route>

            {/*  <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 2000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        ></Toaster>
      </QueryClientProvider>
    </>
  );
}

export default App;
