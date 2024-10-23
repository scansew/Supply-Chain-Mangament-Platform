/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getWorkOrderCounter } from "../graphql/queries";
import { updateWorkOrderCounter } from "../graphql/mutations";
const client = generateClient();
export default function WorkOrderCounterUpdateForm(props) {
  const {
    counterName: counterNameProp,
    workOrderCounter: workOrderCounterModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    counterName: "",
    currentValue: "",
  };
  const [counterName, setCounterName] = React.useState(
    initialValues.counterName
  );
  const [currentValue, setCurrentValue] = React.useState(
    initialValues.currentValue
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = workOrderCounterRecord
      ? { ...initialValues, ...workOrderCounterRecord }
      : initialValues;
    setCounterName(cleanValues.counterName);
    setCurrentValue(cleanValues.currentValue);
    setErrors({});
  };
  const [workOrderCounterRecord, setWorkOrderCounterRecord] = React.useState(
    workOrderCounterModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = counterNameProp
        ? (
            await client.graphql({
              query: getWorkOrderCounter.replaceAll("__typename", ""),
              variables: { counterName: counterNameProp },
            })
          )?.data?.getWorkOrderCounter
        : workOrderCounterModelProp;
      setWorkOrderCounterRecord(record);
    };
    queryData();
  }, [counterNameProp, workOrderCounterModelProp]);
  React.useEffect(resetStateValues, [workOrderCounterRecord]);
  const validations = {
    counterName: [{ type: "Required" }],
    currentValue: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          counterName,
          currentValue,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateWorkOrderCounter.replaceAll("__typename", ""),
            variables: {
              input: {
                counterName: workOrderCounterRecord.counterName,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "WorkOrderCounterUpdateForm")}
      {...rest}
    >
      <TextField
        label="Counter name"
        isRequired={true}
        isReadOnly={true}
        value={counterName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              counterName: value,
              currentValue,
            };
            const result = onChange(modelFields);
            value = result?.counterName ?? value;
          }
          if (errors.counterName?.hasError) {
            runValidationTasks("counterName", value);
          }
          setCounterName(value);
        }}
        onBlur={() => runValidationTasks("counterName", counterName)}
        errorMessage={errors.counterName?.errorMessage}
        hasError={errors.counterName?.hasError}
        {...getOverrideProps(overrides, "counterName")}
      ></TextField>
      <TextField
        label="Current value"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={currentValue}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              counterName,
              currentValue: value,
            };
            const result = onChange(modelFields);
            value = result?.currentValue ?? value;
          }
          if (errors.currentValue?.hasError) {
            runValidationTasks("currentValue", value);
          }
          setCurrentValue(value);
        }}
        onBlur={() => runValidationTasks("currentValue", currentValue)}
        errorMessage={errors.currentValue?.errorMessage}
        hasError={errors.currentValue?.hasError}
        {...getOverrideProps(overrides, "currentValue")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(counterNameProp || workOrderCounterModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(counterNameProp || workOrderCounterModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
