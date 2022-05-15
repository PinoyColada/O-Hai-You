import React, { useState } from "react";
import { Text, SafeAreaView, TextInput, Button } from "react-native";
import Translator from "react-native-translator";

const TranslatorScreen = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  return (
    <SafeAreaView>
      <Translator
        from="en"
        to="ja"
        value={value}
        onTranslated={(t) => setResult(t)}
      />
      <TextInput value={value} onChangeText={(t) => setValue(t)} />
      <Text>Japanese:{result}</Text>
    </SafeAreaView>
  );
};

export default TranslatorScreen;
