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
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import CreateWorkOrderForm from "./CreateWorkOrderForm";
import { listWorkOrders } from "./graphql/queries";
import {
  onCreateWorkOrder,
  onUpdateWorkOrder,
  onDeleteWorkOrder,
} from "./graphql/subscriptions";
import { generateClient } from "aws-amplify/api";
import { parseISO, format } from "date-fns"; // Make sure to install and import date-fns
import ViewEditWorkOrder from "./ViewWorkorder";
const client = generateClient();

function AllWorkOrders({ SSuser }) {
  const [workOrders, setWorkOrders] = useState([]);
  const { tokens } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState(null);

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
      const userData = await client.graphql({
        query: listWorkOrders,
      });
      setWorkOrders(userData.data.listWorkOrders.items);
    } catch (err) {
      console.log("error fetching WO", err);
    }
  };

  const groupedWorkOrders = {
    PENDING: workOrders.filter((workOrder) => workOrder.status === "PENDING"),
    IN_PROGRESS: workOrders.filter(
      (workOrder) => workOrder.status === "IN_PROGRESS"
    ),
    COMPLETED: workOrders.filter(
      (workOrder) => workOrder.status === "COMPLETED"
    ),
  };
  const handleViewDetails = (workOrderId) => {
    console.log("Viewing details for work order ID:", workOrderId);
    setSelectedWorkOrderId(workOrderId);
    setIsModalOpen(true);
  };

  return (
    <View width="100%">
      <CreateWorkOrderForm SSuser={SSuser} />

      <Flex direction="row" width="100%">
        {Object.entries(groupedWorkOrders).map(([status, items]) => (
          <Card
            key={status}
            backgroundColor={tokens.colors.neutral[20]}
            padding={tokens.space.zero}
          >
            <Heading level={5}>{status.replace("_", " ")}</Heading>

            <Flex
              variation="outlined"
              width="350px"
              height="calc(100vh - 100px)"
              backgroundColor={tokens.colors.neutral[20]}
              borderRadius={tokens.radii.medium}
              overflow="hidden"
              paddingTop={tokens.space.small}
            >
              <Collection
                items={items}
                type="list"
                direction="column"
                gap={tokens.space.small}
                wrap="nowrap"
                height="calc(100% - 60px)"
                padding={tokens.space.small}
                overflow="auto"
              >
                {(item, handleCardClick) => (
                  <Card
                    key={item.id}
                    variation="elevated"
                    width="100%"
                    padding={tokens.space.zero}
                    borderRadius={tokens.radii.medium}
                    style={{
                      backgroundImage: `url(${
                        item.imageUrl ||
                        "https://images.pexels.com/photos/33689/ship-boat-lake-garda-italy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <Flex
                      direction="column"
                      gap={tokens.space.zero}
                      backgroundColor="rgba(255, 255, 255, 0.6)"
                      height="100%"
                    >
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt="Work Order Preview"
                          objectFit="cover"
                          width="100%"
                          height="100px"
                          borderTopLeftRadius={tokens.radii.medium}
                          borderTopRightRadius={tokens.radii.medium}
                        />
                      )}
                      <Flex
                        direction="column"
                        padding={tokens.space.small}
                        gap={tokens.space.xxs}
                      >
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text
                            fontSize={tokens.fontSizes.small}
                            fontWeight="bold"
                          >
                            Work Order {item.woNumber}
                          </Text>
                          <Badge variation="info" size="small">
                            {item.process}
                          </Badge>
                        </Flex>
                        <Text
                          fontSize={tokens.fontSizes.xs}
                          variation="secondary"
                        >
                          {item.date
                            ? format(parseISO(item.date), "MMM dd, yyyy")
                            : "No date"}
                        </Text>
                        <Text
                          fontSize={tokens.fontSizes.xs}
                          variation="secondary"
                          lineclamp={2}
                        >
                          {item.details}
                        </Text>
                        <Text
                          fontSize={tokens.fontSizes.xs}
                          variation="secondary"
                          lineclamp={1}
                        >
                          Ship to: {item.shippingAddress}
                        </Text>
                        <Flex
                          wrap="wrap"
                          gap={tokens.space.xxs}
                          alignItems="center"
                        >
                          <Text
                            fontSize={tokens.fontSizes.xs}
                            variation="secondary"
                          >
                            Company: {item.companyId}
                          </Text>
                          <Badge variation="info" size="small">
                            {item.type}
                          </Badge>
                        </Flex>
                        <Button
                          variation="info"
                          size="small"
                          onClick={() => handleViewDetails(item.id)}
                          // onClick={(clickedItem) => {
                          //   // Handle the click event, e.g., navigate to details page
                          //   <ViewEditWorkOrder workOrderId={item.woNumber} />;

                          //   console.log("Clicked item:", clickedItem);
                          // }}
                          marginTop={tokens.space.xs}
                        >
                          View Details
                        </Button>
                      </Flex>
                    </Flex>
                  </Card>
                )}
              </Collection>
            </Flex>
          </Card>
        ))}
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
              >
                Close
              </Button>
            </Flex>
            <ViewEditWorkOrder workOrderId={selectedWorkOrderId} />
          </Flex>
        </View>
      )}
    </View>
  );
}

export default AllWorkOrders;
