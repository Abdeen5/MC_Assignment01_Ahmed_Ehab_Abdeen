// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StyleSheet,
//   Pressable,
//   Alert,
//   Platform,
// } from "react-native";

// type Goal = {
//   id: string;
//   text: string;
// };

// export default function HomeScreen() {
//   const [enteredGoal, setEnteredGoal] = useState<string>("");
//   const [goals, setGoals] = useState<Goal[]>([]);

//   function addGoalHandler() {
//     const text = enteredGoal.trim();
//     if (text.length === 0) return;

//     setGoals((current) => [...current, { id: Math.random().toString(), text }]);
//     setEnteredGoal("");
//   }

//   function deleteGoalHandler(id: string) {
//     setGoals((current) => current.filter((goal) => goal.id !== id));
//   }

//   function confirmDelete(id: string, text: string) {
//     // ✅ Web confirm
//     if (Platform.OS === "web") {
//       const ok = window.confirm(`Delete Goal?\n\nAre you sure you want to delete "${text}"?`);
//       if (ok) deleteGoalHandler(id);
//       return;
//     }

//     // ✅ Mobile confirm
//     Alert.alert("Delete Goal", `Are you sure you want to delete "${text}"?`, [
//       { text: "Cancel", style: "cancel" },
//       { text: "Delete", style: "destructive", onPress: () => deleteGoalHandler(id) },
//     ]);
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>To-Do List</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Enter goal"
//           style={styles.textInput}
//           value={enteredGoal}
//           onChangeText={setEnteredGoal}
//         />
//         <Pressable style={styles.addBtn} onPress={addGoalHandler}>
//           <Text style={styles.addBtnText}>ADD</Text>
//         </Pressable>
//       </View>

//       <FlatList
//         data={goals}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Pressable
//             onPress={() => confirmDelete(item.id, item.text)}
//             style={styles.goalItem}
//           >
//             <Text style={styles.goalText}>{item.text}</Text>
//           </Pressable>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     paddingTop: 60,
//     backgroundColor: "#F5F3FF",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#6A0DAD",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//     gap: 10,
//   },
//   textInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#6A0DAD",
//     padding: 10,
//     borderRadius: 10,
//   },
//   addBtn: {
//     backgroundColor: "#6A0DAD",
//     padding: 10,
//     borderRadius: 10,
//     justifyContent: "center",
//   },
//   addBtnText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   goalItem: {
//     backgroundColor: "#6A0DAD",
//     padding: 15,
//     borderRadius: 12,
//     marginVertical: 6,
//   },
//   goalText: {
//     color: "white",
//   },
// });

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

type Goal = {
  id: string;
  text: string;
};

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const [enteredGoal, setEnteredGoal] = useState<string>("");
  const [goals, setGoals] = useState<Goal[]>([]);

  function addGoalHandler() {
    const text = enteredGoal.trim();
    if (!text) return;

    setGoals((current) => [...current, { id: Math.random().toString(), text }]);
    setEnteredGoal("");
  }

  function deleteGoalHandler(id: string) {
    setGoals((current) => current.filter((goal) => goal.id !== id));
  }

  function confirmDelete(id: string, text: string) {
    // ✅ Web confirm
    if (Platform.OS === "web") {
      const ok = window.confirm(
        `Delete Goal?\n\nAre you sure you want to delete "${text}"?`
      );
      if (ok) deleteGoalHandler(id);
      return;
    }

    // ✅ Mobile confirm
    Alert.alert("Delete Goal", `Are you sure you want to delete "${text}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteGoalHandler(id),
      },
    ]);
  }

  // Wait for fonts to load
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter goal"
          placeholderTextColor="#9CA3AF"
          style={styles.textInput}
          value={enteredGoal}
          onChangeText={setEnteredGoal}
        />

        <Pressable style={styles.addBtn} onPress={addGoalHandler}>
          <Text style={styles.addBtnText}>ADD</Text>
        </Pressable>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => confirmDelete(item.id, item.text)}
            style={styles.goalItem}
          >
            <Text style={styles.goalText}>{item.text}</Text>
            <Text style={styles.hintText}>Click to delete</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    backgroundColor: "#0F172A", // Dark navy
  },

  title: {
    fontSize: 28,
    fontFamily: "Poppins_600SemiBold",
    color: "#60A5FA", // Light blue
    textAlign: "center",
    marginBottom: 25,
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },

  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    padding: 12,
    borderRadius: 10,
    fontFamily: "Poppins_400Regular",
    backgroundColor: "#1E293B", // dark card
    color: "white",
  },

  addBtn: {
    backgroundColor: "#2563EB", // blue button
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
  },

  addBtnText: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
  },

  goalItem: {
    backgroundColor: "#1E40AF", // deep blue
    padding: 15,
    borderRadius: 12,
    marginVertical: 6,
  },

  goalText: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },

  hintText: {
    color: "#BFDBFE",
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    marginTop: 6,
  },
});