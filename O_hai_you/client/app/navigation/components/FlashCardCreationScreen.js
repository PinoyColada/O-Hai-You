import React, { useState, useContext } from "react";
import { Text, SafeAreaView, ScrollView, TextInput, View } from "react-native";
import SubmitButton from "../auth/SubmitButton";
import axios from "axios";
import { SetContext } from "../context/set";

const PostSet = ({ navigation }) => {
  const [sets, setSets] = useContext(SetContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Please enter a title and description");
      return;
    }
    try {
      const { data } = await axios.post("/create-flash", {
        title,
        description,
      });
      console.log("data =>", data);
      setSets([data, ...sets]);
      setTimeout(() => {
        alert("Set posted");
        navigation.navigate("Lesson");
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (text) => {
    try {
      setLoading(true);
      setDescription(text);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ paddingTop: 30 }}>Create A Set</Text>

      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title of the Set"
        autoCapitalize="sentences"
        style={{
          borderWidth: 1,
          borderColor: "grey",
          height: 50,
          marginVertical: 10,
          marginHorizontal: 15,
          borderRadius: 30,
          padding: 15,
        }}
      />

      <TextInput
        value={description}
        onChangeText={(text) => handleChange(text)}
        placeholder="Short description of the set"
        autoCapitalize="none"
        autoCorrect={false}
        selectTextOnFocus={true}
        style={{
          borderWidth: 1,
          borderColor: "grey",
          height: 50,
          marginVertical: 30,
          marginHorizontal: 15,
          borderRadius: 30,
          padding: 15,
        }}
      />

      <View style={{ paddingTop: 25 }}>
        <SubmitButton
          title="Submit"
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostSet;
