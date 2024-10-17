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
export declare type ZipperCreateFormInputValues = {
    name?: string;
    size?: number;
    number?: number;
};
export declare type ZipperCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    size?: ValidationFunction<number>;
    number?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ZipperCreateFormOverridesProps = {
    ZipperCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    size?: PrimitiveOverrideProps<TextFieldProps>;
    number?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ZipperCreateFormProps = React.PropsWithChildren<{
    overrides?: ZipperCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ZipperCreateFormInputValues) => ZipperCreateFormInputValues;
    onSuccess?: (fields: ZipperCreateFormInputValues) => void;
    onError?: (fields: ZipperCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ZipperCreateFormInputValues) => ZipperCreateFormInputValues;
    onValidate?: ZipperCreateFormValidationValues;
} & React.CSSProperties>;
export default function ZipperCreateForm(props: ZipperCreateFormProps): React.ReactElement;
