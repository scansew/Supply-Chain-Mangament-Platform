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
export declare type MiscellaneousCreateFormInputValues = {
    miscName?: string;
    quantity?: number;
};
export declare type MiscellaneousCreateFormValidationValues = {
    miscName?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MiscellaneousCreateFormOverridesProps = {
    MiscellaneousCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    miscName?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MiscellaneousCreateFormProps = React.PropsWithChildren<{
    overrides?: MiscellaneousCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MiscellaneousCreateFormInputValues) => MiscellaneousCreateFormInputValues;
    onSuccess?: (fields: MiscellaneousCreateFormInputValues) => void;
    onError?: (fields: MiscellaneousCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MiscellaneousCreateFormInputValues) => MiscellaneousCreateFormInputValues;
    onValidate?: MiscellaneousCreateFormValidationValues;
} & React.CSSProperties>;
export default function MiscellaneousCreateForm(props: MiscellaneousCreateFormProps): React.ReactElement;
