import TabIcon from '@/components/TabIcon';
import { icons, moods } from '@/constants';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const router = useRouter();

  const goToAddJournal = () => {
  router.push('/add-journal');
};

  return (
    <View className="w-full h-full">
      <ImageBackground 
        source={moods[0]} 
        className="w-full h-full rounded-lg overflow-hidden"
      >
        {/* White overlay with opacity */}
        <View className="absolute inset-0 bg-white opacity-70" />
        
        {/* Text content centered */}
        <View className="w-full h-full justify-center items-center p-6">
          <Text className="text-6xl text-gray-800 mb-3 text-center font-RibeyeMarrow">
            NashPad Journal
          </Text>
          <Text className="text-base text-gray-600 text-center font-medium">
            Capture your moments, track your moods, embrace your journey with NashPad.
          </Text>
        </View>
      </ImageBackground>
      <TouchableOpacity onPress={goToAddJournal} className="absolute bottom-[114px] right-[40%] bg-general-50 p-4 rounded-full">
        <TabIcon source={icons.plus} focused={true} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;