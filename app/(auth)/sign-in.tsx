import { ScrollView, Text, View } from "react-native";

const SignIn = () => {

  return (
    <ScrollView className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋🏻
          </Text>
        </View>

    </ScrollView>
  );
};

export default SignIn;
