import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, statusBarStyle: 'dark' }} />
      <Stack.Screen name="add-journal" options={{ headerShown: false, statusBarStyle: 'dark' }} />
      <Stack.Screen name="journal-detail" options={{ headerShown: false, statusBarStyle: 'dark' }} />
    </Stack>
  );
};

export default Layout;
