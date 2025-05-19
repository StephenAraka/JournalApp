import MoodSelector from '@/components/MoodSelector';
import ScreenTitleHeader from '@/components/ScreenTitleHeader';
import { api } from '@/convex/_generated/api';
import { getCoverImage } from '@/lib/utils/helpers';
import { useUser } from '@clerk/clerk-expo';
import { useMutation } from 'convex/react';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddJournal = () => {
  const { user } = useUser()
  const [mood, setMood] = useState('Happy');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showTitleError, setShowTitleError] = useState(false);
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const userEmail = user?.emailAddresses[0].emailAddress

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const MAXCHARS = 500;

  const submitJournal = useMutation(api.journals.submit);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setShowTitleError(true);
      return;
    }
    if (!description.trim()) {
      setShowDescriptionError(true);
      return;
    }

    // - Save the journal entry to the database
    try {
      await submitJournal({
        title,
        mood,
        description,
        date: new Date().toISOString(),
        owner: userEmail!,
      });
      router.push('/(root)/(tabs)/journals');
      
      setTitle('');
      setDescription('');
      setMood('Happy');
    } catch (error) {
      console.error("Failed to submit journal", error);
    }
  };

  return (
    <SafeAreaView className="flex h-full bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <ScreenTitleHeader title="Today's Journal" />

          {/* // - Date */}
          <View className="flex-row items-center justify-center">
            <View className="rounded-md px-4 py-3 bg-secondary-200">
              <Text className="text-base text-gray-800 text-center">{today}</Text>
            </View>
          </View>

          <View className="px-4 pt-4">
            {/* // - Mood Image */}
            <View className="bg-gray-100 rounded-xl h-48 mb-6 overflow-hidden">
              <Image
                source={getCoverImage(mood)}
                className="w-full h-full"
                resizeMode='cover'
              />
            </View>

            {/* // - Journal Title */}
            <View className='mb-4'>
              <Text className="text-sm font-semibold text-gray-700 mb-1">Title</Text>
              <TextInput
                placeholder="Enter title"
                className="border border-gray-300 rounded-md px-4 py-3 text-base"
                value={title}
                onChangeText={(text) => {
                  setShowTitleError(false);
                  setTitle(text.length <= 50 ? text : text.slice(0, 50))
                }}
                maxLength={50}
                onFocus={() => setShowTitleError(false)}
                placeholderTextColor='#4D4D4D'
              />
              {showTitleError && <Text className="ml-2 text-sm text-red-500 mb-1">Please enter a title</Text>}
            </View>

            {/* // -  Journal Mood Selector */}
            <MoodSelector
              label="How are you feeling today?"
              selectedValue={mood}
              onValueChange={(value) => setMood(value)}
            />

            {/* // - Journal Description */}
            <Text className="text-sm font-semibold text-gray-700 mb-1 mt-4">Description</Text>
            <View className="relative">
              <TextInput
                multiline
                placeholder="Write something..."
                className="border border-gray-300 rounded-md px-4 py-3 text-base h-40"
                textAlignVertical="top"
                value={description}
                onChangeText={(text) => {
                  setShowDescriptionError(false);
                  setDescription(text.length <= MAXCHARS ? text : text.slice(0, MAXCHARS))
                }}
                maxLength={MAXCHARS}
                onFocus={() => setShowDescriptionError(false)}
                placeholderTextColor='#4D4D4D'
              />
              <Text className="absolute bottom-2 right-3 text-xs text-gray-400">
                {MAXCHARS - description.length} characters left
              </Text>
            </View>
            {showDescriptionError && <Text className="ml-2 text-sm text-red-500 mb-1">Please enter a description</Text>}
          </View>
        </ScrollView>

        <TouchableOpacity className="bg-general-50 p-4 rounded-lg mx-4 mb-8" onPress={handleSubmit}>
          <Text className="text-white text-center text-base font-semibold">
            Save Journal
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddJournal;
