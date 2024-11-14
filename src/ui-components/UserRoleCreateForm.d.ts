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
export declare type UserRoleCreateFormInputValues = {
    name?: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type UserRoleCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserRoleCreateFormOverridesProps = {
    UserRoleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserRoleCreateFormProps = React.PropsWithChildren<{
    overrides?: UserRoleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserRoleCreateFormInputValues) => UserRoleCreateFormInputValues;
    onSuccess?: (fields: UserRoleCreateFormInputValues) => void;
    onError?: (fields: UserRoleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserRoleCreateFormInputValues) => UserRoleCreateFormInputValues;
    onValidate?: UserRoleCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserRoleCreateForm(props: UserRoleCreateFormProps): React.ReactElement;
