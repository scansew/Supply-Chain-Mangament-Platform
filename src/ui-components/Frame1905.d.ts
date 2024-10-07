/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Frame1904Props } from "./Frame1904";
import { NavProps } from "./Nav";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
import { Frame1963Props } from "./Frame1963";
import { Frame1965Props } from "./Frame1965";
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
export declare type Frame1905OverridesProps = {
    Frame1905?: PrimitiveOverrideProps<FlexProps>;
    "Frame 1904"?: Frame1904Props;
    "Sider drawer options"?: PrimitiveOverrideProps<FlexProps>;
    Nav87546452?: NavProps;
    "Frame 1964"?: PrimitiveOverrideProps<FlexProps>;
    Nav65135967?: PrimitiveOverrideProps<FlexProps>;
    "Frame 1171275548"?: PrimitiveOverrideProps<FlexProps>;
    Dashboard65135969?: PrimitiveOverrideProps<FlexProps>;
    Frame65135970?: PrimitiveOverrideProps<ViewProps>;
    SVGRepo_iconCarrier65135971?: PrimitiveOverrideProps<ViewProps>;
    Vector65135972?: PrimitiveOverrideProps<IconProps>;
    Vector65135973?: PrimitiveOverrideProps<IconProps>;
    Vector65135974?: PrimitiveOverrideProps<IconProps>;
    "Admin Panel"?: PrimitiveOverrideProps<TextProps>;
    "chevron-down"?: PrimitiveOverrideProps<ViewProps>;
    "Frame 196365135977"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 196387546453"?: Frame1963Props;
    "Frame 1960"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 196365135987"?: PrimitiveOverrideProps<FlexProps>;
    Frame65135988?: PrimitiveOverrideProps<ViewProps>;
    SVGRepo_iconCarrier65135989?: PrimitiveOverrideProps<ViewProps>;
    Vector65135990?: PrimitiveOverrideProps<IconProps>;
    Group?: PrimitiveOverrideProps<ViewProps>;
    Vector65135992?: PrimitiveOverrideProps<IconProps>;
    Vector65135993?: PrimitiveOverrideProps<IconProps>;
    "Scan and Sew Dashboard"?: PrimitiveOverrideProps<TextProps>;
    "Frame 1965"?: Frame1965Props;
    Nav6325857?: PrimitiveOverrideProps<FlexProps>;
    Dashboard6325858?: PrimitiveOverrideProps<FlexProps>;
    Frame6325863?: PrimitiveOverrideProps<ViewProps>;
    SVGRepo_iconCarrier6325864?: PrimitiveOverrideProps<ViewProps>;
    Vector6325865?: PrimitiveOverrideProps<IconProps>;
    Vector6325866?: PrimitiveOverrideProps<IconProps>;
    Settings?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type Frame1905Props = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: Frame1905OverridesProps | undefined | null;
}>;
export default function Frame1905(props: Frame1905Props): React.ReactElement;
