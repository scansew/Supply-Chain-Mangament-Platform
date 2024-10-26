import { useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/api";
import { listCompanies } from "./graphql/queries";
import {
  createCompany,
  createUser,
  createWorkOrder,
  createWorkOrderCounter,
  incrementCounter,
} from "./graphql/mutations";
import { Card } from "@aws-amplify/ui-react";

function DB({}) {
  const client = generateClient();
  useEffect(() => {
    // generateWorkOrderNumber();
    createNewCompany();
    // fetchCompanies();
    // createNewWOCounter();
    // createNewWorkOrder();
    // fetchWorkOrders();

    createNewUser();
    // fetchUsers();
  }, []);

  const fetchCompanies = async () => {
    try {
      const companyData = await client.graphql({
        query: listCompanies,
      });
      console.log("companies:", companyData.data.listCompanies.items);
      return companyData.data.listCompanies.items;
    } catch (err) {
      console.log("error fetching companies", err);
    }
  };
  async function createNewWOCounter() {
    try {
      const counterDetails = {
        counterName: "workOrderNumber",
        currentValue: 1100,
      };
      const input = {
        input: counterDetails,
        // Add condition if needed
        // condition: { /* ... */ }
      };

      const newCounter = await client.graphql({
        query: createWorkOrderCounter,
        variables: input,
      });
    } catch (error) {
      console.error("Error creating WO Counter:", error);
    }
  }
  async function createNewCompany() {
    try {
      const companyDetails = {
        name: "Acme Inc.",
        address: "123 Main St, Anytown USA",
        stripeConnectId: "acct_123456789",
      };
      const input = {
        input: companyDetails,
        // Add condition if needed
        // condition: { /* ... */ }
      };

      const newCompany = await client.graphql({
        query: createCompany,
        variables: input,
      });
    } catch (error) {
      console.error("Error creating company:", error);
    }
  }
  async function generateWorkOrderNumber() {
    try {
      const result = await client.graphql({
        query: incrementCounter,
        variables: { counterName: "workOrderNumber" },
      });

      const newWorkOrderNumber = result.data.incrementCounter;
      console.log("New work order number:", newWorkOrderNumber);
      return newWorkOrderNumber;
    } catch (error) {
      console.error("Error generating work order number:", error);
      throw error;
    }
  }
  async function createNewWorkOrder() {
    const updWONumber = await generateWorkOrderNumber();
    try {
      const workOrderDetails = {
        type: "Boat",
        status: "PENDING",
        woNumber: updWONumber,
        createdById: "d2c63597-621c-4ee6-9ed3-02dd82a5feda",
        assignedToId: "d2c63597-621c-4ee6-9ed3-02dd82a5feda",
        companyId: "c76be88d-e565-40b5-9ffa-31c686d8fc98",
        process: "true",
        // Add other fields as per your schema
      };

      const input = {
        input: workOrderDetails,
        // Add condition if needed
        // condition: { /* ... */ }
      };

      const newWorkOrder = await client.graphql({
        query: createWorkOrder,
        variables: input,
      });

      console.log("New work order created:", newWorkOrder.data.createWorkOrder);
      return newWorkOrder.data.createWorkOrder;
    } catch (error) {
      console.error("Error creating work order:", error);
      throw error;
    }
  }

  async function createNewUser() {
    try {
      const userDetails = {
        username: "johndoe",
        email: "john.doe@example.com",
        passwordHash: "John",
      };

      const input = {
        input: userDetails,
        // Add condition if needed
        // condition: { /* ... */ }
      };

      const newUser = await client.graphql({
        query: createUser,
        variables: input,
      });

      console.log("New user created:", newUser.data.createUser);
      return newUser.data.createUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  return (
    <>
      <Card>
        {" "}
        {fetchCompanies}
        {createNewCompany}
        {createNewUser}
      </Card>
      Done
    </>
  );
}
export default DB;
