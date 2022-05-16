import React, { useContext, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/auth";
import { SetContext } from "../context/set";
import axios from "axios";
import SubmitButton from "../auth/SubmitButton";

const LessonScreen = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [sets, setSets] = useContext(SetContext);

  useEffect(() => {
    fetchSets();
  }, []);

  const fetchSets = async () => {
    const { data } = await axios.get(`/sets`);
    setSets(data);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: "center",
            fontSize: 40,
          }}
        >
          List of Sets
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {sets.userSets &&
            sets.userSets.map((set) => (
              <View style={{ backgroundColor: "pink" }}>
                <Text style={{ fontSize: 20 }}>{set.title}</Text>
                <Text>{set.description}</Text>
              </View>
            ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default LessonScreen;
