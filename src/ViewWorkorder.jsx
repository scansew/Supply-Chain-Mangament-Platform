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

const ViewEditWorkOrder = ({ workOrderId }) => {
  const [workOrder, setWorkOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorkOrder, setEditedWorkOrder] = useState(null);
  const client = generateClient();

  useEffect(() => {
    console.log("workOrderId:", workOrderId);
    fetchWorkOrder();
  }, [workOrderId]);

  const fetchWorkOrder = async () => {
    try {
      const response = await client.graphql({
        query: getWorkOrder,
        variables: { id: workOrderId },
      });
      setWorkOrder(response.data.getWorkOrder);
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
    setEditedWorkOrder(workOrder);
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

  if (!workOrder) {
    return <div>Loading...</div>;
  }

  return (
    <View className="work-order-details">
      <Text as="h2">Work Order Details</Text>
      {isEditing ? (
        <form>
          <TextField
            label="Work Order Number"
            name="woNumber"
            value={editedWorkOrder.woNumber}
            onChange={handleChange}
            disabled
          />
          <TextField
            label="Status"
            name="status"
            value={editedWorkOrder.status}
            onChange={handleChange}
          />
          <TextField
            label="Type"
            name="type"
            value={editedWorkOrder.type}
            onChange={handleChange}
          />
          <TextAreaField
            label="Details"
            name="details"
            value={editedWorkOrder.details}
            onChange={handleChange}
          />
          <TextField
            label="Make"
            name="make"
            value={editedWorkOrder.make}
            onChange={handleChange}
          />
          <TextField
            label="Model"
            name="model"
            value={editedWorkOrder.model}
            onChange={handleChange}
          />
          <TextField
            label="Year"
            name="year"
            value={editedWorkOrder.year}
            onChange={handleChange}
            type="number"
          />
          <TextField
            label="Business Name"
            name="businessName"
            value={editedWorkOrder.businessName}
            onChange={handleChange}
          />
          <TextField
            label="Attention Name"
            name="attnName"
            value={editedWorkOrder.attnName}
            onChange={handleChange}
          />
          <TextField
            label="Business Phone"
            name="businessPhone"
            value={editedWorkOrder.businessPhone}
            onChange={handleChange}
          />
          <TextAreaField
            label="Business Shipping Address"
            name="businessShippingAddress"
            value={editedWorkOrder.businessShippingAddress}
            onChange={handleChange}
          />
          <TextField
            label="Customer Name"
            name="customerName"
            value={editedWorkOrder.customerName}
            onChange={handleChange}
          />
          <TextAreaField
            label="Customer Drop Shipping Address"
            name="customerDropShippingAddress"
            value={editedWorkOrder.customerDropShippingAddress}
            onChange={handleChange}
          />
          <Flex padding={10}>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Flex>
        </form>
      ) : (
        <Flex direction="column" gap="small">
          <p>
            <strong>Work Order Number:</strong> {workOrder.woNumber}
          </p>
          <p>
            <strong>Status:</strong> {workOrder.status}
          </p>
          <p>
            <strong>Type:</strong> {workOrder.type}
          </p>
          <p>
            <strong>Details:</strong> {workOrder.details}
          </p>
          <p>
            <strong>Make:</strong> {workOrder.make}
          </p>
          <p>
            <strong>Model:</strong> {workOrder.model}
          </p>
          <p>
            <strong>Year:</strong> {workOrder.year}
          </p>
          <p>
            <strong>Business Name:</strong> {workOrder.businessName}
          </p>
          <p>
            <strong>Attention Name:</strong> {workOrder.attnName}
          </p>
          <p>
            <strong>Business Phone:</strong> {workOrder.businessPhone}
          </p>
          <p>
            <strong>Business Shipping Address:</strong>{" "}
            {workOrder.businessShippingAddress}
          </p>
          <p>
            <strong>Customer Name:</strong> {workOrder.customerName}
          </p>
          <p>
            <strong>Customer Drop Shipping Address:</strong>{" "}
            {workOrder.customerDropShippingAddress}
          </p>
          <Button onClick={handleEdit}>Edit</Button>
        </Flex>
      )}
    </View>
  );
};

export default ViewEditWorkOrder;
