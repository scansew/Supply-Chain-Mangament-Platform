/**
 * Main Application Component
 * This is the root component of the ScanSew application that handles routing and authentication.
 * It provides role-based access control and navigation functionality.
 */

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaBuilding,
  FaUsers,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import {
  withAuthenticator,
  Image,
  Button,
  Text,
  Grid,
  View,
  Flex,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

// Import your components
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import AllWorkOrders from "./pages/AllWorkOrders";
import Users from "./pages/Users";
import { getUserByUsername } from "./graphql/queries";
import logo from "./assets/scansewlogo.png";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

/**
 * App Component
 * @param {Object} props - Component props
 * @param {Function} props.signOut - Function to handle user sign out
 * @param {Object} props.user - Current authenticated user object
 */
function App({ signOut, user }) {
  // State to control sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State to store the current user's details from the database
  const [SSuser, setSSUser] = useState("");

  /**
   * Toggles the sidebar open/closed state
   */
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Load user data on component mount
  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchUser();
      setSSUser(userData);
      // console.log("SSuser", userData);
    };
    loadUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await client.graphql({
        query: getUserByUsername,
        variables: { username: user.username },
      });
      return userData.data.getUserByUsername;
    } catch (err) {
      console.log("Error fetching user", err);
      return null;
    }
  };

  /**
   * Protected Route Component
   * Handles role-based access control for routes
   * @param {Object} props - Component props
   * @param {React.ReactNode} props.children - Child components to render
   * @param {Array<string>} props.allowedRoles - List of roles allowed to access the route
   */
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!allowedRoles.includes(SSuser.role)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  /**
   * Renders navigation links based on user role
   * Different roles see different navigation options:
   * - new: only Home
   * - emp: Home and Work Orders
   * - cAdmin: Home, Work Orders, and Users
   * - sAdmin: all routes including Companies
   */
  const renderNavLinks = () => {
    // All users see Home
    if (SSuser.role === "new") {
      return (
        <>
          <NavLink
            to="/"
            end
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome className="sidebar-icon" /> <span>Home</span>
          </NavLink>
        </>
      );
    }

    // emp sees Home and Work Orders
    if (SSuser.role === "emp") {
      return (
        <>
          <NavLink
            to="/"
            end
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome className="sidebar-icon" /> <span>Home</span>
          </NavLink>
          <NavLink
            to="/workorders"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FaClipboardList className="sidebar-icon" />{" "}
            <span>Work Orders</span>
          </NavLink>
        </>
      );
    }

    // cAdmin sees Home, Work Orders, and Users
    if (SSuser.role === "cAdmin") {
      return (
        <>
          <NavLink
            to="/"
            end
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome className="sidebar-icon" /> <span>Home</span>
          </NavLink>
          <NavLink
            to="/workorders"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FaClipboardList className="sidebar-icon" />{" "}
            <span>Work Orders</span>
          </NavLink>
          <NavLink
            to="/users"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FaUsers className="sidebar-icon" /> <span>Users</span>
          </NavLink>
        </>
      );
    }

    // sAdmin sees all routes
    if (SSuser.role === "sAdmin") {
      return (
        <>
          <NavLink
            to="/"
            end
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome className="sidebar-icon" /> <span>Home</span>
          </NavLink>
          <NavLink
            to="/workorders"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FaClipboardList className="sidebar-icon" />{" "}
            <span>Work Orders</span>
          </NavLink>
          <NavLink
            to="/companies"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FaBuilding className="sidebar-icon" /> <span>Companies</span>
          </NavLink>
          <NavLink
            to="/users"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <FaUsers className="sidebar-icon" /> <span>Users</span>
          </NavLink>
        </>
      );
    }
  };

  /**
   * Opens feedback form in a new tab
   */
  const handleFeedbackClick = () => {
    // // Replace this with your Google Sheets URL
    const sheetUrl = "https://forms.gle/vjKUhjNECHL6JTmdA";
    window.open(sheetUrl, "_blank");

    // <iframe
    //   src="https://docs.google.com/forms/d/e/1FAIpQLSfm2U6ifaGXVGTuKEpxwMA7ga0QfnZmTK3Yg5Ld3BsIxBnK9Q/viewform?embedded=true"
    //   width="640"
    //   height="1277"
    //   frameborder="0"
    //   marginheight="0"
    //   marginwidth="0"
    // >
    //   Loading…
    // </iframe>;
  };

  return (
    <Router>
      <Grid
        templateColumns={{ base: "1fr", large: "250px 1fr" }}
        templateRows="auto 1fr auto"
        height="100vh"
      >
        <View
          columnSpan={{ base: 1, large: 2 }}
          backgroundColor="var(--amplify-colors-background-secondary)"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            padding="1rem"
            height="60px"
          >
            {/* <Text>{user.username}</Text> */}
            <Button className="menu-toggle" onClick={toggleSidebar}>
              <FaBars />
            </Button>
          </Flex>
        </View>

        <View
          className={`sidebar ${sidebarOpen ? "open" : ""}`}
          backgroundColor="var(--amplify-colors-background-primary)"
          padding="1rem"
        >
          <Flex direction="column" height="100%">
            <Image
              src={logo}
              alt="Company Logo"
              height={"75px"}
              width={"100px"}
            />

            <Text variation="primary" fontWeight="bold" marginBottom="1rem">
              Welcome, {SSuser.given_name}
            </Text>

            {renderNavLinks()}
            <Button onClick={handleFeedbackClick} variation="link">
              Submit Feedback
            </Button>
            <Button onClick={signOut} variation="warning" marginTop="auto">
              <FaSignOutAlt className="sidebar-icon" /> <span>Sign Out</span>
            </Button>
          </Flex>
        </View>

        <View className="main-content">
          <Routes>
            {/* Home is accessible to all */}
            <Route path="/" element={<Dashboard SSuser={SSuser} />} />

            {/* Work Orders accessible to emp, cAdmin, and sAdmin */}
            <Route
              path="/workorders"
              element={
                <ProtectedRoute allowedRoles={["emp", "cAdmin", "sAdmin"]}>
                  <AllWorkOrders SSuser={SSuser} />
                </ProtectedRoute>
              }
            />

            {/* Companies accessible to sAdmin only */}
            <Route
              path="/companies"
              element={
                <ProtectedRoute allowedRoles={["sAdmin"]}>
                  <Companies SSuser={SSuser} />
                </ProtectedRoute>
              }
            />

            {/* Users accessible to cAdmin and sAdmin */}
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["cAdmin", "sAdmin"]}>
                  <Users SSuser={SSuser} />
                </ProtectedRoute>
              }
            />

            {/* Catch all route for non-matching paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </View>
      </Grid>
    </Router>
  );
}

export default withAuthenticator(App);
