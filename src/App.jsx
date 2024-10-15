import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { FaHome, FaClipboardList, FaBuilding, FaUsers, FaSignOutAlt, FaBars } from "react-icons/fa";
import { 
  withAuthenticator, 
  Image, 
  Button, 
  Text,
  Grid,
  View,
  Flex
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

// Import your components
import Dashboard from "./Dashboard";
import CreateWorkOrderForm from "./CreateWorkOrderForm";
import Companies from "./Companies";
import AllWorkOrders from "./AllWorkOrders";
import Users from "./Users";

// Import your logo
import logo from './assets/scansewlogo.png';

function App({ signOut, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <Grid
        templateColumns={{ base: "1fr", large: "250px 1fr" }}
        templateRows="auto 1fr auto"
        height="100vh"
      >
        <View columnSpan={{ base: 1, large: 2 }} backgroundColor="var(--amplify-colors-background-secondary)">
          <Flex justifyContent="space-between" alignItems="center" padding="1rem">
            <Image src={logo} alt="Company Logo" width="150px" />
            <Button className="menu-toggle" onClick={toggleSidebar}>
              <FaBars />
            </Button>
          </Flex>
        </View>

        <View
          className={`sidebar ${sidebarOpen ? 'open' : ''}`}
          backgroundColor="var(--amplify-colors-background-primary)"
          padding="1rem"
        >
          <Flex direction="column" height="100%">
            <Text variation="primary" fontWeight="bold" marginBottom="1rem">
              Welcome, {user.username}
            </Text>
            <NavLink to="/" end className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <FaHome className="sidebar-icon" /> <span>Home</span>
            </NavLink>
            <NavLink to="/createworkorder" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <FaClipboardList className="sidebar-icon" /> <span>Create Work Order</span>
            </NavLink>
            <NavLink to="/allworkorders" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <FaClipboardList className="sidebar-icon" /> <span>All Work Orders</span>
            </NavLink>
            <NavLink to="/companies" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <FaBuilding className="sidebar-icon" /> <span>Companies</span>
            </NavLink>
            <NavLink to="/users" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <FaUsers className="sidebar-icon" /> <span>Users</span>
            </NavLink>
            <Button onClick={signOut} marginTop="auto">
              <FaSignOutAlt className="sidebar-icon" /> <span>Sign Out</span>
            </Button>
          </Flex>
        </View>

        <View padding="2rem" backgroundColor="var(--amplify-colors-background-tertiary)">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/createworkorder" element={<CreateWorkOrderForm />} />
            <Route path="/allworkorders" element={<AllWorkOrders />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </View>

        <View columnSpan={{ base: 1, large: 2 }} backgroundColor="var(--amplify-colors-background-secondary)" padding="1rem">
          <Text textAlign="center">&copy; 2023 Your Company Name. All rights reserved.</Text>
        </View>
      </Grid>
    </Router>
  );
}

export default withAuthenticator(App);
