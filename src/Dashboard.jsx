import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaBuilding,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import Home from "./Home";
import CreateWorkOrder from "./CreateWorkOrder";
import Companies from "./Companies";
import AllWorkOrders from "./AllWorkOrders";
import Users from "./Users";
import { withAuthenticator } from "@aws-amplify/ui-react";
import {
  Grid,
  View,
  Image,
  Button,
  Flex,
  Text,
} from "@aws-amplify/ui-react";
import companyLogo from "./assets/scansewlogo.png";
import "@aws-amplify/ui-react/styles.css";

function Dashboard({ signOut }) {
  return (
    <Router>
      <Grid
        templateColumns="250px 1fr"
        templateRows="auto 1fr auto"
        height="100vh"
        width="100vw"
      >
        {/* Header */}
        <View
          columnSpan={2}
          backgroundColor="var(--amplify-colors-background-secondary)"
        >
          <Flex
            padding="1rem"
            justifyContent="space-between"
            alignItems="center"
          >
            <View paddingLeft="2rem">
              {" "}
              {/* Added padding to move logo to the right */}
              <Image
                src={companyLogo}
                alt="Company Logo"
                width="100%"
                objectFit="contain"
              />
            </View>
            <Button onClick={signOut} variation="link">
              Sign out
            </Button>
          </Flex>
        </View>

        {/* Sidebar */}
        <View
          backgroundColor="var(--amplify-colors-white)"
          borderRight="1px solid var(--amplify-colors-neutral-20)"
          padding="1rem"
          className="sidebar"
        >
          <Flex direction="column" gap="1rem">
            <NavLink to="/" end className="sidebar-link">
              <Flex alignItems="center" gap="0.5rem">
                <FaHome className="sidebar-icon" /> <Text>Home</Text>
              </Flex>
            </NavLink>
            <NavLink to="/createworkorder" className="sidebar-link">
              <Flex alignItems="center" gap="0.5rem">
                <FaClipboardList className="sidebar-icon" />{" "}
                <Text>Create Work Order</Text>
              </Flex>
            </NavLink>
            <NavLink to="/allworkorders" className="sidebar-link">
              <Flex alignItems="center" gap="0.5rem">
                <FaClipboardList className="sidebar-icon" />{" "}
                <Text>All Work Orders</Text>
              </Flex>
            </NavLink>
            <NavLink to="/companies" className="sidebar-link">
              <Flex alignItems="center" gap="0.5rem">
                <FaBuilding className="sidebar-icon" /> <Text>Companies</Text>
              </Flex>
            </NavLink>
            <NavLink to="/users" className="sidebar-link">
              <Flex alignItems="center" gap="0.5rem">
                <FaUsers className="sidebar-icon" /> <Text>Users</Text>
              </Flex>
            </NavLink>
          </Flex>
        </View>

        {/* Main Content */}
        <View padding="1rem" overflow="auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createworkorder" element={<CreateWorkOrder />} />
            <Route path="/allworkorders" element={<AllWorkOrders />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </View>

        {/* Footer */}
        <View
          columnSpan={2}
          backgroundColor="var(--amplify-colors-background-secondary)"
        >
          <Flex padding="1rem" justifyContent="center" alignItems="center">
            <Text>&copy; 2024 Scan and Sew. All rights reserved.</Text>
          </Flex>
        </View>
      </Grid>
    </Router>
  );
}

export default withAuthenticator(Dashboard);
