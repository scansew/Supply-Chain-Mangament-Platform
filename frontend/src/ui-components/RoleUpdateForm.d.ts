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
export declare type RoleUpdateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type RoleUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RoleUpdateFormOverridesProps = {
    RoleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RoleUpdateFormProps = React.PropsWithChildren<{
    overrides?: RoleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    role?: any;
    onSubmit?: (fields: RoleUpdateFormInputValues) => RoleUpdateFormInputValues;
    onSuccess?: (fields: RoleUpdateFormInputValues) => void;
    onError?: (fields: RoleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RoleUpdateFormInputValues) => RoleUpdateFormInputValues;
    onValidate?: RoleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RoleUpdateForm(props: RoleUpdateFormProps): React.ReactElement;
