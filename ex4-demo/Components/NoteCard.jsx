import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function NoteCard(props) {
  return (
    <View>
      <ScrollView>
        <Card style={{ borderRadius: 10 }}>
          <Card.Title>
            {props.note.date} at {props.note.hour}
          </Card.Title>
          <Card.Divider />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => props.handleRemove(props.index)}>
              <Ionicons
                name="remove-circle-outline"
                size={40}
                color="#be123c"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ maxWidth: 300 }}
              onPress={() => props.edit(props.note)}
            >
              <Text
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  fontFamily: "Gill Sans",
                  fontSize: 20,
                  fontWeight: "bold",
                  alignSelf: "center",
                  marginLeft: 20,
                }}
              >
                {props.note.content}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
