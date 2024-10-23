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
export declare type MiscellaneousUpdateFormInputValues = {
    miscName?: string;
    quantity?: number;
};
export declare type MiscellaneousUpdateFormValidationValues = {
    miscName?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MiscellaneousUpdateFormOverridesProps = {
    MiscellaneousUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    miscName?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MiscellaneousUpdateFormProps = React.PropsWithChildren<{
    overrides?: MiscellaneousUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    miscellaneous?: any;
    onSubmit?: (fields: MiscellaneousUpdateFormInputValues) => MiscellaneousUpdateFormInputValues;
    onSuccess?: (fields: MiscellaneousUpdateFormInputValues) => void;
    onError?: (fields: MiscellaneousUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MiscellaneousUpdateFormInputValues) => MiscellaneousUpdateFormInputValues;
    onValidate?: MiscellaneousUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MiscellaneousUpdateForm(props: MiscellaneousUpdateFormProps): React.ReactElement;
