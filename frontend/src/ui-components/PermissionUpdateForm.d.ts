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
export declare type PermissionUpdateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type PermissionUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PermissionUpdateFormOverridesProps = {
    PermissionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PermissionUpdateFormProps = React.PropsWithChildren<{
    overrides?: PermissionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    permission?: any;
    onSubmit?: (fields: PermissionUpdateFormInputValues) => PermissionUpdateFormInputValues;
    onSuccess?: (fields: PermissionUpdateFormInputValues) => void;
    onError?: (fields: PermissionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PermissionUpdateFormInputValues) => PermissionUpdateFormInputValues;
    onValidate?: PermissionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PermissionUpdateForm(props: PermissionUpdateFormProps): React.ReactElement;
