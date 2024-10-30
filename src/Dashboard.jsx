import React from 'react';
import { Card, Heading, Text, Flex } from '@aws-amplify/ui-react';

function Dashboard() {
  return (
    <div className="dash-content">
      <Heading level={2}>Welcome to Your Dashboard,</Heading>
      
      <Flex direction="row" wrap="wrap" gap="1rem">
        <Card variation="elevated">
          <Heading level={3}>Work Orders</Heading>
          <Text>Total: 25</Text>
          <Text>Pending: 10</Text>
          <Text>Completed: 15</Text>
        </Card>

        <Card variation="elevated">
          <Heading level={3}>Companies</Heading>
          <Text>Total: 5</Text>
          <Text>Active: 4</Text>
        </Card>

        <Card variation="elevated">
          <Heading level={3}>Users</Heading>
          <Text>Total: 20</Text>
          <Text>Active: 18</Text>
        </Card>

        <Card variation="elevated">
          <Heading level={3}>Recent Activity</Heading>
          <Text>New work order created - 2 hours ago</Text>
          <Text>Work order #1234 completed - 1 day ago</Text>
          <Text>New user added - 2 days ago</Text>
        </Card>
      </Flex>
    </div>
  );
}

export default Dashboard;
