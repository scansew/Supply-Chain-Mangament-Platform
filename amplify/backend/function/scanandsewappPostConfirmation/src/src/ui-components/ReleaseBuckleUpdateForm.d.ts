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
export declare type ReleaseBuckleUpdateFormInputValues = {
    name?: string;
    number?: number;
};
export declare type ReleaseBuckleUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    number?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReleaseBuckleUpdateFormOverridesProps = {
    ReleaseBuckleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    number?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReleaseBuckleUpdateFormProps = React.PropsWithChildren<{
    overrides?: ReleaseBuckleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    releaseBuckle?: any;
    onSubmit?: (fields: ReleaseBuckleUpdateFormInputValues) => ReleaseBuckleUpdateFormInputValues;
    onSuccess?: (fields: ReleaseBuckleUpdateFormInputValues) => void;
    onError?: (fields: ReleaseBuckleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReleaseBuckleUpdateFormInputValues) => ReleaseBuckleUpdateFormInputValues;
    onValidate?: ReleaseBuckleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ReleaseBuckleUpdateForm(props: ReleaseBuckleUpdateFormProps): React.ReactElement;
