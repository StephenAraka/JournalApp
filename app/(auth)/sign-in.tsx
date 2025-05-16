import ScreenTitleHeader from '@/components/ScreenTitleHeader'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [showError, setShowError] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(root)/(tabs)/home')
      } else {
        // console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      setShowError(true)
      setErrMsg(err?.errors[0]?.longMessage || 'Invalid email or password')
    }
  }

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      <ScreenTitleHeader title='Sign In' />

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        className="border border-gray-300 rounded-md px-4 py-3 mb-4 text-base"
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={setPassword}
        className="border border-gray-300 rounded-md px-4 py-3 mb-6 text-base"
      />

      {showError && <Text className="text-sm text-red-500 mb-1">{errMsg}</Text>}

      <TouchableOpacity
        onPress={onSignInPress}
        className="bg-general-50 rounded-md py-3 mb-6"
      >
        <Text className="text-white text-center text-base font-semibold">Continue</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-base text-gray-700">Don't have an account? </Text>
        <Link href="/sign-up">
          <Text className="text-base text-general-50 font-semibold">Sign up</Text>
        </Link>
      </View>
    </View>
  )
}
