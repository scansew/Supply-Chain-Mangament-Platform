/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WorkOrderNumberCreateFormInputValues = {
    counterName?: string;
    currentValue?: number;
};
export declare type WorkOrderNumberCreateFormValidationValues = {
    counterName?: ValidationFunction<string>;
    currentValue?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkOrderNumberCreateFormOverridesProps = {
    WorkOrderNumberCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    counterName?: PrimitiveOverrideProps<TextFieldProps>;
    currentValue?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorkOrderNumberCreateFormProps = React.PropsWithChildren<{
    overrides?: WorkOrderNumberCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WorkOrderNumberCreateFormInputValues) => WorkOrderNumberCreateFormInputValues;
    onSuccess?: (fields: WorkOrderNumberCreateFormInputValues) => void;
    onError?: (fields: WorkOrderNumberCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkOrderNumberCreateFormInputValues) => WorkOrderNumberCreateFormInputValues;
    onValidate?: WorkOrderNumberCreateFormValidationValues;
} & React.CSSProperties>;
export default function WorkOrderNumberCreateForm(props: WorkOrderNumberCreateFormProps): React.ReactElement;
