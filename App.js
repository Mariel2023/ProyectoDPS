import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { ListProjects } from "./src/screens/ListProjects";
import { CreateProject } from "./src/screens/CreateProject";
import { ShowProject } from "./src/screens/ShowProject";
import { EditProject } from "./src/screens/EditProject";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListProjects} />
        <Stack.Screen name="Create" component={CreateProject} />
        <Stack.Screen name="Show" component={ShowProject} />
        <Stack.Screen name="Edit" component={EditProject} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

