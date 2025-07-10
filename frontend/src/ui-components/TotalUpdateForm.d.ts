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
export declare type TotalUpdateFormInputValues = {
    name?: string;
    quantity?: number;
};
export declare type TotalUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TotalUpdateFormOverridesProps = {
    TotalUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TotalUpdateFormProps = React.PropsWithChildren<{
    overrides?: TotalUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    total?: any;
    onSubmit?: (fields: TotalUpdateFormInputValues) => TotalUpdateFormInputValues;
    onSuccess?: (fields: TotalUpdateFormInputValues) => void;
    onError?: (fields: TotalUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TotalUpdateFormInputValues) => TotalUpdateFormInputValues;
    onValidate?: TotalUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TotalUpdateForm(props: TotalUpdateFormProps): React.ReactElement;
