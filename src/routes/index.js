import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/welcome';
import Home from '../screens/home';
import Settings from '../screens/settings';

const Stack = createNativeStackNavigator();

const Routes = () => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen 
          name='Home'
          component={Home}
          />
          <Stack.Screen
          name='Settings'
          component={Settings}
          />
          <Stack.Screen
          name='Welcome'
          component={Welcome}
          />
      </Stack.Navigator>
    </NavigationContainer>
)

export default Routes;