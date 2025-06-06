import MoodJournalBot from '@/components/MoodJournalBot';
import ScreenTitleHeader from '@/components/ScreenTitleHeader';
import { formatReadableDate, getCoverImage } from '@/lib/utils/helpers';
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const JournalDetail = () => {
  const { mood, createdAt, title, description } = useLocalSearchParams();
  const moodStr = Array.isArray(mood) ? mood[0] : mood;

  return (
    <SafeAreaView className="flex flex-1 bg-white relative">
      <ScrollView className="px-4 pt-6 relative">
        <ScreenTitleHeader title={formatReadableDate(createdAt.toString())} />
        <Image source={getCoverImage(moodStr)} className="w-full h-96 rounded-lg mb-4" resizeMode="cover" />
        <Text className="text-2xl font-bold text-gray-800 mb-2">{title}</Text>
        <Text className="text-sm text-gray-500 mb-4">{formatReadableDate(createdAt.toString())}</Text>
        <Text className="text-base text-gray-700 leading-6">{description}</Text>
      </ScrollView>
      <MoodJournalBot mood={mood.toString()} description={description.toString()} />
    </SafeAreaView>
  );
};

export default JournalDetail;
