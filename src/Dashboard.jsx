import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FaHome, FaClipboardList, FaBuilding, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';
import { NavLink } from 'react-router-dom';
import Home from './Home';
import WorkOrder from './Workorder';
import Companies from './Companies';
import Users from './Users';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Grid, View, Image, Button, Heading, Flex, Text } from '@aws-amplify/ui-react';
import companyLogo from './assets/scansewlogo.png'; 
import '@aws-amplify/ui-react/styles.css';

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
          <View columnSpan={2} backgroundColor="var(--amplify-colors-background-secondary)">
            <Flex padding="1rem" justifyContent="space-between" alignItems="center">
                <View>
                <Image src={companyLogo} alt="Company Logo" width="100%" />
                </View>
              <Button onClick={signOut} variation="link">Sign out</Button>
            </Flex>
          </View>
          
          {/* Sidebar */}
          <View backgroundColor="var(--amplify-colors-background-tertiary)" className="sidebar">
            <View padding="1rem">
                <NavLink to="/" end><FaHome /> Home</NavLink>
            </View>
            <View padding="1rem">
                <NavLink to="/workorder"><FaClipboardList /> WorkOrder</NavLink>
            </View>
            <View padding="1rem">
                <NavLink to="/companies"><FaBuilding /> Companies</NavLink>
            </View>
            <View padding="1rem">
                <NavLink to="/users"><FaUsers /> Users</NavLink>
            </View>
            <View padding="1rem">
                <NavLink to="/signout" onClick={signOut}><FaSignOutAlt /> Sign Out</NavLink>
            </View>
            </View>
          
          {/* Main Content */}
          <View padding="1rem" overflow="auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workorder" element={<WorkOrder />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </View>
  
          {/* Footer */}
          <View columnSpan={2} backgroundColor="var(--amplify-colors-background-secondary)">
            <Flex padding="1rem" justifyContent="center" alignItems="center">
              <Text>&copy; 2024 Scan and Sew. All rights reserved.</Text>
            </Flex>
          </View>
        </Grid>
      </Router>
    );
  }

export default withAuthenticator(Dashboard);
