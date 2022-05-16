import React, { useState, useContext } from "react";
import { Text, SafeAreaView, ScrollView, TextInput, View } from "react-native";
import SubmitButton from "../auth/SubmitButton";
import axios from "axios";

const PostFlashCard = ({ navigation }) => {
  const [sets, setSets] = useContext(SetContext);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question || !answer) {
      alert("Please enter a question and answer");
      return;
    }
    try {
      const { data } = await axios.post("/create-flash", {
        question,
        setAnswer,
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
      <Text style={{ paddingTop: 30 }}>Create A FlashCard</Text>

      <TextInput
        value={question}
        onChangeText={(text) => setTitle(text)}
        placeholder="The question goes here"
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
        value={answer}
        onChangeText={(text) => handleChange(text)}
        placeholder="Your answer of the question here"
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

export default PostFlashCard;
