/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, ImageProps } from "@aws-amplify/ui-react";
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
export declare type Frame1904OverridesProps = {
    Frame1904?: PrimitiveOverrideProps<FlexProps>;
    "Snipaste_2024-05-01_17-53-33-removebg-preview 1"?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type Frame1904Props = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: Frame1904OverridesProps | undefined | null;
}>;
export default function Frame1904(props: Frame1904Props): React.ReactElement;
