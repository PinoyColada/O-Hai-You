import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import { Audio } from "expo-av";

function PronunciationScreen() {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Hiragana_a.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView>
      <Button title="Play Sound" onPress={playSound} />
    </SafeAreaView>
  );
}

export default PronunciationScreen;
