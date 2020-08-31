import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./pages/common/SignIn";
import SignUp from "./pages/common/SignUp";
import Otp from "./pages/common/Otp";
import ForgotPassword from "./pages/common/ForgotPassword";

// admin
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Categories from "./pages/admin/Categories";
import SubCategories from "./pages/admin/SubCategories";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Services from "./pages/admin/Services"

// vendor
import VendorRoute from "./routes/VendorRoute"
import VendorDashboard from "./pages/vendor/VendorDashboard"
import VendorProducts from "./pages/vendor/VendorProducts"
import VendorServices from "./pages/vendor/VendorServices"
import VendorInvoices from "./pages/vendor/VendorInvoices"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/forgot_password" exact component={ForgotPassword} />
        <Route path="/otp" exact component={Otp} />
        {/* admin */}
        <AdminRoute path="/admindash" exact component={AdminDashboard} />
        <AdminRoute path="/admindash/categories" exact component={Categories} />
        <AdminRoute path="/admindash/users" exact component={Users} />
        <AdminRoute path="/admindash/products" exact component={Products} />
        <AdminRoute path="/admindash/services" component={Services} />
        <AdminRoute path="/admindash/categories/:categoryId/subcategories" exact component={SubCategories} />
        {/* vemdor */}
        <VendorRoute path="/vendordash" exact component={VendorDashboard} />
        <VendorRoute path="/vendordash/vendor_products" exact component={VendorProducts} />
        <VendorRoute path="/vendordash/vendor_services" exact component={VendorServices} />
        <VendorRoute path="/vendordash/vendor_invoices" exact component={VendorInvoices} />
      </Switch>
    </Router>
  );
}

export default App;
