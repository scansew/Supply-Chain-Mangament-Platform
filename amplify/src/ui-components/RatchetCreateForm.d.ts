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
export declare type RatchetCreateFormInputValues = {
    name?: string;
    number?: number;
    webbing?: number;
    binding?: number;
    otherA?: number;
    otherB?: number;
};
export declare type RatchetCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    number?: ValidationFunction<number>;
    webbing?: ValidationFunction<number>;
    binding?: ValidationFunction<number>;
    otherA?: ValidationFunction<number>;
    otherB?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RatchetCreateFormOverridesProps = {
    RatchetCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    number?: PrimitiveOverrideProps<TextFieldProps>;
    webbing?: PrimitiveOverrideProps<TextFieldProps>;
    binding?: PrimitiveOverrideProps<TextFieldProps>;
    otherA?: PrimitiveOverrideProps<TextFieldProps>;
    otherB?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RatchetCreateFormProps = React.PropsWithChildren<{
    overrides?: RatchetCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RatchetCreateFormInputValues) => RatchetCreateFormInputValues;
    onSuccess?: (fields: RatchetCreateFormInputValues) => void;
    onError?: (fields: RatchetCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RatchetCreateFormInputValues) => RatchetCreateFormInputValues;
    onValidate?: RatchetCreateFormValidationValues;
} & React.CSSProperties>;
export default function RatchetCreateForm(props: RatchetCreateFormProps): React.ReactElement;
