import React from "react";
import {
  Card,
  Grid,

} from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";

import CreateWorkOrderForm from "./CreateWorkOrderForm";
import CreateWOFiles from "./UploadImages";

function WorkOrder({}) {
  return (
      <Grid templateColumns="1fr 1fr" columnGap="0rem">
        <Card columnStart="1" columnEnd="2" >
          <CreateWorkOrderForm />
        </Card>
        <Card >
        <CreateWOFiles/>
        </Card>
      </Grid>
  );
}
export default WorkOrder;
