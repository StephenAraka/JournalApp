import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface GenderSelectorProps {
  label: string;
  selectedValue?: string;
  onValueChange: (value: string) => void;
}

const MoodSelector = ({
  label,
  selectedValue,
  onValueChange,
}: GenderSelectorProps) => {
  const options = ["Happy", "Sad", "Calm", "Anxious"];

  return (
    <View className="my-2 w-full">
      <Text className="text-sm font-semibold text-gray-700 mb-2">{label}</Text>
      <View className="flex flex-row gap-4">
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onValueChange(option)}
            className={`px-4 py-2 rounded-lg border ${
              selectedValue === option
                ? "bg-general-50 text-white border-general-50"
                : "border-gray-300"
            }`}
          >
            <Text
              className={`text-base ${
                selectedValue === option ? "text-white" : "text-black"
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MoodSelector;