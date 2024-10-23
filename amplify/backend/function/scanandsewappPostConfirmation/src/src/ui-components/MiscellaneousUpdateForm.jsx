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
import { getMiscellaneous } from "../graphql/queries";
import { updateMiscellaneous } from "../graphql/mutations";
const client = generateClient();
export default function MiscellaneousUpdateForm(props) {
  const {
    id: idProp,
    miscellaneous: miscellaneousModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    miscName: "",
    quantity: "",
  };
  const [miscName, setMiscName] = React.useState(initialValues.miscName);
  const [quantity, setQuantity] = React.useState(initialValues.quantity);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = miscellaneousRecord
      ? { ...initialValues, ...miscellaneousRecord }
      : initialValues;
    setMiscName(cleanValues.miscName);
    setQuantity(cleanValues.quantity);
    setErrors({});
  };
  const [miscellaneousRecord, setMiscellaneousRecord] = React.useState(
    miscellaneousModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMiscellaneous.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMiscellaneous
        : miscellaneousModelProp;
      setMiscellaneousRecord(record);
    };
    queryData();
  }, [idProp, miscellaneousModelProp]);
  React.useEffect(resetStateValues, [miscellaneousRecord]);
  const validations = {
    miscName: [{ type: "Required" }],
    quantity: [],
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
          miscName,
          quantity: quantity ?? null,
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
            query: updateMiscellaneous.replaceAll("__typename", ""),
            variables: {
              input: {
                id: miscellaneousRecord.id,
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
      {...getOverrideProps(overrides, "MiscellaneousUpdateForm")}
      {...rest}
    >
      <TextField
        label="Misc name"
        isRequired={true}
        isReadOnly={false}
        value={miscName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              miscName: value,
              quantity,
            };
            const result = onChange(modelFields);
            value = result?.miscName ?? value;
          }
          if (errors.miscName?.hasError) {
            runValidationTasks("miscName", value);
          }
          setMiscName(value);
        }}
        onBlur={() => runValidationTasks("miscName", miscName)}
        errorMessage={errors.miscName?.errorMessage}
        hasError={errors.miscName?.hasError}
        {...getOverrideProps(overrides, "miscName")}
      ></TextField>
      <TextField
        label="Quantity"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={quantity}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              miscName,
              quantity: value,
            };
            const result = onChange(modelFields);
            value = result?.quantity ?? value;
          }
          if (errors.quantity?.hasError) {
            runValidationTasks("quantity", value);
          }
          setQuantity(value);
        }}
        onBlur={() => runValidationTasks("quantity", quantity)}
        errorMessage={errors.quantity?.errorMessage}
        hasError={errors.quantity?.hasError}
        {...getOverrideProps(overrides, "quantity")}
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
          isDisabled={!(idProp || miscellaneousModelProp)}
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
              !(idProp || miscellaneousModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
