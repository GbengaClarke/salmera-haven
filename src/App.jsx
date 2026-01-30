import "./App.css";
import { DarkModeProvider } from "./context/DarkModeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import AppLayout from "./ui/AppLayout";
import Rooms from "./pages/Rooms";
import Users from "./pages/Users";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import BookingDetails from "./features/bookings/BookingDetails";
import Checkin from "./features/bookings/Checkin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-100)",
              color: "var(--color-grey-600)",
            },
          }}
        >
          {/* {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== "loading" && (
                    <CancelButton
                      padding={".3rem"}
                      onClick={() => toast.dismiss(t.id)}
                    >
                      <IoMdClose color="var(--color-red-700)" />
                    </CancelButton>
                  )}
                </>
              )}
            </ToastBar>
          )} */}
        </Toaster>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:id" element={<BookingDetails />}>
                <Route path="checkin" element={<Checkin />} />
              </Route>
              {/* <Route path="/bookings/:id" element={<BookingDetails />} />
              <Route
                path="/bookings/:id/checkin"
                element={<BookingDetails />}
              /> */}
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/users" element={<Users />} />
              <Route path="/Settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
