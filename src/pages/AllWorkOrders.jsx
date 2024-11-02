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
import { listWorkOrders } from "../graphql/queries";
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
        variables: {
          filter: {
            companyId: { eq: SSuser.companyId },
          },
        },
      });
      setWorkOrders(userData.data.listWorkOrders.items);
      console.log("fetched images", userData.data.listWorkOrders.items);
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
            // backgroundColor={tokens.colors.neutral[20]}
            padding={tokens.space.zero}
          >
            <Heading level={5}>{status.replace("_", " ")}</Heading>

            <Flex
              variation="outlined"
              width="350px"
              height="100%"
              minheight="100vh"
              // backgroundColor={tokens.colors.neutral[20]}
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
                        item.filesFolder ||
                        "https://scanandsewapp-storage-442a3489f0bf1-deve.s3.us-east-1.amazonaws.com/public/1729644765508_DSC02411.JPG?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIAvYqnCKUsH2pqMzoTPI53qGGK1LKj8WAlWXZclsz9ACAiEA9L4qiL%2FvZSDUzszE5o%2BL9tqM2eZXYch2cEYEdtVCrTQq5wMI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjM0OTgyNjkiDHzsszitIagwrk1xOCq7A61f81FlX%2BUtSCelv1VOLsaNabVd%2Fv0nJMT5n2pvSzygUgkAWuCYdggv6jcXwEf32z%2B0xgSvkfHoIl%2FvLkqlG60BYu4EMqiJ1DKK5yfAWTZItvw3ZGz7OKQYpBkHZJ%2BkxQkVUK57Oqf0inib2RUeU5vTwc%2F%2F%2BZen6v5JogvzJZGD33LoPTx0p%2FDfHV3ZGxLRsgUz0blz4lE99VV7k3k08hF0KCmnqrSrfqX%2FH5IZaBOn76rvwMmoTVVlJ9%2BSb0jJlhjYaTHq83HzeFVKO7hjzt03gVfLUl%2F5VBzNrfNFitIGlxSonaER7rYHPDZ2tCTCTREUm2irbn5642bZb5dSitOxkPQtsX5MWHzVkJJvAgRMDEjyXQKzHCddftMs5prrFkjZZabBmEgPyPpzQoat3ve6jleAOGf5xHezjUK4u6HIWMGcsl4%2Bj8qxcGn885L0O9QNSeDWte2qaWWAL80sexZbvyoBFOUwFfFENnmn%2BD5kbUf5Vzhlax9vbiRA2ffm4547wR6WY57XeGpJEeATXnUp%2BGnES5o7Llz5I6vsEcuC9qmU5U8tevfyPxVG1XSUoDA3jAS%2FH7Z8yOchMNzj7bgGOuQCX1m8TXf8g2A%2FtDiW1RfhfLsgGjb634v0lMqg9yufdZj8E7yagzTVdInpkqTp4JuUgq0mqU%2FccOsaNpissj9CYcS%2FbsPZCh54cPp3RTJiTStW%2BFNRG%2BpAIY8FH%2B71eo019KLfOHl%2BkDFHABAjXi%2F%2FKpsMK8srKiQPdIjUjTBYvWIEwh0OUnLucTkJbbtqnj2IRYKmk9ZJOfXGj%2B5Cn3hRMVUNYm0cgc3fxWI47wFMCRRHrYCk1G3LWkSLU7iB6cTJ7aevEXRESTAAC77TbR3nbsKOnCKsReXqzKSI8hp%2BzJfQsqzaTGDmEtoOe5e%2BFk05a%2B%2F%2BHd6mp4OlorvRyClFLo70tOOYJbVg2xKD27%2Bb3q976Wj6WUBIl8LRz7SfapBwaJz36yIe8gBkfwea8g1N425bmOex0g8RypS%2BVkLBcLup0wOf1paIE%2Bivxa%2BJHJJNYS1MeS6MHrMj7PywEFalZrii2%2Bs%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAZI2LGWQOTY7HN5OF%2F20241025%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241025T214951Z&X-Amz-Expires=36000&X-Amz-SignedHeaders=host&X-Amz-Signature=4450577051c1d23d71a427477cd760f9767ca6d0004b824240b612f6a8fb8981"
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
                          {item.createdAt
                            ? format(parseISO(item.createdAt), "MMM dd, yyyy")
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
