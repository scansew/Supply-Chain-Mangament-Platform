import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
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
import Dashboard from "./Dashboard";
import Companies from "./Companies";
import AllWorkOrders from "./AllWorkOrders";
import Users from "./Users";
import { getUserByUsername } from "./graphql/queries";
// Import your logo
import logo from "./assets/scansewlogo.png";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

function App({ signOut, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [SSuser, setSSUser] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchUser();
      setSSUser(userData);
    };
    loadUser();
  }, []);

  const fetchUser = async () => {
    try {
      // // Get the current authenticated user
      // const { tokens } = await fetchAuthSession();
      // const username = tokens.accessToken.payload.username;
      // console.log("Username:", username);
      // Perform the GraphQL query
      const userData = await client.graphql({
        query: getUserByUsername,
        variables: { username: user.username },
      });

      // console.log("User data1:", userData.data.getUserByUsername);
      // setUser(userData.data.getUserByUsername);
      return userData.data.getUserByUsername;
    } catch (err) {
      console.log("Error fetching user", err);
      return null;
    }
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
            <Text>{user.username}</Text>
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
            <Button onClick={signOut} variation="warning" marginTop="auto">
              <FaSignOutAlt className="sidebar-icon" /> <span>Sign Out</span>
            </Button>
          </Flex>
        </View>

        <View
          className="main-content"
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/workorders"
              element={<AllWorkOrders SSuser={SSuser} />}
            />
            <Route path="/companies" element={<Companies />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </View>

        {/* <View
          columnSpan={{ base: 1, large: 2 }}
          backgroundColor="var(--amplify-colors-background-secondary)"
          padding="1rem"
        >
          <Text textAlign="center">
            &copy; 2023 Scan and Sew. All rights reserved.
          </Text>
        </View> */}
      </Grid>
    </Router>
  );
}

export default withAuthenticator(App);
