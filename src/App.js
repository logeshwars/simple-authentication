import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ReactQueryDevtools } from "react-query/devtools";
import NavBar from "./components/NavBar";
import Protector from "./components/Protector";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./contexts/MainContext";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  });

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Protector Component={Dashboard} />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
