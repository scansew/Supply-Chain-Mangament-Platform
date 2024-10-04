/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Frame1963OverridesProps = {
    Frame1963?: PrimitiveOverrideProps<FlexProps>;
    Frame?: PrimitiveOverrideProps<ViewProps>;
    SVGRepo_iconCarrier?: PrimitiveOverrideProps<ViewProps>;
    Vector65135981?: PrimitiveOverrideProps<IconProps>;
    Group?: PrimitiveOverrideProps<ViewProps>;
    Vector65135983?: PrimitiveOverrideProps<IconProps>;
    Vector65135984?: PrimitiveOverrideProps<IconProps>;
    "Company Dashboard"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type Frame1963Props = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: Frame1963OverridesProps | undefined | null;
}>;
export default function Frame1963(props: Frame1963Props): React.ReactElement;
