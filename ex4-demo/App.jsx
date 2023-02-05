import HomeScreen from "./Screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteScreen from "./Screens/NoteScreen";
import AddNoteScreen from "./Screens/AddNoteScreen";
import Context from "./Components/Context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#164e63" },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
              fontFamily: "Gill Sans",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "My Notes",
            }}
          />
          <Stack.Screen
            name="Note"
            component={NoteScreen}
            options={({ route }) => ({
              title: route.params.categoryChoosen.name,
            })}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNoteScreen}
            options={({ route }) => ({
              title: route.params.category.name + " Note",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
}
