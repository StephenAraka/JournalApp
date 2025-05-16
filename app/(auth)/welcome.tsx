import CustomButton from "@/components/CustomButton";
import { moods } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  return (
    <ImageBackground
      source={moods[0]}
      resizeMode="cover"
      className="flex-1"
    >
      {/* Gradient Overlay */}
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.1)",
          "rgba(0,0,0,0.5)",
          "rgba(0,0,0,0.9)",
          "rgba(0,0,0,1)",
        ]}
        style={{ flex: 1 }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <SafeAreaView className="flex-1 items-center justify-end p-8 gap-12">
          <View className="flex w-full justify-center items-center">
            <View className="flex gap-2">
              <Text className="text-3xl text-center font-bold capitalize text-white">
                Welcome to NashPad
              </Text>
              <Text className="text text-center text-white">
                Your personal mood tracker and journal. 
                Track your moods, reflect on your day, and gain insights into your emotional well-being.
              </Text>
            </View>
          </View>

          {/* SIGN IN SECTION */}
          <View className="flex flex-row justify-between gap-6 w-full">
            <CustomButton
              title="Sign up"
              onPress={() => router.push("/(auth)/sign-up")}
              className="bg-white w-1/2"
              textVariant="primary"
            />
            <CustomButton
              title="Log in"
              onPress={() => router.push("/(auth)/sign-in")}
              className="bg-white w-1/2"
              textVariant="primary"
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Welcome;
