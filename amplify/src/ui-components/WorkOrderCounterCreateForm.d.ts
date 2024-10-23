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
export declare type WorkOrderCounterCreateFormInputValues = {
    counterName?: string;
    currentValue?: number;
};
export declare type WorkOrderCounterCreateFormValidationValues = {
    counterName?: ValidationFunction<string>;
    currentValue?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkOrderCounterCreateFormOverridesProps = {
    WorkOrderCounterCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    counterName?: PrimitiveOverrideProps<TextFieldProps>;
    currentValue?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorkOrderCounterCreateFormProps = React.PropsWithChildren<{
    overrides?: WorkOrderCounterCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WorkOrderCounterCreateFormInputValues) => WorkOrderCounterCreateFormInputValues;
    onSuccess?: (fields: WorkOrderCounterCreateFormInputValues) => void;
    onError?: (fields: WorkOrderCounterCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkOrderCounterCreateFormInputValues) => WorkOrderCounterCreateFormInputValues;
    onValidate?: WorkOrderCounterCreateFormValidationValues;
} & React.CSSProperties>;
export default function WorkOrderCounterCreateForm(props: WorkOrderCounterCreateFormProps): React.ReactElement;
