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
export declare type ZipperUpdateFormInputValues = {
    name?: string;
    size?: number;
    number?: number;
};
export declare type ZipperUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    size?: ValidationFunction<number>;
    number?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ZipperUpdateFormOverridesProps = {
    ZipperUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    size?: PrimitiveOverrideProps<TextFieldProps>;
    number?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ZipperUpdateFormProps = React.PropsWithChildren<{
    overrides?: ZipperUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    zipper?: any;
    onSubmit?: (fields: ZipperUpdateFormInputValues) => ZipperUpdateFormInputValues;
    onSuccess?: (fields: ZipperUpdateFormInputValues) => void;
    onError?: (fields: ZipperUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ZipperUpdateFormInputValues) => ZipperUpdateFormInputValues;
    onValidate?: ZipperUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ZipperUpdateForm(props: ZipperUpdateFormProps): React.ReactElement;
