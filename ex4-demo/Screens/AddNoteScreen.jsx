import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../Components/Context";

export default function AddNoteScreen({ route, navigation }) {
  const { category, noteClicked } = route.params;
  const { categories, setCategories, setNotes, counter, setCounter } =
    useContext(CategoryContext);
  const [content, setContent] = useState("");
  const [warning, setWarning] = useState(false);
  const warningText = "You need to write something!";

  useEffect(() => {
    if (noteClicked != undefined) setContent(noteClicked.content);
  }, []);

  const saveNote = () => {
    if (content == "") {
      setWarning(true);
      return;
    }

    let tmpCategories = [...categories];
    const tmpDate = new Date();
    const arr = tmpDate.toLocaleString("en-GB").split(",");
    const date = arr[0];
    const hour = arr[1].substring(1, 6);
    if (noteClicked != undefined) {
      const note = {
        id: noteClicked.id,
        content: content,
        date: date,
        hour: hour,
      };

      let newNotes = [...category.notes];
      const tmpNote = newNotes.filter((n) => n.id === note.id);
      const index = newNotes.indexOf(tmpNote[0]);
      newNotes[index] = note;
      const selectedCategoryIndex = categories.indexOf(category);
      tmpCategories[selectedCategoryIndex].notes = newNotes;
      setNotes(newNotes);
    } else {
      const note = {
        id: counter + 1,
        content: content,
        date: date,
        hour: hour,
      };
      const index = tmpCategories.indexOf(category);
      tmpCategories[index].notes.push(note);
      setCounter(note.id);
    }
    setCategories(tmpCategories);
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Write to not forget..</Text>
        <TextInput
          value={content}
          multiline
          clearButtonMode="always"
          style={styles.textInputStyle}
          onChangeText={(e) => {
            setContent(e);
            if (warning == true) setWarning(false);
          }}
        />
        {warning && <Text style={styles.warningStyle}>{warningText}</Text>}
        <TouchableOpacity
          onPress={saveNote}
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Ionicons name="add-circle-outline" size={50} color="#164e63" />
          <Text style={styles.textStyle}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: 300,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#164e63",
    color: "#164e63",
    fontSize: 25,
    fontFamily: "Gill Sans",
    fontWeight: "bold",
  },
  container: {
    alignSelf: "center",
    marginTop: 50,
  },
  textStyle: {
    alignSelf: "center",
    color: "#164e63",
    fontSize: 25,
    fontFamily: "Gill Sans",
    fontWeight: "bold",
  },
  warningStyle: {
    alignSelf: "center",
    color: "#be123c",
    fontSize: 20,
    fontFamily: "Gill Sans",
    fontWeight: "bold",
  },
});
