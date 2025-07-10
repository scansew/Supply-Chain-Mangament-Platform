/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import Frame1904 from "./Frame1904";
import Nav from "./Nav";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
import Frame1963 from "./Frame1963";
import Frame1965 from "./Frame1965";
export default function Frame1905(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="36px"
      direction="column"
      width="200px"
      height="831px"
      justifyContent="flex-start"
      alignItems="center"
      position="relative"
      border="1px SOLID rgba(203,213,225,1)"
      padding="31px 15px 31px 15px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "Frame1905")}
      {...rest}
    >
      <Frame1904
        display="flex"
        gap="12px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 30px 0px 30px"
        {...getOverrideProps(overrides, "Frame 1904")}
      ></Frame1904>
      <Flex
        gap="8px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Sider drawer options")}
      >
        <Nav
          display="flex"
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
          borderRadius="8px"
          padding="12px 8px 12px 8px"
          {...getOverrideProps(overrides, "Nav87546452")}
        ></Nav>
        <Flex
          gap="8px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="flex-start"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          borderRadius="8px"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(248,250,252,1)"
          {...getOverrideProps(overrides, "Frame 1964")}
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
            padding="12px 8px 8px 8px"
            {...getOverrideProps(overrides, "Nav65135967")}
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
                gap="2px"
                direction="row"
                width="unset"
                height="unset"
                justifyContent="center"
                alignItems="center"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                {...getOverrideProps(overrides, "Dashboard65135969")}
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
                  {...getOverrideProps(overrides, "Frame65135970")}
                >
                  <View
                    padding="0px 0px 0px 0px"
                    width="18.17px"
                    height="20px"
                    display="block"
                    gap="unset"
                    alignItems="unset"
                    justifyContent="unset"
                    position="absolute"
                    top="8.33%"
                    bottom="8.33%"
                    left="12.13%"
                    right="12.17%"
                    {...getOverrideProps(
                      overrides,
                      "SVGRepo_iconCarrier65135971"
                    )}
                  >
                    <Icon
                      width="18.17px"
                      height="20px"
                      viewBox={{
                        minX: 0,
                        minY: 0,
                        width: 18.16996955871582,
                        height: 20,
                      }}
                      paths={[
                        {
                          d: "M16.6 16.15L16.975 16.7995L16.9799 16.7966L16.6 16.15ZM10.66 19.58L11.035 20.2295L11.035 20.2295L10.66 19.58ZM7.50997 19.58L7.13492 20.2295L7.13787 20.2312L7.50997 19.58ZM1.57 16.15L1.94505 15.5005L1.94499 15.5005L1.57 16.15ZM1.57 3.84999L1.19494 3.20048L1.19003 3.20337L1.57 3.84999ZM7.50997 0.42L7.13498 -0.229528L7.13493 -0.229493L7.50997 0.42ZM10.66 0.42L11.035 -0.229501L11.0321 -0.231182L10.66 0.42ZM16.6 3.84999L16.98 3.20335L16.975 3.2005L16.6 3.84999ZM17.42 6.58003L17.42 13.42L18.92 13.42L18.92 6.58003L17.42 6.58003ZM17.42 13.42C17.42 14.2712 16.9633 15.0666 16.22 15.5034L16.9799 16.7966C18.1767 16.0934 18.92 14.8088 18.92 13.42L17.42 13.42ZM16.2249 15.5005L10.2849 18.9305L11.035 20.2295L16.975 16.7995L16.2249 15.5005ZM10.285 18.9305C9.54821 19.3558 8.63269 19.3577 7.88207 18.9288L7.13787 20.2312C8.34725 20.9223 9.83173 20.9242 11.035 20.2295L10.285 18.9305ZM7.88502 18.9305L1.94505 15.5005L1.19495 16.7995L7.13492 20.2295L7.88502 18.9305ZM1.94499 15.5005C1.20837 15.0752 0.75 14.2836 0.75 13.42L-0.75 13.42C-0.75 14.8164 -0.00837007 16.1048 1.19502 16.7995L1.94499 15.5005ZM0.75 13.42L0.75 6.58003L-0.75 6.58003L-0.75 13.42L0.75 13.42ZM0.75 6.58003C0.75 5.72881 1.20672 4.93337 1.94997 4.49661L1.19003 3.20337C-0.00671656 3.90661 -0.75 5.19125 -0.75 6.58003L0.75 6.58003ZM1.94504 4.49948L7.88502 1.06949L7.13493 -0.229493L1.19496 3.2005L1.94504 4.49948ZM7.88496 1.06953C8.62173 0.644172 9.53725 0.642258 10.2879 1.07118L11.0321 -0.231182C9.82269 -0.922258 8.33821 -0.924172 7.13498 -0.229528L7.88496 1.06953ZM10.2849 1.06949L16.2249 4.49948L16.975 3.2005L11.035 -0.229494L10.2849 1.06949ZM16.22 4.49661C16.9644 4.93405 17.42 5.72013 17.42 6.58003L18.92 6.58003C18.92 5.17993 18.1755 3.90593 16.9799 3.20337L16.22 4.49661Z",
                          stroke: "rgba(0,0,0,1)",
                          fillRule: "nonzero",
                          strokeLinejoin: "round",
                          strokeWidth: 1,
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
                      {...getOverrideProps(overrides, "Vector65135972")}
                    ></Icon>
                    <Icon
                      width="4.66px"
                      height="4.66px"
                      viewBox={{
                        minX: 0,
                        minY: 0,
                        width: 4.65995979309082,
                        height: 4.66001033782959,
                      }}
                      paths={[
                        {
                          d: "M2.32996 5.41001C4.03111 5.41001 5.40996 4.03095 5.40996 2.32995L3.90996 2.32995C3.90996 3.20261 3.20261 3.91001 2.32996 3.91001L2.32996 5.41001ZM5.40996 2.32995C5.40996 0.628913 4.03107 -0.75 2.32996 -0.75L2.32996 0.75C3.20265 0.75 3.90996 1.45735 3.90996 2.32995L5.40996 2.32995ZM2.32996 -0.75C0.628954 -0.75 -0.75 0.628909 -0.75 2.32995L0.75 2.32995C0.75 1.45735 1.45737 0.75 2.32996 0.75L2.32996 -0.75ZM-0.75 2.32995C-0.75 4.03096 0.628911 5.41001 2.32996 5.41001L2.32996 3.91001C1.45741 3.91001 0.75 3.2026 0.75 2.32995L-0.75 2.32995Z",
                          stroke: "rgba(0,0,0,1)",
                          fillRule: "nonzero",
                          strokeLinejoin: "round",
                          strokeWidth: 1,
                        },
                      ]}
                      display="block"
                      gap="unset"
                      alignItems="unset"
                      justifyContent="unset"
                      position="absolute"
                      top="21.7%"
                      bottom="55%"
                      left="37.2%"
                      right="37.15%"
                      {...getOverrideProps(overrides, "Vector65135973")}
                    ></Icon>
                    <Icon
                      width="8px"
                      height="3.26px"
                      viewBox={{
                        minX: 0,
                        minY: 0,
                        width: 8,
                        height: 3.2600011825561523,
                      }}
                      paths={[
                        {
                          d: "M7.25 3.26C7.25 3.67421 7.58579 4.01 8 4.01C8.41421 4.01 8.75 3.67421 8.75 3.26L7.25 3.26ZM-0.75 3.26C-0.75 3.67421 -0.414214 4.01 0 4.01C0.414214 4.01 0.75 3.67421 0.75 3.26L-0.75 3.26ZM8.75 3.26C8.75 0.909823 6.4737 -0.75 4 -0.75L4 0.75C5.9463 0.75 7.25 2.01018 7.25 3.26L8.75 3.26ZM4 -0.75C1.5263 -0.75 -0.75 0.909823 -0.75 3.26L0.75 3.26C0.75 2.01018 2.0537 0.75 4 0.75L4 -0.75Z",
                          stroke: "rgba(0,0,0,1)",
                          fillRule: "nonzero",
                          strokeLinejoin: "round",
                          strokeWidth: 1,
                        },
                      ]}
                      display="block"
                      gap="unset"
                      alignItems="unset"
                      justifyContent="unset"
                      position="absolute"
                      top="57%"
                      bottom="26.7%"
                      left="28.01%"
                      right="27.96%"
                      {...getOverrideProps(overrides, "Vector65135974")}
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
                  children="Admin Panel"
                  {...getOverrideProps(overrides, "Admin Panel")}
                ></Text>
              </Flex>
              <View
                width="24px"
                height="24px"
                {...getOverrideProps(overrides, "chevron-down")}
              ></View>
            </Flex>
          </Flex>
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
            padding="0px 8px 0px 8px"
            {...getOverrideProps(overrides, "Frame 196365135977")}
          >
            <Frame1963
              display="flex"
              gap="8px"
              direction="row"
              width="unset"
              height="64px"
              justifyContent="flex-start"
              alignItems="center"
              overflow="hidden"
              grow="1"
              shrink="1"
              basis="0"
              position="relative"
              borderRadius="8px"
              padding="12px 8px 12px 8px"
              backgroundColor="rgba(55,98,190,1)"
              {...getOverrideProps(overrides, "Frame 196387546453")}
            ></Frame1963>
          </Flex>
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
            padding="0px 8px 8px 8px"
            {...getOverrideProps(overrides, "Frame 1960")}
          >
            <Flex
              gap="8px"
              direction="row"
              width="unset"
              height="unset"
              justifyContent="flex-start"
              alignItems="center"
              overflow="hidden"
              grow="1"
              shrink="1"
              basis="0"
              alignSelf="stretch"
              position="relative"
              borderRadius="8px"
              padding="8px 8px 8px 8px"
              {...getOverrideProps(overrides, "Frame 196365135987")}
            >
              <View
                width="20px"
                height="20px"
                display="block"
                gap="unset"
                alignItems="unset"
                justifyContent="unset"
                overflow="hidden"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                {...getOverrideProps(overrides, "Frame65135988")}
              >
                <View
                  padding="0px 0px 0px 0px"
                  width="9.58px"
                  height="13.75px"
                  display="block"
                  gap="unset"
                  alignItems="unset"
                  justifyContent="unset"
                  position="absolute"
                  top="15.63%"
                  bottom="15.63%"
                  left="26.04%"
                  right="26.04%"
                  {...getOverrideProps(
                    overrides,
                    "SVGRepo_iconCarrier65135989"
                  )}
                >
                  <Icon
                    width="9.58px"
                    height="5.42px"
                    viewBox={{
                      minX: 0,
                      minY: 0,
                      width: 5.416644096374512,
                      height: 9.583311080932617,
                    }}
                    paths={[
                      {
                        d: "M0.183056 5.23358C-0.0610188 4.98953 -0.0610188 4.5938 0.183056 4.34972L4.34975 0.183056C4.59383 -0.0610188 4.9895 -0.0610188 5.23358 0.183056L9.40025 4.34972C9.64433 4.5938 9.64433 4.98953 9.40025 5.23358C9.15617 5.47766 8.7605 5.47766 8.51641 5.23358L4.79166 1.50888L1.06694 5.23358C0.822865 5.47766 0.427131 5.47766 0.183056 5.23358Z",
                        fill: "rgba(0,0,0,1)",
                        fillRule: "evenodd",
                      },
                    ]}
                    display="block"
                    gap="unset"
                    alignItems="unset"
                    justifyContent="unset"
                    position="absolute"
                    top="0%"
                    bottom="60.61%"
                    left="0%"
                    right="0%"
                    {...getOverrideProps(overrides, "Vector65135990")}
                  ></Icon>
                  <View
                    padding="0px 0px 0px 0px"
                    width="5.42px"
                    height="13.75px"
                    display="block"
                    gap="unset"
                    alignItems="unset"
                    justifyContent="unset"
                    position="absolute"
                    top="0%"
                    bottom="0%"
                    left="43.48%"
                    right="0%"
                    {...getOverrideProps(overrides, "Group")}
                  >
                    <Icon
                      width="5.42px"
                      height="12.24px"
                      viewBox={{
                        minX: 0,
                        minY: 0,
                        width: 12.241117477416992,
                        height: 5.416666507720947,
                      }}
                      paths={[
                        {
                          d: "M0 7.44945C0 8.24395 0.233167 9.4217 0.951083 10.4188C1.692 11.4478 2.92133 12.2411 4.79167 12.2411C5.13683 12.2411 5.41667 11.9613 5.41667 11.6161C5.41667 11.271 5.13683 10.9911 4.79167 10.9911C3.32867 10.9911 2.47467 10.3955 1.96558 9.68845C1.4335 8.94945 1.25 8.04387 1.25 7.44945L1.25 0.625L0.625 0L0 0.625L0 7.44945Z",
                          fill: "rgba(0,0,0,1)",
                          fillRule: "nonzero",
                        },
                      ]}
                      display="block"
                      gap="unset"
                      alignItems="unset"
                      justifyContent="unset"
                      position="absolute"
                      top="10.97%"
                      bottom="0%"
                      left="0%"
                      right="0%"
                      {...getOverrideProps(overrides, "Vector65135992")}
                    ></Icon>
                    <Icon
                      width="0.39px"
                      height="0.04px"
                      viewBox={{
                        minX: 0,
                        minY: 0,
                        width: 0.04245837405323982,
                        height: 0.3915826380252838,
                      }}
                      paths={[
                        {
                          d: "M0 0.0219917C0.12875 -0.0130416 0.266416 -0.00621662 0.391583 0.0424584C0.321333 0.0150417 0.24475 0 0.16475 0C0.10775 0 0.0525 0.0076584 0 0.0219917Z",
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
                      bottom="99.69%"
                      left="8.5%"
                      right="84.27%"
                      {...getOverrideProps(overrides, "Vector65135993")}
                    ></Icon>
                  </View>
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
                grow="1"
                shrink="1"
                basis="0"
                position="relative"
                padding="0px 0px 0px 0px"
                whiteSpace="pre-wrap"
                children="Scan and Sew Dashboard"
                {...getOverrideProps(overrides, "Scan and Sew Dashboard")}
              ></Text>
            </Flex>
          </Flex>
        </Flex>
        <Frame1965
          display="flex"
          gap="8px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="flex-start"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          borderRadius="8px"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 1965")}
        ></Frame1965>
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
          borderRadius="0px 8px 8px 0px"
          padding="12px 8px 12px 8px"
          {...getOverrideProps(overrides, "Nav6325857")}
        >
          <Flex
            gap="8px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="center"
            alignItems="center"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Dashboard6325858")}
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
              {...getOverrideProps(overrides, "Frame6325863")}
            >
              <View
                padding="0px 0px 0px 0px"
                width="18px"
                height="20px"
                display="block"
                gap="unset"
                alignItems="unset"
                justifyContent="unset"
                position="absolute"
                top="8.33%"
                bottom="8.33%"
                left="12.5%"
                right="12.5%"
                {...getOverrideProps(overrides, "SVGRepo_iconCarrier6325864")}
              >
                <Icon
                  width="18px"
                  height="20px"
                  viewBox={{ minX: 0, minY: 0, width: 18, height: 20 }}
                  paths={[
                    {
                      d: "M4.84308 1.80211L4.46092 1.15678L4.46091 1.15678L4.84308 1.80211ZM13.1569 1.80211L12.7747 2.44744L12.7747 2.44745L13.1569 1.80211ZM13.8431 2.20846L14.2253 1.56313L14.2253 1.56312L13.8431 2.20846ZM13.8431 17.7915L13.4609 17.1462L13.4609 17.1462L13.8431 17.7915ZM13.1569 18.1979L13.5391 18.8432L13.5391 18.8432L13.1569 18.1979ZM4.84308 18.1979L4.46088 18.8432L4.46092 18.8432L4.84308 18.1979ZM4.15692 17.7915L4.53912 17.1462L4.53908 17.1462L4.15692 17.7915ZM4.15692 2.20846L4.53908 2.85379L4.53909 2.85379L4.15692 2.20846ZM5.22524 2.44744C6.25238 1.83917 6.97607 1.41161 7.58067 1.13069C8.17022 0.856758 8.59077 0.75 9 0.75L9 -0.75C8.29543 -0.75 7.65188 -0.556408 6.9486 -0.229638C6.26037 0.0901428 5.4625 0.563642 4.46092 1.15678L5.22524 2.44744ZM9 0.75C9.40923 0.75 9.82978 0.856758 10.4193 1.13069C11.0239 1.41161 11.7476 1.83917 12.7747 2.44744L13.5391 1.15678C12.5375 0.563644 11.7396 0.0901437 11.0514 -0.229638C10.3481 -0.556408 9.70457 -0.75 9 -0.75L9 0.75ZM12.7747 2.44745L13.4609 2.8538L14.2253 1.56312L13.5391 1.15677L12.7747 2.44745ZM13.4609 2.85379C14.4879 3.46198 15.211 3.89115 15.7508 4.288C16.2768 4.67468 16.581 4.99746 16.7895 5.36787L18.0967 4.63213C17.7483 4.01311 17.2669 3.54083 16.6393 3.07944C16.0255 2.62824 15.227 2.15635 14.2253 1.56313L13.4609 2.85379ZM16.7895 5.36787C16.9986 5.73928 17.12 6.17389 17.1838 6.83856C17.2492 7.51885 17.25 8.37804 17.25 9.5937L18.75 9.5937C18.75 8.4065 18.7508 7.46355 18.6769 6.69507C18.6016 5.91096 18.4445 5.25015 18.0967 4.63213L16.7895 5.36787ZM17.25 9.5937L17.25 10.4063L18.75 10.4063L18.75 9.5937L17.25 9.5937ZM17.25 10.4063C17.25 11.622 17.2492 12.4812 17.1838 13.1615C17.12 13.8261 16.9986 14.2607 16.7895 14.6321L18.0967 15.3679C18.4445 14.7499 18.6016 14.0891 18.6769 13.305C18.7508 12.5365 18.75 11.5935 18.75 10.4063L17.25 10.4063ZM16.7895 14.6321C16.581 15.0025 16.2768 15.3253 15.7508 15.712C15.211 16.1088 14.4879 16.538 13.4609 17.1462L14.2253 18.4368C15.227 17.8436 16.0255 17.3717 16.6393 16.9205C17.2669 16.4592 17.7483 15.9869 18.0967 15.3679L16.7895 14.6321ZM13.4609 17.1462L12.7747 17.5526L13.5391 18.8432L14.2253 18.4368L13.4609 17.1462ZM12.7747 17.5526C11.7476 18.1608 11.0239 18.5884 10.4193 18.8693C9.82978 19.1432 9.40923 19.25 9 19.25L9 20.75C9.70457 20.75 10.3481 20.5564 11.0514 20.2296C11.7396 19.9099 12.5375 19.4364 13.5391 18.8432L12.7747 17.5526ZM9 19.25C8.59077 19.25 8.17022 19.1432 7.58067 18.8693C6.97607 18.5884 6.25238 18.1608 5.22524 17.5526L4.46092 18.8432C5.4625 19.4364 6.26037 19.9099 6.9486 20.2296C7.65188 20.5564 8.29543 20.75 9 20.75L9 19.25ZM5.22528 17.5526L4.53912 17.1462L3.77472 18.4368L4.46088 18.8432L5.22528 17.5526ZM4.53908 17.1462C3.51209 16.538 2.78906 16.1088 2.24923 15.712C1.72325 15.3253 1.41899 15.0025 1.21049 14.6321L-0.0966536 15.3679C0.251771 15.9869 0.733149 16.4591 1.36076 16.9205C1.97452 17.3717 2.77303 17.8436 3.77476 18.4368L4.53908 17.1462ZM1.21049 14.6321C1.00145 14.2607 0.88005 13.8261 0.816176 13.1615C0.750798 12.4812 0.75 11.622 0.75 10.4063L-0.75 10.4063C-0.75 11.5935 -0.750798 12.5365 -0.676945 13.305C-0.60159 14.0891 -0.444525 14.7499 -0.0966536 15.3679L1.21049 14.6321ZM0.75 10.4063L0.75 9.5937L-0.75 9.5937L-0.75 10.4063L0.75 10.4063ZM0.75 9.5937C0.75 8.37804 0.750798 7.51886 0.816176 6.83856C0.88005 6.1739 1.00145 5.73928 1.2105 5.36788L-0.0966584 4.63212C-0.444526 5.25015 -0.60159 5.91095 -0.676945 6.69507C-0.750798 7.46355 -0.75 8.4065 -0.75 9.5937L0.75 9.5937ZM1.2105 5.36788C1.419 4.99746 1.72326 4.67467 2.24923 4.288C2.78906 3.89115 3.51209 3.46198 4.53908 2.85379L3.77476 1.56313C2.77303 2.15635 1.97452 2.62824 1.36076 3.07944C0.733143 3.54083 0.251765 4.01311 -0.0966584 4.63212L1.2105 5.36788ZM4.53909 2.85379L5.22525 2.44744L4.46091 1.15678L3.77475 1.56313L4.53909 2.85379Z",
                      stroke: "rgba(0,0,0,1)",
                      fillRule: "nonzero",
                      strokeWidth: 1,
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
                  {...getOverrideProps(overrides, "Vector6325865")}
                ></Icon>
                <Icon
                  width="6px"
                  height="6px"
                  viewBox={{ minX: 0, minY: 0, width: 6, height: 6 }}
                  paths={[
                    {
                      d: "M5.25 3C5.25 4.24264 4.24264 5.25 3 5.25L3 6.75C5.07107 6.75 6.75 5.07107 6.75 3L5.25 3ZM3 5.25C1.75736 5.25 0.75 4.24264 0.75 3L-0.75 3C-0.75 5.07107 0.928932 6.75 3 6.75L3 5.25ZM0.75 3C0.75 1.75736 1.75736 0.75 3 0.75L3 -0.75C0.928932 -0.75 -0.75 0.928932 -0.75 3L0.75 3ZM3 0.75C4.24264 0.75 5.25 1.75736 5.25 3L6.75 3C6.75 0.928932 5.07107 -0.75 3 -0.75L3 0.75Z",
                      stroke: "rgba(0,0,0,1)",
                      fillRule: "nonzero",
                      strokeWidth: 1,
                    },
                  ]}
                  display="block"
                  gap="unset"
                  alignItems="unset"
                  justifyContent="unset"
                  position="absolute"
                  top="35%"
                  bottom="35%"
                  left="33.33%"
                  right="33.33%"
                  {...getOverrideProps(overrides, "Vector6325866")}
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
              children="Settings"
              {...getOverrideProps(overrides, "Settings")}
            ></Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
