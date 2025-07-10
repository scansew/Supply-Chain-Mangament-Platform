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
export declare type PermissionCreateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type PermissionCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PermissionCreateFormOverridesProps = {
    PermissionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PermissionCreateFormProps = React.PropsWithChildren<{
    overrides?: PermissionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PermissionCreateFormInputValues) => PermissionCreateFormInputValues;
    onSuccess?: (fields: PermissionCreateFormInputValues) => void;
    onError?: (fields: PermissionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PermissionCreateFormInputValues) => PermissionCreateFormInputValues;
    onValidate?: PermissionCreateFormValidationValues;
} & React.CSSProperties>;
export default function PermissionCreateForm(props: PermissionCreateFormProps): React.ReactElement;
