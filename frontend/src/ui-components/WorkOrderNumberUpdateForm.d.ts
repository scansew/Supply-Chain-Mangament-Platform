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
export declare type WorkOrderNumberUpdateFormInputValues = {
    counterName?: string;
    currentValue?: number;
};
export declare type WorkOrderNumberUpdateFormValidationValues = {
    counterName?: ValidationFunction<string>;
    currentValue?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkOrderNumberUpdateFormOverridesProps = {
    WorkOrderNumberUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    counterName?: PrimitiveOverrideProps<TextFieldProps>;
    currentValue?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorkOrderNumberUpdateFormProps = React.PropsWithChildren<{
    overrides?: WorkOrderNumberUpdateFormOverridesProps | undefined | null;
} & {
    counterName?: string;
    workOrderNumber?: any;
    onSubmit?: (fields: WorkOrderNumberUpdateFormInputValues) => WorkOrderNumberUpdateFormInputValues;
    onSuccess?: (fields: WorkOrderNumberUpdateFormInputValues) => void;
    onError?: (fields: WorkOrderNumberUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkOrderNumberUpdateFormInputValues) => WorkOrderNumberUpdateFormInputValues;
    onValidate?: WorkOrderNumberUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WorkOrderNumberUpdateForm(props: WorkOrderNumberUpdateFormProps): React.ReactElement;
