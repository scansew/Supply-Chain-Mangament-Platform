import React, { useEffect, useState } from "react";
import {
  Collection,
  Card,
  Heading,
  Flex,
  Text,
  Badge,
  Image,
  View,
  useTheme,
  Button,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Menu,
  MenuItem,
} from "@aws-amplify/ui-react";
import {} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import CreateWorkOrderForm from "./CreateWorkOrderForm";
import { listWorkOrders, listCompanyRoles } from "../graphql/queries";
import {
  onCreateWorkOrder,
  onUpdateWorkOrder,
  onDeleteWorkOrder,
} from "../graphql/subscriptions";
import { generateClient } from "aws-amplify/api";
import { parseISO, format } from "date-fns"; // Make sure to install and import date-fns
import ViewEditWorkOrder from "./ViewWorkorder";
import { MdClose } from "react-icons/md";

const client = generateClient();

function AllWorkOrders({ SSuser }) {
  const [workOrders, setWorkOrders] = useState([]);
  const { tokens } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [companyRoles, setCompanyRoles] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [currentRole, setCurrentRoles] = useState(null);
  const getStatusColor = (status) => {
    const statusColors = {
      SCANNING: "rgb(179, 207, 255)", // Pastel Blue
      DESIGN: "rgb(208, 186, 255)", // Pastel Purple
      CNC_CUTTING: "rgb(255, 198, 173)", // Pastel Orange
      MANUFACTURING: "rgb(255, 223, 186)", // Pastel Yellow
      WAREHOUSE: "rgb(190, 233, 190)", // Pastel Green
      CUSTOMER_DELIVERY: "rgb(178, 223, 219)", // Pastel Teal
    };
    return statusColors[status] || tokens.colors.neutral[60];
  };

  // Add this function for text colors to ensure readability
  const getTextColor = (status) => {
    const textColors = {
      SCANNING: "rgb(41, 84, 155)", // Darker Blue
      DESIGN: "rgb(96, 60, 158)", // Darker Purple
      CNC_CUTTING: "rgb(184, 91, 40)", // Darker Orange
      MANUFACTURING: "rgb(158, 119, 33)", // Darker Yellow
      WAREHOUSE: "rgb(54, 124, 54)", // Darker Green
      CUSTOMER_DELIVERY: "rgb(40, 110, 104)", // Darker Teal
    };
    return textColors[status] || tokens.colors.neutral[90];
  };

  useEffect(() => {
    fetchWorkOrders();

    const createSubscription = client
      .graphql({ query: onCreateWorkOrder })
      .subscribe({
        next: ({ data }) => {
          setWorkOrders((prevOrders) => [
            ...prevOrders,
            data.onCreateWorkOrder,
          ]);
        },
        error: (error) => console.warn(error),
      });

    const updateSubscription = client
      .graphql({ query: onUpdateWorkOrder })
      .subscribe({
        next: ({ data }) => {
          setWorkOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === data.onUpdateWorkOrder.id
                ? data.onUpdateWorkOrder
                : order
            )
          );
        },
        error: (error) => console.warn(error),
      });

    const deleteSubscription = client
      .graphql({ query: onDeleteWorkOrder })
      .subscribe({
        next: ({ data }) => {
          setWorkOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== data.onDeleteWorkOrder.id)
          );
        },
        error: (error) => console.warn(error),
      });

    return () => {
      createSubscription.unsubscribe();
      updateSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, []);

  const fetchWorkOrders = async () => {
    try {
      if (SSuser.role === "sAdmin") {
        const userData = await client.graphql({
          query: listWorkOrders,
        });
        setWorkOrders(userData.data.listWorkOrders.items);
      } else {
        const userData = await client.graphql({
          query: listWorkOrders,
          variables: {
            filter: {
              companyId: { eq: SSuser.companyId },
            },
          },
        });
        setWorkOrders(userData.data.listWorkOrders.items);
      }
      console.log("fetched Work Orders");
    } catch (err) {
      console.log("error fetching WO", err);
    }
  };
  const stageSequence = [
    "SCANNING",
    "DESIGN",
    "CNC_CUTTING",
    "MANUFACTURING",
    "WAREHOUSE",
    "CUSTOMER_DELIVERY",
  ];
  const getStagesForCompanyType = (companyType) => {
    switch (companyType?.toUpperCase()) {
      case "SCAN":
        return stageSequence; // Show all stages
      case "CNC":
        return ["CNC_CUTTING"]; // Show only CNC_CUTTING stage
      case "MANUFACTURE":
        return ["MANUFACTURING"]; // Show only MANUFACTURING stage
      default:
        return [];
    }
  };

  // Add this function to fetch company types
  const fetchCompanyTypes = async () => {
    try {
      const response = await client.graphql({
        query: listCompanyRoles,
        variables: {
          filter: {
            companyId: { eq: SSuser.companyId },
          },
        },
      });

      // Get the company types from the attributes
      const companyRoles1 = response.data.listCompanyRoles.items;
      if (companyRoles1) {
        setCompanyRoles(companyRoles1);
      }
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching company types:", error);
      setIsDataFetched(false);
    }
  };
  useEffect(() => {
    fetchCompanyTypes();
  });
  const handleSwitchRoles = (role) => {
    setCurrentRoles(role.roleId);
  };

  const relevantStages = getStagesForCompanyType(currentRole);

  // Create grouped work orders only for relevant stages
  const groupedWorkOrders = relevantStages.reduce((acc, stage) => {
    acc[stage] = workOrders.filter(
      (workOrder) => workOrder.currentStage === stage
    );
    return acc;
  }, {});

  const renderRoleSwitcher = () => {
    if (!isDataFetched) return null;
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Menu
                trigger={
                  <Button variant="ghost" size="small">
                    Switch Roles
                  </Button>
                }
              >
                {companyRoles.map((role) => (
                  <MenuItem
                    key={role.roleId}
                    onClick={() => handleSwitchRoles(role)}
                  >
                    {role.roleId}
                  </MenuItem>
                ))}
              </Menu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };
  const handleViewDetails = (workOrder) => {
    console.log("Viewing details for work order ID:", workOrder);
    setSelectedWorkOrder(workOrder);
    setIsModalOpen(true);
  };
  const cardStyles = {
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease-in-out",
    border: "1px solid rgba(0, 0, 0, 0.08)",
  };
  return (
    <View
      width="100%"
      style={{
        backgroundColor: "rgb(250, 250, 252)",
      }}
    >
      {" "}
      <Flex direction="column" gap={tokens.space.large}>
        {/* Header Section */}
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={tokens.space.medium}
          backgroundColor={tokens.colors.neutral[10]}
          borderRadius={tokens.radii.medium}
        >
          <CreateWorkOrderForm SSuser={SSuser} button="create" />
          <Text>Select your View here: </Text>
          {renderRoleSwitcher()}
        </Flex>

        {/* Work Orders Grid */}
        <Flex
          direction="row"
          width="100%"
          gap={tokens.space.medium}
          overflow="auto"
          padding={tokens.space.small}
        >
          {Object.entries(groupedWorkOrders).map(([status, items]) => (
            <Card
              key={status}
              padding={tokens.space.medium}
              width={`${80 / Object.keys(groupedWorkOrders).length}%`} // This makes all columns equal width
              minWidth="150px" // Ensures columns don't get too narrow
              maxWidth="500px" // Ensures columns don't get too wide
              backgroundColor={tokens.colors.neutral[10]}
              variation="outlined"
              borderRadius={tokens.radii.medium}
              style={{
                flex: "1 0 auto", // This helps with equal width distribution
              }}
            >
              <Heading
                level={6}
                padding={tokens.space.small}
                backgroundColor={getStatusColor(status)}
                color={getTextColor(status)}
                borderRadius={tokens.radii.small}
                textAlign="center"
                style={{
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                {status.replace("_", " ")}
              </Heading>

              <Collection
                items={items}
                type="list"
                direction="column"
                gap={tokens.space.small}
                wrap="nowrap"
              >
                {(item) => (
                  <Card
                    key={item.id}
                    variation="elevated"
                    width="100%"
                    padding={tokens.space.medium}
                    borderRadius={tokens.radii.medium}
                    backgroundColor={tokens.colors.white}
                    onClick={() => handleViewDetails(item)}
                    style={{
                      transition: "all 0.2s ease-in-out",
                      cursor: "pointer",
                      borderLeft: `4px solid ${getStatusColor(status)}`,
                      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
                      ":hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        backgroundColor: `${getStatusColor(status)}15`, // Adding slight background tint on hover
                      },
                    }}
                  >
                    <Flex direction="column" gap={tokens.space.xs}>
                      <Flex justifyContent="space-between" alignItems="center">
                        <Text
                          fontSize={tokens.fontSizes.medium}
                          fontWeight={tokens.fontWeights.bold}
                          color={getTextColor(status)}
                        >
                          Work Order {item.woNumber}
                        </Text>
                        <Badge
                          backgroundColor={getStatusColor(status)}
                          color={getTextColor(status)}
                          size="small"
                          style={{
                            padding: "4px 12px",
                            fontWeight: "500",
                          }}
                        >
                          {item.process}
                        </Badge>
                      </Flex>

                      <Flex
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        marginTop={tokens.space.xs}
                      >
                        <Text
                          fontSize={tokens.fontSizes.small}
                          color={tokens.colors.neutral[80]}
                        >
                          {item.createdAt
                            ? format(parseISO(item.createdAt), "MMM dd, yyyy")
                            : "No date"}
                        </Text>
                      </Flex>

                      {item.description && (
                        <Text
                          fontSize={tokens.fontSizes.small}
                          color={tokens.colors.neutral[80]}
                          lineHeight={tokens.lineHeights.medium}
                          marginTop={tokens.space.xs}
                        >
                          {item.description}
                        </Text>
                      )}
                    </Flex>
                  </Card>
                )}
              </Collection>

              {items.length === 0 && (
                <Flex
                  direction="column"
                  alignItems="center"
                  padding={tokens.space.large}
                  backgroundColor={`${getStatusColor(status)}20`}
                  borderRadius={tokens.radii.medium}
                  marginTop={tokens.space.small}
                >
                  <Text color={getTextColor(status)}>
                    No work orders in this stage
                  </Text>
                </Flex>
              )}
            </Card>
          ))}
        </Flex>
      </Flex>
      {isModalOpen === true && (
        <View
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          zindex="100"
        >
          <Flex
            direction="column"
            backgroundColor="white"
            margin="2rem"
            padding="2rem"
            borderRadius="medium"
            maxHeight="90vh"
            overflow="auto"
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              marginBottom="1rem"
            >
              <Heading level={3}>Work Order Details</Heading>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                }}
                aria-label="Close"
                size="small"
              >
                <MdClose />
              </Button>
            </Flex>
            <ViewEditWorkOrder
              workOrderItem={selectedWorkOrder}
              SSuser={SSuser}
              currentRole={currentRole}
            />
          </Flex>
        </View>
      )}
    </View>
  );
}

export default AllWorkOrders;
