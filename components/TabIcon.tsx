import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex flex-row w-12 h-12 justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
  >
    <View
      className={`rounded-full w-full h-full items-center justify-center ${focused ? "bg-general-50" : ""}`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);
export default TabIcon;