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
export declare type UserRoleUpdateFormInputValues = {
    name?: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type UserRoleUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserRoleUpdateFormOverridesProps = {
    UserRoleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserRoleUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserRoleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userRole?: any;
    onSubmit?: (fields: UserRoleUpdateFormInputValues) => UserRoleUpdateFormInputValues;
    onSuccess?: (fields: UserRoleUpdateFormInputValues) => void;
    onError?: (fields: UserRoleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserRoleUpdateFormInputValues) => UserRoleUpdateFormInputValues;
    onValidate?: UserRoleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserRoleUpdateForm(props: UserRoleUpdateFormProps): React.ReactElement;
