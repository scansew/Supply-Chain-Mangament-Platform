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
export declare type BuckleCreateFormInputValues = {
    name?: string;
    number?: number;
    webbing?: number;
    binding?: number;
    otherA?: number;
    otherB?: number;
};
export declare type BuckleCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    number?: ValidationFunction<number>;
    webbing?: ValidationFunction<number>;
    binding?: ValidationFunction<number>;
    otherA?: ValidationFunction<number>;
    otherB?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BuckleCreateFormOverridesProps = {
    BuckleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    number?: PrimitiveOverrideProps<TextFieldProps>;
    webbing?: PrimitiveOverrideProps<TextFieldProps>;
    binding?: PrimitiveOverrideProps<TextFieldProps>;
    otherA?: PrimitiveOverrideProps<TextFieldProps>;
    otherB?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BuckleCreateFormProps = React.PropsWithChildren<{
    overrides?: BuckleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BuckleCreateFormInputValues) => BuckleCreateFormInputValues;
    onSuccess?: (fields: BuckleCreateFormInputValues) => void;
    onError?: (fields: BuckleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BuckleCreateFormInputValues) => BuckleCreateFormInputValues;
    onValidate?: BuckleCreateFormValidationValues;
} & React.CSSProperties>;
export default function BuckleCreateForm(props: BuckleCreateFormProps): React.ReactElement;
