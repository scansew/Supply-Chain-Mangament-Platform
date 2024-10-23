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
import { getMaterial } from "../graphql/queries";
import { updateMaterial } from "../graphql/mutations";
const client = generateClient();
export default function MaterialUpdateForm(props) {
  const {
    id: idProp,
    material: materialModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    materialName: "",
    measurements: "",
  };
  const [materialName, setMaterialName] = React.useState(
    initialValues.materialName
  );
  const [measurements, setMeasurements] = React.useState(
    initialValues.measurements
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = materialRecord
      ? { ...initialValues, ...materialRecord }
      : initialValues;
    setMaterialName(cleanValues.materialName);
    setMeasurements(cleanValues.measurements);
    setErrors({});
  };
  const [materialRecord, setMaterialRecord] = React.useState(materialModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMaterial.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMaterial
        : materialModelProp;
      setMaterialRecord(record);
    };
    queryData();
  }, [idProp, materialModelProp]);
  React.useEffect(resetStateValues, [materialRecord]);
  const validations = {
    materialName: [{ type: "Required" }],
    measurements: [],
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
          materialName,
          measurements: measurements ?? null,
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
            query: updateMaterial.replaceAll("__typename", ""),
            variables: {
              input: {
                id: materialRecord.id,
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
      {...getOverrideProps(overrides, "MaterialUpdateForm")}
      {...rest}
    >
      <TextField
        label="Material name"
        isRequired={true}
        isReadOnly={false}
        value={materialName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              materialName: value,
              measurements,
            };
            const result = onChange(modelFields);
            value = result?.materialName ?? value;
          }
          if (errors.materialName?.hasError) {
            runValidationTasks("materialName", value);
          }
          setMaterialName(value);
        }}
        onBlur={() => runValidationTasks("materialName", materialName)}
        errorMessage={errors.materialName?.errorMessage}
        hasError={errors.materialName?.hasError}
        {...getOverrideProps(overrides, "materialName")}
      ></TextField>
      <TextField
        label="Measurements"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={measurements}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              materialName,
              measurements: value,
            };
            const result = onChange(modelFields);
            value = result?.measurements ?? value;
          }
          if (errors.measurements?.hasError) {
            runValidationTasks("measurements", value);
          }
          setMeasurements(value);
        }}
        onBlur={() => runValidationTasks("measurements", measurements)}
        errorMessage={errors.measurements?.errorMessage}
        hasError={errors.measurements?.hasError}
        {...getOverrideProps(overrides, "measurements")}
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
          isDisabled={!(idProp || materialModelProp)}
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
              !(idProp || materialModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
