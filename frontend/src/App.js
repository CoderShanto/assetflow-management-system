import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ProductsPage from "./pages/admin/ProductsPage";
import AddProductPage from "./pages/admin/AddProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import UsersPage from "./pages/admin/UsersPage";
import RequestsPage from "./pages/admin/RequestsPage";
import IssuesPage from "./pages/admin/IssuesPage";
import RequestProductPage from "./pages/employee/RequestProductPage";
import MyRequestsPage from "./pages/employee/MyRequestsPage";
import ReportIssuePage from "./pages/employee/ReportIssuePage";
import MyIssuesPage from "./pages/employee/MyIssuesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AssignedAssetsPage from "./pages/admin/AssignedAssetsPage";
import AssignAssetPage from "./pages/admin/AssignAssetPage";
import MyAssetsPage from "./pages/employee/MyAssetsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute allowedRole="EMPLOYEE">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddProductPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditProductPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <RequestsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/issues"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <IssuesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assigned-assets"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AssignedAssetsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assign-asset"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AssignAssetPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/request-product"
          element={
            <ProtectedRoute allowedRole="EMPLOYEE">
              <RequestProductPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/requests"
          element={
            <ProtectedRoute allowedRole="EMPLOYEE">
              <MyRequestsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/report-issue"
          element={
            <ProtectedRoute allowedRole="EMPLOYEE">
              <ReportIssuePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/assets"
          element={
            <ProtectedRoute allowedRole="EMPLOYEE">
              <MyAssetsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/issues"
          element={
            <ProtectedRoute allowedRole="EMPLOYEE">
              <MyIssuesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;