import { StyleSheet, Text, View } from "react-native";

export default function Category(props) {
  return (
    <View style={styles.item}>
      <Text style={styles.textStyle}>{props.category.name}</Text>
      <Text style={styles.textStyle}>{props.category.notes.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 100,
    width: 170,
    backgroundColor: "#164e63",
    borderRadius: 10,
    alignItems: "center",
    margin: 4,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textStyle: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Gill Sans",
  },
});
