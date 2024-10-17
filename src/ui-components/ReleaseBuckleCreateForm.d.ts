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
export declare type ReleaseBuckleCreateFormInputValues = {
    name?: string;
    number?: number;
};
export declare type ReleaseBuckleCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    number?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReleaseBuckleCreateFormOverridesProps = {
    ReleaseBuckleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    number?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReleaseBuckleCreateFormProps = React.PropsWithChildren<{
    overrides?: ReleaseBuckleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReleaseBuckleCreateFormInputValues) => ReleaseBuckleCreateFormInputValues;
    onSuccess?: (fields: ReleaseBuckleCreateFormInputValues) => void;
    onError?: (fields: ReleaseBuckleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReleaseBuckleCreateFormInputValues) => ReleaseBuckleCreateFormInputValues;
    onValidate?: ReleaseBuckleCreateFormValidationValues;
} & React.CSSProperties>;
export default function ReleaseBuckleCreateForm(props: ReleaseBuckleCreateFormProps): React.ReactElement;
