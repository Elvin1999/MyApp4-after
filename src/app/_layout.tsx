import ActivityCard from "@/components/ActivityCard";
import { availableActivities } from "@/data/availableActivities";
import { Activity } from "@/models/activity.model";
import { useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

// export default function TabLayout() {
//   const [counter, setCounter] = useState<number>(0);

//   const increase = () => {
//     console.log("Previos counter ", counter);
//     setCounter(counter + 1);
//   };

//   const errorExample = (person: any) => {
//     try {
//       console.log(person.name); //js de app chokur & ts de compoile error
//     } catch (error: any) {
//       console.warn("Error : ", error.message);
//     }
//   };

//   // const { width, height } = Dimensions.get("window"); //static
//   const { width, height } = useWindowDimensions(); //dynamic

//   const isPortrait = height > width;
//   return (
//     <View style={{ paddingTop: StatusBar.currentHeight }}>
//       <Text>Hello</Text>

//       <Text style={{ fontSize: 28 }}>Width : {width}</Text>
//       <Text style={{ fontSize: 28 }}>Height : {height}</Text>
//       <Text style={{ fontSize: 28 }}>
//         {isPortrait ? "Portrait" : "Landscape"}
//       </Text>

//       {/* <Text>Counter : {counter}</Text>

//       <Button title="Increase" onPress={increase}></Button>
//       <Button title="Test" onPress={() => errorExample(null)}></Button> */}
//     </View>
//   );
// }

export default function App() {
  const [activity, setActivity] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const [logs, setLogs] = useState<Activity[]>(availableActivities);

  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  const addActivity = () => {
    if (!activity.trim() || !time.trim()) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newLog: Activity = { type: activity, time: time, icon: "" };

    setLogs([newLog, ...logs]);

    Alert.alert(
      Platform.OS == "ios" ? "Added successfully 🍎" : "Added successfully 🤖",
    );

    setActivity("");
    setTime("");
  };

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View
          style={[
            styles.wrapper,
            { flexDirection: isLandscape ? "row" : "column" },
          ]}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Add your activity</Text>

            <TextInput
              style={styles.input}
              placeholder="Activity (exp. running)"
              value={activity}
              onChangeText={setActivity}
            />

            <TextInput
              style={styles.input}
              placeholder="Duration (exp. 30 minutes)"
              value={time}
              onChangeText={setTime}
            />

            <TouchableOpacity style={styles.button} onPress={addActivity}>
              <Text>Add Activity</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.title}>All Activities</Text>

            <FlatList
              key={isLandscape ? "l" : "p"}
              data={logs}
              keyExtractor={(_, index) => index.toString()}
              numColumns={isLandscape ? 3 : 1}
              contentContainerStyle={{ paddingBottom: 16 }}
              renderItem={({ item }) => <ActivityCard item={item} />}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "deepskyblue",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  wrapper: {
    flex: 1,
    padding: 16,
    gap: 29,
    backgroundColor: "deepskyblue",
  },
  formContainer: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 10,
    flex: 1,
  },
});
