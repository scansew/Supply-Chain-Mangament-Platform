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
import { getBuckle } from "../graphql/queries";
import { updateBuckle } from "../graphql/mutations";
const client = generateClient();
export default function BuckleUpdateForm(props) {
  const {
    id: idProp,
    buckle: buckleModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    number: "",
    webbing: "",
    binding: "",
    otherA: "",
    otherB: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [number, setNumber] = React.useState(initialValues.number);
  const [webbing, setWebbing] = React.useState(initialValues.webbing);
  const [binding, setBinding] = React.useState(initialValues.binding);
  const [otherA, setOtherA] = React.useState(initialValues.otherA);
  const [otherB, setOtherB] = React.useState(initialValues.otherB);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = buckleRecord
      ? { ...initialValues, ...buckleRecord }
      : initialValues;
    setName(cleanValues.name);
    setNumber(cleanValues.number);
    setWebbing(cleanValues.webbing);
    setBinding(cleanValues.binding);
    setOtherA(cleanValues.otherA);
    setOtherB(cleanValues.otherB);
    setErrors({});
  };
  const [buckleRecord, setBuckleRecord] = React.useState(buckleModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getBuckle.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getBuckle
        : buckleModelProp;
      setBuckleRecord(record);
    };
    queryData();
  }, [idProp, buckleModelProp]);
  React.useEffect(resetStateValues, [buckleRecord]);
  const validations = {
    name: [{ type: "Required" }],
    number: [],
    webbing: [],
    binding: [],
    otherA: [],
    otherB: [],
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
          name,
          number: number ?? null,
          webbing: webbing ?? null,
          binding: binding ?? null,
          otherA: otherA ?? null,
          otherB: otherB ?? null,
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
            query: updateBuckle.replaceAll("__typename", ""),
            variables: {
              input: {
                id: buckleRecord.id,
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
      {...getOverrideProps(overrides, "BuckleUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              number,
              webbing,
              binding,
              otherA,
              otherB,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Number"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={number}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              number: value,
              webbing,
              binding,
              otherA,
              otherB,
            };
            const result = onChange(modelFields);
            value = result?.number ?? value;
          }
          if (errors.number?.hasError) {
            runValidationTasks("number", value);
          }
          setNumber(value);
        }}
        onBlur={() => runValidationTasks("number", number)}
        errorMessage={errors.number?.errorMessage}
        hasError={errors.number?.hasError}
        {...getOverrideProps(overrides, "number")}
      ></TextField>
      <TextField
        label="Webbing"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={webbing}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              number,
              webbing: value,
              binding,
              otherA,
              otherB,
            };
            const result = onChange(modelFields);
            value = result?.webbing ?? value;
          }
          if (errors.webbing?.hasError) {
            runValidationTasks("webbing", value);
          }
          setWebbing(value);
        }}
        onBlur={() => runValidationTasks("webbing", webbing)}
        errorMessage={errors.webbing?.errorMessage}
        hasError={errors.webbing?.hasError}
        {...getOverrideProps(overrides, "webbing")}
      ></TextField>
      <TextField
        label="Binding"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={binding}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              number,
              webbing,
              binding: value,
              otherA,
              otherB,
            };
            const result = onChange(modelFields);
            value = result?.binding ?? value;
          }
          if (errors.binding?.hasError) {
            runValidationTasks("binding", value);
          }
          setBinding(value);
        }}
        onBlur={() => runValidationTasks("binding", binding)}
        errorMessage={errors.binding?.errorMessage}
        hasError={errors.binding?.hasError}
        {...getOverrideProps(overrides, "binding")}
      ></TextField>
      <TextField
        label="Other a"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={otherA}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              number,
              webbing,
              binding,
              otherA: value,
              otherB,
            };
            const result = onChange(modelFields);
            value = result?.otherA ?? value;
          }
          if (errors.otherA?.hasError) {
            runValidationTasks("otherA", value);
          }
          setOtherA(value);
        }}
        onBlur={() => runValidationTasks("otherA", otherA)}
        errorMessage={errors.otherA?.errorMessage}
        hasError={errors.otherA?.hasError}
        {...getOverrideProps(overrides, "otherA")}
      ></TextField>
      <TextField
        label="Other b"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={otherB}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              number,
              webbing,
              binding,
              otherA,
              otherB: value,
            };
            const result = onChange(modelFields);
            value = result?.otherB ?? value;
          }
          if (errors.otherB?.hasError) {
            runValidationTasks("otherB", value);
          }
          setOtherB(value);
        }}
        onBlur={() => runValidationTasks("otherB", otherB)}
        errorMessage={errors.otherB?.errorMessage}
        hasError={errors.otherB?.hasError}
        {...getOverrideProps(overrides, "otherB")}
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
          isDisabled={!(idProp || buckleModelProp)}
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
              !(idProp || buckleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
