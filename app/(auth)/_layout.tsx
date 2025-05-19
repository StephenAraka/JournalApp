import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false, statusBarStyle: 'dark' }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false, statusBarStyle: 'dark' }} />
    </Stack>
  );
};

export default Layout;
