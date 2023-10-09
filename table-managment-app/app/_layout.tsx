import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import React,{ useEffect,useContext } from "react";
import * as SecureStore from 'expo-secure-store';

const CLERK_PUBLISHABLE_KEY ='pk_test_bmF0aW9uYWwtbW9yYXktMzUuY2xlcmsuYWNjb3VudHMuZGV2JA';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("isloded "+isLoaded)
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    console.log('User changed: ', isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.push('/home');
    } else if (!isSignedIn) {
      router.push('/login');
    }
  }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayoutNav = () => {
  console.log("called RootLayoutNav...")
  return (
   <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache} children>
      <InitialLayout />
      </ClerkProvider>
   
  );
};

export default RootLayoutNav;

