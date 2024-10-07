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
export declare type NavOverridesProps = {
    Nav?: PrimitiveOverrideProps<FlexProps>;
    Dashboard44711384?: PrimitiveOverrideProps<FlexProps>;
    Frame?: PrimitiveOverrideProps<ViewProps>;
    SVGRepo_iconCarrier?: PrimitiveOverrideProps<ViewProps>;
    Vector6329885?: PrimitiveOverrideProps<IconProps>;
    Vector6329886?: PrimitiveOverrideProps<IconProps>;
    Vector6329887?: PrimitiveOverrideProps<IconProps>;
    Vector6329888?: PrimitiveOverrideProps<IconProps>;
    Vector6329889?: PrimitiveOverrideProps<IconProps>;
    Dashboard44711386?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type NavProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: NavOverridesProps | undefined | null;
}>;
export default function Nav(props: NavProps): React.ReactElement;
