import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import Category from "../Components/Category";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CategoryContext } from "../Components/Context";

export default function HomeScreen({ navigation }) {
  const { categories, setCategories } = useContext(CategoryContext);
  const [warning, setWarning] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [warningText, setWarningText] = useState("");

  const addCategory = () => {
    if (categoryName == "") {
      setWarningText("You need to write a category name!");
      setWarning(true);
      return;
    }

    const checkName = categories.filter(
      (category) => category.name === categoryName
    );

    if (checkName.length > 0) {
      setWarningText("Category name is already taken!");
      setWarning(true);
      return;
    }
    let newCategory = { name: categoryName, notes: [] };
    setCategories([...categories, newCategory]);
    setCategoryName("");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
          }}
          onPress={addCategory}
        >
          <Ionicons name="add-circle-outline" size={50} color="#164e63" />
          <Text style={styles.textStyle}>Add Category</Text>
        </TouchableOpacity>
        <TextInput
          value={categoryName}
          clearButtonMode="always"
          style={styles.textInputStyle}
          onChangeText={(event) => {
            setCategoryName(event);
            if (warning == true) setWarning(false);
          }}
        />
        {warning && <Text style={styles.warningStyle}>{warningText}</Text>}
      </View>
      <View style={styles.container}>
        {categories.map((category, key) => (
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            value=""
            onPress={() => {
              navigation.navigate("Note", {
                categoryChoosen: category,
              });
            }}
            key={key}
          >
            <Category category={category} />
          </TouchableOpacity>
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  textStyle: {
    alignSelf: "center",
    color: "#164e63",
    fontSize: 25,
    fontFamily: "Gill Sans",
    fontWeight: "bold",
  },
  textInputStyle: {
    width: 300,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#164e63",
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
