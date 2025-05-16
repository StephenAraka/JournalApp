import ScreenTitleHeader from '@/components/ScreenTitleHeader';
import { moods } from '@/constants';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockJournals = [
  {
    id: '1',
    title: 'A Beautiful Day',
    mood: moods[0],
    date: 'May 15, 2025',
    description: 'Today I felt really great and full of energy. I went for a long walk and enjoyed the sunshine. I also met up with some friends for lunch, which was really nice. I love days like this!',
  },
  {
    id: '2',
    title: 'Feeling Blue',
    mood: moods[1],
    date: 'May 14, 2025',
    description: 'It was a rough day. I felt pretty low emotionally  and struggled to get out of bed. I spent most of the day watching TV and eating junk food. I hope tomorrow is better. I need to take care of myself.',
  },
  {
    id: '3',
    title: 'Finding Calm',
    mood: moods[3],
    date: 'May 13, 2025',
    description: 'I took some time to meditate and practice mindfulness today. It really helped me feel more centered and calm. I also did some yoga, which was a great way to release tension.',
  },
  {
    id: '4',
    title: 'Anxious Thoughts',
    mood: moods[2],
    date: 'May 12, 2025',
    description: 'I had a lot of anxious thoughts today. I felt overwhelmed by everything going on in my life. I tried to talk to a friend about it, but it was hard to express how I was feeling.',
  },
];

const Journals = () => {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof mockJournals[0] }) => (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-lg shadow-sm p-4 mb-3 mx-4"
      onPress={() => router.push(
        {
          pathname: "/journal-detail",
          params: item,
        }
      )}
    >
      <Image source={item.mood} className="w-16 h-16 rounded-md mr-4" resizeMode="cover" />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
        <Text className="text-sm text-gray-500">{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-4">
    <ScreenTitleHeader showBackButton={false} title="My Journals" />
      <FlatList
        data={mockJournals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
};

export default Journals;
