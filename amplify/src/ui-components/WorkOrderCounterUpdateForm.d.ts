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
export declare type WorkOrderCounterUpdateFormInputValues = {
    counterName?: string;
    currentValue?: number;
};
export declare type WorkOrderCounterUpdateFormValidationValues = {
    counterName?: ValidationFunction<string>;
    currentValue?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkOrderCounterUpdateFormOverridesProps = {
    WorkOrderCounterUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    counterName?: PrimitiveOverrideProps<TextFieldProps>;
    currentValue?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorkOrderCounterUpdateFormProps = React.PropsWithChildren<{
    overrides?: WorkOrderCounterUpdateFormOverridesProps | undefined | null;
} & {
    counterName?: string;
    workOrderCounter?: any;
    onSubmit?: (fields: WorkOrderCounterUpdateFormInputValues) => WorkOrderCounterUpdateFormInputValues;
    onSuccess?: (fields: WorkOrderCounterUpdateFormInputValues) => void;
    onError?: (fields: WorkOrderCounterUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkOrderCounterUpdateFormInputValues) => WorkOrderCounterUpdateFormInputValues;
    onValidate?: WorkOrderCounterUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WorkOrderCounterUpdateForm(props: WorkOrderCounterUpdateFormProps): React.ReactElement;
