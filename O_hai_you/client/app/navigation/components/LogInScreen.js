import React, { useState, useContext } from "react";
import { ImageBackground, View, Text, StyleSheet } from "react-native";
import UserInput from "../auth/UserInput";
import SubmitButton from "../auth/SubmitButton";
import axios from "axios";
import O_Hai_You from "../auth/O_Hai_You";
import { API } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!username || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`${API}/signin`, {
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
        navigation.navigate("MainContainer", { screen: "MainContainer" });
      }
    } catch (err) {
      alert("Signup failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background_welcome_page.jpeg")}
      style={styles.image}
    >
      <View style={styles.card}>
        <O_Hai_You />
        <Text style={styles.heading}>Sign In</Text>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <UserInput
              style={styles.input}
              name="Username"
              value={username}
              setValue={setUsername}
              autoCompleteType="username"
            />
            <UserInput
              style={styles.input}
              name="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              autoCompleteType="password"
            />

            <SubmitButton
              title="Sign In"
              handleSubmit={handleSubmit}
              loading={loading}
            />

            <Text style={styles.message}>
              Don't have an account?{" "}
              <Text
                style={{ color: "#626d9c" }}
                onPress={() =>
                  navigation.navigate("Register", { screen: "RegisterScreen" })
                }
              >
                Create one here
              </Text>
            </Text>
          </View>
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
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: "80%",
    marginTop: "30%",
    borderRadius: 20,
    maxHeight: 540,
    paddingBottom: "20%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20%",
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

export default LoginScreen;
