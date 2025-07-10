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
import { createDRing } from "../graphql/mutations";
const client = generateClient();
export default function DRingCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    dRingTotal: "",
    name: "",
    number: "",
    webbing: "",
    strap: "",
  };
  const [dRingTotal, setDRingTotal] = React.useState(initialValues.dRingTotal);
  const [name, setName] = React.useState(initialValues.name);
  const [number, setNumber] = React.useState(initialValues.number);
  const [webbing, setWebbing] = React.useState(initialValues.webbing);
  const [strap, setStrap] = React.useState(initialValues.strap);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDRingTotal(initialValues.dRingTotal);
    setName(initialValues.name);
    setNumber(initialValues.number);
    setWebbing(initialValues.webbing);
    setStrap(initialValues.strap);
    setErrors({});
  };
  const validations = {
    dRingTotal: [],
    name: [{ type: "Required" }],
    number: [],
    webbing: [],
    strap: [],
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
          dRingTotal,
          name,
          number,
          webbing,
          strap,
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
            query: createDRing.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "DRingCreateForm")}
      {...rest}
    >
      <TextField
        label="D ring total"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={dRingTotal}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              dRingTotal: value,
              name,
              number,
              webbing,
              strap,
            };
            const result = onChange(modelFields);
            value = result?.dRingTotal ?? value;
          }
          if (errors.dRingTotal?.hasError) {
            runValidationTasks("dRingTotal", value);
          }
          setDRingTotal(value);
        }}
        onBlur={() => runValidationTasks("dRingTotal", dRingTotal)}
        errorMessage={errors.dRingTotal?.errorMessage}
        hasError={errors.dRingTotal?.hasError}
        {...getOverrideProps(overrides, "dRingTotal")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dRingTotal,
              name: value,
              number,
              webbing,
              strap,
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
              dRingTotal,
              name,
              number: value,
              webbing,
              strap,
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
              dRingTotal,
              name,
              number,
              webbing: value,
              strap,
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
        label="Strap"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={strap}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              dRingTotal,
              name,
              number,
              webbing,
              strap: value,
            };
            const result = onChange(modelFields);
            value = result?.strap ?? value;
          }
          if (errors.strap?.hasError) {
            runValidationTasks("strap", value);
          }
          setStrap(value);
        }}
        onBlur={() => runValidationTasks("strap", strap)}
        errorMessage={errors.strap?.errorMessage}
        hasError={errors.strap?.hasError}
        {...getOverrideProps(overrides, "strap")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
