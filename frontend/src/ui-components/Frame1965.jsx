/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
export default function Frame1965(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="8px"
      direction="column"
      width="168px"
      height="unset"
      justifyContent="center"
      alignItems="flex-start"
      position="relative"
      borderRadius="8px"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Frame1965")}
      {...rest}
    >
      <Flex
        gap="8px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="flex-start"
        overflow="hidden"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        borderRadius="12px 12px 0px 0px"
        padding="12px 8px 12px 8px"
        {...getOverrideProps(overrides, "Nav")}
      >
        <Flex
          gap="8px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="space-between"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 1171275548")}
        >
          <Flex
            gap="4px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="center"
            alignItems="center"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Dashboard")}
          >
            <View
              width="24px"
              height="24px"
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              overflow="hidden"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "Uploaded to svgrepo.com")}
            >
              <View
                padding="0px 0px 0px 0px"
                width="18px"
                height="18px"
                display="block"
                gap="unset"
                alignItems="unset"
                justifyContent="unset"
                position="absolute"
                top="12.5%"
                bottom="12.5%"
                left="12.5%"
                right="12.5%"
                {...getOverrideProps(overrides, "SVGRepo_iconCarrier")}
              >
                <Icon
                  width="18px"
                  height="18px"
                  viewBox={{ minX: 0, minY: 0, width: 18, height: 18 }}
                  paths={[
                    {
                      d: "M16.5 3L12.75 3L12.75 1.5C12.75 0.675 12.075 0 11.25 0L6.75 0C5.925 0 5.25 0.675 5.25 1.5L5.25 3L1.5 3C0.675 3 0 3.675 0 4.5L0 16.5C0 17.325 0.675 18 1.5 18L16.5 18C17.325 18 18 17.325 18 16.5L18 4.5C18 3.675 17.325 3 16.5 3ZM6.75 1.5L11.25 1.5L11.25 3L6.75 3L6.75 1.5ZM9.75 4.5L9.75 9L8.25 9L8.25 4.5L9.75 4.5ZM16.5 16.5L1.5 16.5L1.5 14.25L16.5 14.25L16.5 16.5ZM16.5 12.75L1.5 12.75L1.5 4.5L6.75 4.5L6.75 9C6.75 9.825 7.425 10.5 8.25 10.5L9.75 10.5C10.575 10.5 11.25 9.825 11.25 9L11.25 4.5L16.5 4.5L16.5 12.75Z",
                      fill: "rgba(0,0,0,1)",
                      fillRule: "nonzero",
                    },
                  ]}
                  display="block"
                  gap="unset"
                  alignItems="unset"
                  justifyContent="unset"
                  position="absolute"
                  top="0%"
                  bottom="0%"
                  left="0%"
                  right="0%"
                  {...getOverrideProps(overrides, "Vector")}
                ></Icon>
              </View>
            </View>
            <Text
              fontFamily="Public Sans"
              fontSize="14px"
              fontWeight="400"
              color="rgba(0,0,0,1)"
              lineHeight="20px"
              textAlign="left"
              display="block"
              direction="column"
              justifyContent="unset"
              width="unset"
              height="unset"
              gap="unset"
              alignItems="unset"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children="Work Order"
              {...getOverrideProps(overrides, "Work Order")}
            ></Text>
          </Flex>
          <View
            width="24px"
            height="24px"
            {...getOverrideProps(overrides, "chevron-down")}
          ></View>
        </Flex>
      </Flex>
    </Flex>
  );
}
