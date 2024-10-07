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
export declare type Frame1965OverridesProps = {
    Frame1965?: PrimitiveOverrideProps<FlexProps>;
    Nav?: PrimitiveOverrideProps<FlexProps>;
    "Frame 1171275548"?: PrimitiveOverrideProps<FlexProps>;
    Dashboard?: PrimitiveOverrideProps<FlexProps>;
    "Uploaded to svgrepo.com"?: PrimitiveOverrideProps<ViewProps>;
    SVGRepo_iconCarrier?: PrimitiveOverrideProps<ViewProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
    "Work Order"?: PrimitiveOverrideProps<TextProps>;
    "chevron-down"?: PrimitiveOverrideProps<ViewProps>;
} & EscapeHatchProps;
export declare type Frame1965Props = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: Frame1965OverridesProps | undefined | null;
}>;
export default function Frame1965(props: Frame1965Props): React.ReactElement;
