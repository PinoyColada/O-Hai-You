import React, { useState } from "react";
import { ImageBackground, View, Text, StyleSheet } from "react-native";
import UserInput from "../auth/UserInput";
import SubmitButton from "../auth/SubmitButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import O_Hai_You from "../auth/O_Hai_You";
import axios from "axios";
import { API } from "../config.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!username || !firstName || !lastName || !email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`${API}/signup`, {
        username,
        firstName,
        lastName,
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setState(data);
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log("SIGN UP SUCCESS => ", data);
        alert("Sign up successful");
      }
    } catch (err) {
      alert("Sign up failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background_welcome_page_v2.jpeg")}
      style={styles.image}
    >
      <View style={styles.card}>
        <O_Hai_You />
        <Text style={styles.heading}>Sign Up</Text>
        <View style={styles.form}>
          <KeyboardAwareScrollView
            contentCotainerStyle={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <View style={styles.inputs}>
              <UserInput
                style={styles.input}
                name="Username"
                value={username}
                setValue={setUsername}
                autoCapitalize="words"
                autoCorrect={false}
              />
              <UserInput
                style={styles.input}
                name="First Name"
                value={firstName}
                setValue={setFirstName}
                autoCapitalize="words"
                autoCorrect={false}
              />

              <UserInput
                style={styles.input}
                name="Last Name"
                value={lastName}
                setValue={setLastName}
                autoCapitalize="words"
                autoCorrect={false}
              />
              <UserInput
                style={styles.input}
                name="Email"
                value={email}
                setValue={setEmail}
                autoCompleteType="email"
                keyboardType="email-address"
              />
              <UserInput
                style={styles.input}
                name="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
                autoComplteType="password"
              />

              <SubmitButton
                title="Sign Up"
                handleSubmit={handleSubmit}
                loading={loading}
              />

              <Text style={styles.message}>
                Have an account?{" "}
                <Text
                  style={{ color: "#626d9c" }}
                  onPress={() =>
                    navigation.navigate("Log In", { screen: "LoginScreen" })
                  }
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#FEF9FB",
    width: "80%",
    marginTop: "25%",
    borderRadius: 20,
    maxHeight: 700,
    paddingBottom: "10%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: "5%",
  },
  inputs: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingTop: 10,
    fontSize: 16,
    minHeight: 40,
  },
  message: {
    fontSize: 16,
    marginVertical: "5%",
  },
});

export default RegisterScreen;
