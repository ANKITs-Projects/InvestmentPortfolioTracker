import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuth } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import PopUpformater from "./components/PopUpformater";
import { Navbar } from "./components/Navbar";
import { Profile } from "./pages/Profile/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home/Home";
import { AddAsset } from "./components/AddAsset";
import { UpdateAssets } from "./components/UpdateAssets";
import { Atom } from "react-loading-indicators";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { loading } = useAuth();
  if (loading) return <div className="w-full h-screen bg-amber-50 flex items-center justify-center ">
    <Atom color={["#6910df", "#df101e", "#86df10", "#10dfd0"]} size="large"/>
  </div>;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <main className="pt-16 mb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PopUpformater>
                  <Login />
                </PopUpformater>
              }
            />
            <Route
              path="/signup"
              element={
                <PopUpformater>
                  <Signup />
                </PopUpformater>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addassets"
              element={
                <ProtectedRoute>
                  <PopUpformater>
                    <AddAsset />
                  </PopUpformater>
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateAssets"
              element={
                <ProtectedRoute>
                  <PopUpformater>
                    <UpdateAssets />
                  </PopUpformater>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer/>
      </QueryClientProvider>
    </>
  );
}

export default App;
