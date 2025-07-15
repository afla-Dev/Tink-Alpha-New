import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Subjects from "./pages/Subjects";
import Activities from "./pages/Activities";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Certificates from "./pages/Certificates";
import Cart from "./pages/Cart";
import Circuit from "./pages/activity/Circuit";
import Motor from "./pages/activity/Motor";
import Traffic from "./pages/activity/Traffic";
import Robot from "./pages/activity/Robot";
import Reports from "./pages/Reports";
import Inbox from "./pages/Inbox";
import NotFound from "./pages/NotFound";
import AddActivity from "./pages/AddActivity";

const queryClient = new QueryClient();

// ProtectedRoute component to check authentication and role
const ProtectedRoute = ({ children, requireTeacher = false }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const isTeacher = currentUser.role === 'TEACHER';

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (requireTeacher && !isTeacher) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/subjects" element={
              <ProtectedRoute>
                <Subjects />
              </ProtectedRoute>
            } />
            <Route path="/activities" element={
              <ProtectedRoute>
                <Activities />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            } />
            <Route path="/certificates" element={
              <ProtectedRoute>
                <Certificates />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/inbox" element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            } />
            <Route path="/activity/circuit" element={
              <ProtectedRoute>
                <Circuit />
              </ProtectedRoute>
            } />
            <Route path="/activity/motor" element={
              <ProtectedRoute>
                <Motor />
              </ProtectedRoute>
            } />
            <Route path="/activity/traffic" element={
              <ProtectedRoute>
                <Traffic />
              </ProtectedRoute>
            } />
            <Route path="/activity/robot" element={
              <ProtectedRoute>
                <Robot />
              </ProtectedRoute>
            } />
            <Route path="/add-activity" element={
              <ProtectedRoute requireTeacher={true}>
                <AddActivity />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
);

export default App;