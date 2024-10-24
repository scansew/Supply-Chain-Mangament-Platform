import { Card, Flex, Collection } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
// import { Frame1171275590} from "./ui-components";
import CreateWorkOrderForm from "./CreateWorkOrderForm";
function AllWorkOrders({ SSuser }) {
  const items = [
    {
      title: "Milford - WO #1",
      badges: ["Waterfront", "Verified"],
    },
    {
      title: "Milford - WO #2",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - WO #22",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - WO #23",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - WO #24",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - WO #52",
      badges: ["Mountain", "Verified"],
    },
  ];
  return (
    <div>
      <CreateWorkOrderForm SSuser={SSuser} />

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
            {(item, index) => <div key={index}>{item.title}</div>}
          </Collection>
        </Card>

        <Card variation="outlined">
          <h3>In Progress</h3>
          <Collection
            items={items}
            type="list"
            direction="column"
            gap="20px"
            wrap="nowrap"
          >
            {(item, index) => <div key={index}>{item.title}</div>}
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
            {(item, index) => <div key={index}>{item.title}</div>}
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
            {(item, index) => <div key={index}>{item.title}</div>}
          </Collection>
        </Card>
      </Flex>
    </div>
  );
}

export default AllWorkOrders;
