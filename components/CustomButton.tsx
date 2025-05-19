import { ButtonProps } from "@/types/type";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "danger":
      return "bg-red-500";

    case "secondary":
      return "bg-gray-500";

    case "success":
      return "bg-green-500";

    case "outline":
      return "bg-transparent border border-neutral-300 border-[0.5px]";

    default:
      return "bg-general-50";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";

    case "secondary":
      return "text-gray-100";

    case "danger":
      return "text-red-100";

    case "success":
      return "text-green-100";

    default:
      return "text-white";
  }
};

const CustomButton = ({
  title,
  onPress,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {(IconLeft && !loading) && <IconLeft />}
      {!loading ? (
        <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator
          size="small"
          color="white"
          className="mr-2"
        />
      )}
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
