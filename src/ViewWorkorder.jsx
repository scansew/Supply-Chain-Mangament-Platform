import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { getWorkOrder } from "./graphql/queries";
import { updateWorkOrder } from "./graphql/mutations";
import {
  Button,
  TextField,
  TextAreaField,
  Flex,
  View,
  Text,
} from "@aws-amplify/ui-react";
import CreateWorkOrderForm from "./CreateWorkOrderForm";

const ViewEditWorkOrder = ({ workOrderItem, SSuser }) => {
  // const [workOrder, setWorkOrder] = useState(null);
  // const [isEditing, setIsEditing] = useStaeditedWorkOrderte(false);
  const [editedWorkOrder, setEditedWorkOrder] = useState(workOrderItem);
  const client = generateClient();

  // useEffect(() => {
  //   console.log("workOrder:", workOrder);
  //   // fetchWorkOrder();
  // }, [workOrder]);

  const fetchWorkOrder = async () => {
    try {
      const response = await client.graphql({
        query: getWorkOrder,
        variables: { id: workOrderItem.id },
      });
      setEditedWorkOrder(response.data.getWorkOrder);
      console.log("Fetched work order:", response.data);
    } catch (error) {
      console.error("Error fetching work order:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedWorkOrder(workOrderItem);
  };

  const handleSave = async () => {
    try {
      const response = await client.graphql({
        query: updateWorkOrder,
        variables: { input: editedWorkOrder },
      });
      setWorkOrder(response.data.updateWorkOrder);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating work order:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWorkOrder((prev) => ({ ...prev, [name]: value }));
  };

  if (!workOrderItem) {
    return <div>Loading...</div>;
  }

  return (
    <View className="work-order-details">
      <Text as="h2">Work Order Details</Text>
      <Flex direction="column" gap="small">
        <p>
          <strong>Work Order Number:</strong> {editedWorkOrder.woNumber}
        </p>
        <p>
          <strong>Status:</strong> {editedWorkOrder.status}
        </p>
        <p>
          <strong>Type:</strong> {editedWorkOrder.type}
        </p>
        <p>
          <strong>Details:</strong> {editedWorkOrder.details}
        </p>
        <p>
          <strong>Make:</strong> {editedWorkOrder.make}
        </p>
        <p>
          <strong>Model:</strong> {editedWorkOrder.model}
        </p>
        <p>
          <strong>Year:</strong> {editedWorkOrder.year}
        </p>
        <p>
          <strong>Business Name:</strong> {editedWorkOrder.businessName}
        </p>
        <p>
          <strong>Attention Name:</strong> {editedWorkOrder.attnName}
        </p>
        <p>
          <strong>Business Phone:</strong> {editedWorkOrder.businessPhone}
        </p>
        <p>
          <strong>Business Shipping Address:</strong>{" "}
          {editedWorkOrder.businessShippingAddress}
        </p>
        <p>
          <strong>Customer Name:</strong> {editedWorkOrder.customerName}
        </p>
        <p>
          <strong>Customer Drop Shipping Address:</strong>{" "}
          {editedWorkOrder.customerDropShippingAddress}
        </p>
        {/* <Button onClick={handleEdit}>Edit</Button> */}
        <CreateWorkOrderForm
          SSuser={SSuser}
          workOrderItem={workOrderItem}
          button="edit"
          handleViewSuccess={async () => {
            console.log("handleViewSuccess");
            await fetchWorkOrder();
          }}
        />
      </Flex>{" "}
    </View>
  );
};

export default ViewEditWorkOrder;
