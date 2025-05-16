import ScreenTitleHeader from '@/components/ScreenTitleHeader';
import { images } from '@/constants';
import { api } from '@/convex/_generated/api';
import { formatReadableDate, getCoverImage } from '@/lib/utils/helpers';
import { Journal } from '@/types/type';
import { useUser } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Journals = () => {
  const { user } = useUser()
  const userEmail = user?.emailAddresses[0].emailAddress || '';

  const router = useRouter();
  const journals = useQuery(api.journals.get, {
    owner: userEmail,
  }) || [];


  const renderItem = ({ item }: { item: Journal }) => (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-lg shadow-sm p-4 mb-3 mx-4"
      onPress={() => router.push(
        {
          pathname: "/journal-detail",
          params: { ...item },
        }
      )}
    >
      <Image source={getCoverImage(item.mood)} className="w-16 h-16 rounded-md mr-4" resizeMode="cover" />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
        <Text className="text-sm text-gray-500">{formatReadableDate(item.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-4">
      <ScreenTitleHeader showBackButton={false} title="My Journals" />
      {journals.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Image
            source={images.noResult}
            className="w-32 h-32 mb-4"
            resizeMode="contain"
          />
          <Text className="text-gray-500 text-lg">No journals found.</Text>
        </View>
      ) : (
      <FlatList
        data={journals}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    )}
    </SafeAreaView>
  );
};

export default Journals;
