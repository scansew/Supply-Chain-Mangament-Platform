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
export declare type EdgeUpdateFormInputValues = {
    name?: string;
    quantity?: number;
};
export declare type EdgeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EdgeUpdateFormOverridesProps = {
    EdgeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EdgeUpdateFormProps = React.PropsWithChildren<{
    overrides?: EdgeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    edge?: any;
    onSubmit?: (fields: EdgeUpdateFormInputValues) => EdgeUpdateFormInputValues;
    onSuccess?: (fields: EdgeUpdateFormInputValues) => void;
    onError?: (fields: EdgeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EdgeUpdateFormInputValues) => EdgeUpdateFormInputValues;
    onValidate?: EdgeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EdgeUpdateForm(props: EdgeUpdateFormProps): React.ReactElement;
