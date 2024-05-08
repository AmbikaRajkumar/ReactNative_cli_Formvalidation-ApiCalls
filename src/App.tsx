import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './screens/Search';
import Form from './screens/Form';
import Create from './screens/Create';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#6B0772'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
