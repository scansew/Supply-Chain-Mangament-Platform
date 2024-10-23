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
export declare type DRingUpdateFormInputValues = {
    dRingTotal?: number;
    name?: string;
    number?: number;
    webbing?: number;
    strap?: number;
};
export declare type DRingUpdateFormValidationValues = {
    dRingTotal?: ValidationFunction<number>;
    name?: ValidationFunction<string>;
    number?: ValidationFunction<number>;
    webbing?: ValidationFunction<number>;
    strap?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DRingUpdateFormOverridesProps = {
    DRingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    dRingTotal?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    number?: PrimitiveOverrideProps<TextFieldProps>;
    webbing?: PrimitiveOverrideProps<TextFieldProps>;
    strap?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DRingUpdateFormProps = React.PropsWithChildren<{
    overrides?: DRingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    dRing?: any;
    onSubmit?: (fields: DRingUpdateFormInputValues) => DRingUpdateFormInputValues;
    onSuccess?: (fields: DRingUpdateFormInputValues) => void;
    onError?: (fields: DRingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DRingUpdateFormInputValues) => DRingUpdateFormInputValues;
    onValidate?: DRingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DRingUpdateForm(props: DRingUpdateFormProps): React.ReactElement;
