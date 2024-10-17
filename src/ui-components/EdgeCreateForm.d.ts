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
export declare type EdgeCreateFormInputValues = {
    name?: string;
    quantity?: number;
};
export declare type EdgeCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EdgeCreateFormOverridesProps = {
    EdgeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EdgeCreateFormProps = React.PropsWithChildren<{
    overrides?: EdgeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EdgeCreateFormInputValues) => EdgeCreateFormInputValues;
    onSuccess?: (fields: EdgeCreateFormInputValues) => void;
    onError?: (fields: EdgeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EdgeCreateFormInputValues) => EdgeCreateFormInputValues;
    onValidate?: EdgeCreateFormValidationValues;
} & React.CSSProperties>;
export default function EdgeCreateForm(props: EdgeCreateFormProps): React.ReactElement;
