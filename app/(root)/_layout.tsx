import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="add-journal" options={{ headerShown: false }} />
      <Stack.Screen name="journal-detail" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
