import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";


// auth pages
const SignIn = lazy(() => import("@pages/auth/sign-in"));
const ForgotPassword = lazy(() => import("@pages/auth/forgotten-password"));
const EnterOtp = lazy(() => import("@/pages/auth/enter-otp"));
const ResetPassword = lazy(() => import("@/pages/auth/reset-password"));

// main pages
const Agents = lazy(() => import("@pages/main/agents"));
const Dashboard = lazy(() => import("@pages/main/dashboard"));
const Customers = lazy(() => import("@pages/main/customers"));
const Services = lazy(() => import("@pages/main/services"));
const Transactions = lazy(() => import("@pages/main/transactions"));
const Configurations = lazy(() => import("@pages/main/configurations"));


// extra pages
const CreateCustomer = lazy(() => import("@components/customers-components/create-new-customer"))
const IndividualCustomer = lazy(() => import("@components/customers-components/individual-customer"))


function App() {
  return (
    <Suspense
      fallback={
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Spinner
            color="green.500"
            speed="0.65s"
            thickness="5px"
            size="xl"
            emptyColor="gray.200"
          />
        </Flex>
      }
    >
      <Router>
        <div className="">
          <Routes>
            {/* Routes for auth Pages */}
            <Route path="/" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/enter-otp" element={<EnterOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Routes for main pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/configurations" element={<Configurations />} />

            {/* Routes for extra pages */}
            <Route path="/customers/create-new-customer" element={<CreateCustomer />} />
            <Route path="/customers/:id" element={<IndividualCustomer />} />

          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
