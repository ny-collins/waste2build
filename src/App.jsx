import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import About from "./pages/About";
import Auth from "./pages/Auth";
import SellerDashboard from "./pages/SellerDashboard";
import CreateListing from "./pages/CreateListing";
import Rewards from "./pages/Rewards";
import RecyclerPortal from "./pages/RecyclerPortal";
import ListingDetails from "./pages/ListingDetails";
import PickupConfirmation from "./pages/PickupConfirmation";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/listings/:id" element={<ListingDetails />} />

        <Route element={<ProtectedRoute allowedRole="seller" />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/create-listing" element={<CreateListing />} />
          <Route path="/rewards" element={<Rewards />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="recycler" />}>
          <Route path="/recycler/portal" element={<RecyclerPortal />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/pickup/:pickupId" element={<PickupConfirmation />} />
        </Route>
      </Route>
    </Routes>
  );
}
