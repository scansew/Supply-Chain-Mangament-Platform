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
export declare type ZipperChainUpdateFormInputValues = {
    name?: string;
    quantity?: number;
    measurements?: number;
};
export declare type ZipperChainUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
    measurements?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ZipperChainUpdateFormOverridesProps = {
    ZipperChainUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    measurements?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ZipperChainUpdateFormProps = React.PropsWithChildren<{
    overrides?: ZipperChainUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    zipperChain?: any;
    onSubmit?: (fields: ZipperChainUpdateFormInputValues) => ZipperChainUpdateFormInputValues;
    onSuccess?: (fields: ZipperChainUpdateFormInputValues) => void;
    onError?: (fields: ZipperChainUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ZipperChainUpdateFormInputValues) => ZipperChainUpdateFormInputValues;
    onValidate?: ZipperChainUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ZipperChainUpdateForm(props: ZipperChainUpdateFormProps): React.ReactElement;
