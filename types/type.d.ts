import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface ScreenHeaderProps {
  title: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  closeButtonAction?: () => void;
}

declare interface Journal {
  id: string;
  title: string;
  mood: string;
  description: string;
  createdAt: string;
  owner: string;
}

declare type MoodBotProps = {
  description: string;
  mood: string;
};