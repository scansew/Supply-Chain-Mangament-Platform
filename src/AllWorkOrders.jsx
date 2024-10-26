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
import { MdClose } from "react-icons/md";

const client = generateClient();

function AllWorkOrders({ SSuser }) {
  const [workOrders, setWorkOrders] = useState([]);
  const { tokens } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

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
  const handleViewDetails = (workOrder) => {
    console.log("Viewing details for work order ID:", workOrder);
    setSelectedWorkOrder(workOrder);
    setIsModalOpen(true);
  };

  return (
    <View width="100%">
      <CreateWorkOrderForm SSuser={SSuser} button="create" />

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
                        "https://scanandsewapp-storage-442a3489f0bf1-deve.s3.us-east-1.amazonaws.com/public/1729644765508_DSC02411.JPG?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQC8rFNV5ChtE7y697dIMWG6W2ZuKjaylA0zEl4GBpfqagIhANQ2yKDS99REMwzwVgrVgREv%2Bcn6uyhFHeySILC7AYqDKt4DCBUQABoMNjM3NDIzNDk4MjY5Igyxty7RmvBaIEoj6bcquwPPN7kqpqHNZi62E8%2FqwEGwZZcJxs2cTcnLdF2vNX7dRgq%2BTFaeCHhTuHXhHvA3mfJS8p5hUHEAuhsFHwab3R7JA4SuRf3imEKaDGFuu8WW0ZBKmeKpMQkfiuEJTMgiZmXR4WJCs3ExP6BZ%2FIc3EhddPsKzUUTPv6XMmStT5DyMRW0f0GFB8Q%2FgkOeMLg8bXGNNOyEiYP4CmqbiK9eTTN%2BTXhMm68LZXJT2ShxgN9kOrtrYEq5rvaL6lL99bA2GVWHFPMO%2FU8QYenYzddUY%2BeKvkQgHtrwpIWQoXIHnxmRPSmVoS8yJ2rjMo9viEFXpsvXTjaWgSqq%2FNKhTM7I%2F7jn4wHl3pQeCtcQ7vpgpgppMX2q%2B5UpFU9Ph7wsr%2F8drAMKz4NtRYcPGl74smjYytoAuPtNJydLRTedcAvUKa8%2Be4PF%2BOi4KXyhizLyn9fEbA%2BYIwbkqXWkFrEH8evpfd5B8dAADrEc%2B0f7RGldM0MQLYMNK%2BrietMxhOc95yuO68aMMcdqZRwdeDuuNzvUdq6NM2MgBYOiFhvw9OCKuJzBt0I6bJ5kmtOtvGehRJnVVxSWO1aO%2BZVel6aXMxjDgmPO4BjrjAjIx11yzIOD1yrFj0Co5dS9XtahlCyvMl3dYRaapFQJuXX%2BscDcydPWZQJ%2B5YEIDJQxzTBGmUcMODtYdMyu9L4iQX9zB1pLMJRspiUyELa%2F%2Fqom0XugpjYEFLcEcLi0cHVL2DRBWKIPx9KGC7sJGdahnxxgdkHIikWe80NK%2B64%2BXlPRkB1Dijyh47zx5jYCttWsNNqtbvyNPHT0bMNxEYhe488x8FzJ55OnSQXcpzlIgZ7xvcsD85JvwLz%2BDLa4Qi1%2F%2Bk7caSLKLlOz235W1qp8VWCxwggNNGMR0A7DIgjmB1wXY60S5LwT%2FTltbjGvfSZ%2BvPWAGMe2OMYFA7Op0jiZmFFUryFE7EsOKrUzdh7ciG4LrtZhCkT3Sri2R4FqYGhd0CvLhYV2tj9lNhKYYxg6jHwbQ6%2FKGFBwgMKMdS6qzzqElEtiGgk4QZPXLF0IZqVfxUr1XhvXh8afl%2BEQNwloPCw8%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAZI2LGWQO6OMTS476%2F20241026%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241026T122031Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=1f1daa424e318b474cf027bcc5df129e31ea61672bea99d1e8f573535e504389"
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
                          onClick={() => handleViewDetails(item)}
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
                aria-label="Close"
                size="small"
              >
                <MdClose />
              </Button>
            </Flex>
            <ViewEditWorkOrder
              workOrderItem={selectedWorkOrder}
              SSuser={SSuser}
            />
          </Flex>
        </View>
      )}
    </View>
  );
}

export default AllWorkOrders;
