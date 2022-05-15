import React, { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import UserInput from "../auth/UserInput";
import SubmitButton from "../auth/SubmitButton";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const Account = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      const { username, email, firstName, lastName, image } = state.user;
      setUsername(username);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!username || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/signin`, {
        username,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setState(data);
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log("SIGN IN SUCCESS => ", data);
        alert("Sign in successful");
        navigation.navigate("Lesson");
      }
    } catch (err) {
      alert("Signup failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentCotainerStyle={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ marginVertical: 100 }}>
        <Text title center style={{ paddingBottom: 10 }}>
          {username}
        </Text>
        <Text medium center style={{ paddingBottom: 10 }}>
          {firstName} {lastName}
        </Text>
        <Text medium center style={{ paddingBottom: 50 }}>
          {email}
        </Text>

        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoComplteType="password"
        />

        <SubmitButton
          title="Update Password"
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Account;
