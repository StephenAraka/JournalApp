import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { icons } from "@/constants";
import { ScreenHeaderProps } from "@/types/type";

const ScreenTitleHeader = ({
  title,
  showBackButton = true,
  showCloseButton = false,
  closeButtonAction,
}: ScreenHeaderProps) => {
  return (
    <View className="relative border-b-[0.5px] border-b-general-100 p-4 mb-4">
      {showBackButton && (
        <TouchableOpacity
          className="w-8 h-8 absolute top-4 left-2 z-10"
          onPress={() => router.back()}
        >
          <Image
            source={icons.chevronLeft}
            resizeMode="contain"
            className="mx-2 w-full h-full"
          />
        </TouchableOpacity>
      )}

      <Text className="text-2xl text-center font-semibold">{title}</Text>

      {showCloseButton && (
        <TouchableOpacity
          className="w-8 h-8 absolute top-4 right-6 z-10"
          onPress={closeButtonAction}
        >
          <Image
            source={icons.close}
            resizeMode="contain"
            className="mx-2 w-full h-full"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScreenTitleHeader;
