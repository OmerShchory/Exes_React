import { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import NoteCard from "../Components/NoteCard";
import { CategoryContext } from "../Components/Context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect } from "react";

export default function NoteScreen({ navigation, route }) {
  const { categories, setCategories, notes, setNotes, category, setCategory } =
    useContext(CategoryContext);
  const { categoryChoosen } = route.params;
  const indexCategory = categories.indexOf(categoryChoosen);

  useEffect(() => {
    setCategory(categoryChoosen);
    setNotes(categoryChoosen.notes);
  }, []);

  const handleRemove = (index) => {
    const tmpNote = category.notes[index];
    const newNotes = category.notes.filter((n) => tmpNote.id !== n.id);
    const newCategories = [...categories];
    newCategories[indexCategory].notes = newNotes;
    setCategory(newCategories[indexCategory]);
    setCategories(newCategories);
    setNotes(newNotes);
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddNote", { category: category })}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Ionicons name="add-circle-outline" size={50} color="#164e63" />
            <Text style={styles.textStyle}>Add a Note</Text>
          </View>
        </TouchableOpacity>
        {notes.map((note, key) => (
          <NoteCard
            note={note}
            key={key}
            index={key}
            handleRemove={handleRemove}
            edit={(noteClicked) =>
              navigation.navigate("AddNote", {
                noteClicked: noteClicked,
                category: category,
              })
            }
          />
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: "center",
    color: "#164e63",
    fontSize: 25,
    fontFamily: "Gill Sans",
    fontWeight: "bold",
  },
});
