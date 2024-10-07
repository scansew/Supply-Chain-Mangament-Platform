import { Card, Flex, Collection } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Frame1171275590} from "./ui-components";

function AllWorkOrders({}) {
  const items = [
    {
      title: "Milford - Room #1",
      badges: ["Waterfront", "Verified"],
    },
    {
      title: "Milford - Room #2",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #2",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #2",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #2",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #2",
      badges: ["Mountain", "Verified"],
    },
  ];

  return (
    <div>
      <Flex
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        alignContent="flex-start"
        wrap="nowrap"
        gap="1rem"
      >
        <Card variation="outlined">
          <h3>TODO</h3>
          <Collection
            items={items}
            type="list"
            direction="column"
            gap="20px"
            wrap="nowrap"
          >
            {(item, index) => <Frame1171275590 />}
          </Collection>
        </Card>

        <Card  variation="outlined">
          <h3>In Progress</h3>
          <Collection
            items={items}
            type="list"
            direction="column"
            gap="20px"
            wrap="nowrap"
          >
            {(item, index) => <Frame1171275590 />}
          </Collection>
        </Card>

        <Card variation="outlined">
          <h3>In Review</h3>
          <Collection
            items={items}
            type="list"
            direction="column"
            gap="20px"
            wrap="nowrap"
          >
            {(item, index) => <Frame1171275590 />}
          </Collection>
        </Card>

        <Card variation="outlined">
          <h3>Completed</h3>

          <Collection
            items={items}
            type="list"
            direction="column"
            gap="20px"
            wrap="nowrap"
          >
            {(item, index) => <Frame1171275590 />}
          </Collection>
        </Card>
      </Flex>
    </div>
  );
}

export default AllWorkOrders;
