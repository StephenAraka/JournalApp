import ScreenTitleHeader from '@/components/ScreenTitleHeader';
import { icons } from '@/constants';
import { useClerk, useUser } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useState } from 'react';
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const { user } = useUser()
  const [emailNotifications, setEmailNotifications] = useState(true);
  const userEmail = user?.emailAddresses[0].emailAddress || '';

  // Log Out using clerk's `signOut()` function
  const { signOut } = useClerk()
  const logOutUser = async () => {
    try {
      await signOut()
      Linking.openURL(Linking.createURL('/(auth)/welcome'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="pt-4 px-4">

        {/* Header */}
        <ScreenTitleHeader showCloseButton={false} title="Profile" />

        {/* Profile Section */}
        {userEmail && (
          <View className="mb-6">
            <Text className="text-sm text-gray-500 mb-2">Profile</Text>
            <View className="bg-white py-4 px-4 border-b flex-row justify-between border-gray-100">
              <Text className="text-base text-gray-800">Email</Text>
              <Text className="text-base text-general-50">{userEmail}</Text>
            </View>
          </View>
        )}

        {/* Email Notification Toggle */}
        <View className="mb-6">
          <Text className="text-sm text-gray-500 mb-2">Notifications</Text>
          <View className="flex-row justify-between items-center bg-white py-4 px-4 border-b border-gray-100">
            <Text className="text-base text-gray-800">Email Notifications</Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#ccc', true: '#FF004D' }}
              thumbColor={emailNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Reset Password Link */}
        {userEmail && (
          <View className="mb-6">
            <Text className="text-sm text-gray-500 mb-2">Security</Text>
            <TouchableOpacity className="flex-row justify-between items-center bg-white py-4 px-4 border-b border-gray-100">
              <Text className="text-base text-gray-800">Reset Password</Text>
              <Image
                source={icons.chevronLeft}
                className="w-6 h-6 rotate-180"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}

        {/* About Section */}
        <View className="mb-10">
          <Text className="text-sm text-gray-500 mb-2">About App</Text>
          <View className="bg-white py-4 px-4 border-b border-gray-100">
            <Text className="text-base text-gray-700">
              NashPad is a personal journal app designed to help you reflect on your day, track your mood, and store your thoughts in a meaningful way.
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity onPress={logOutUser} className="bg-general-50 py-3 rounded-md mb-10 mx-4">
          <Text className="text-center text-white font-semibold text-base">Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
