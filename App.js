import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Context} from './src/context';
import stores from './src/stores';
import IntroScreen from './src/screens/intro';
import HomeScreen from './src/screens/home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Context.Provider value={stores}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'IntroScreen'}
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              animation: 'slide_from_right',
            }}>
            <Stack.Screen name={'IntroScreen'} component={IntroScreen} />
            <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
