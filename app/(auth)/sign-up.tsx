import ScreenTitleHeader from '@/components/ScreenTitleHeader'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [showError, setShowError] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({ emailAddress, password })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      setShowError(true)
      setErrMsg(err?.errors[0]?.longMessage || 'Invalid email or password')
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code })
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View className="flex-1 bg-white px-6 pt-20">
        <ScreenTitleHeader title='Verify Your Email' />
        <TextInput
          value={code}
          placeholder="Verification code"
          onChangeText={setCode}
          className="border border-gray-300 rounded-md px-4 py-3 mb-4 text-base"
          placeholderTextColor='#4D4D4D'
        />
        <TouchableOpacity
          onPress={onVerifyPress}
          className="bg-general-50 rounded-md py-3"
        >
          <Text className="text-white text-center text-base font-semibold">Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      <ScreenTitleHeader title='Sign Up' />

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        className="border border-gray-300 rounded-md px-4 py-3 mb-4 text-base"
        placeholderTextColor='#4D4D4D'
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={setPassword}
        className="border border-gray-300 rounded-md px-4 py-3 mb-6 text-base"
        placeholderTextColor='#4D4D4D'
      />

      {showError && <Text className="text-sm text-red-500 mb-1">{errMsg}</Text>}

      <TouchableOpacity
        onPress={onSignUpPress}
        className="bg-general-50 rounded-md py-3 mb-6"
      >
        <Text className="text-white text-center text-base font-semibold">Continue</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-base text-gray-700">Already have an account? </Text>
        <Link href="/sign-in">
          <Text className="text-base text-general-50 font-semibold">Sign in</Text>
        </Link>
      </View>
    </View>
  )
}
