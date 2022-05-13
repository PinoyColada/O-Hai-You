import React, { useState } from "react";
import {
  ImageBackground,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!username || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:8000/api/signin", {
        username,
        email,
        password,
      });
      setLoading(false);
      console.log("SIGN IN SUCCESS => ", data);
      alert("Sign in successful");
    } catch (err) {
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
      <ImageBackground
        source={require("../assets/background_welcome_page.jpeg")}
        style={styles.image}
      >
        <View style={{ marginVertical: 100 }}>
          <CircleLogo />
          <Text title center>
            Sign In
          </Text>

          <UserInput
            name="EMAIL"
            value={username}
            setValue={setUsername}
            autoCompleteType="email"
            keyboardType="email-address"
          />
          <UserInput
            name="PASSWORD"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            autoComplteType="password"
          />

          <SubmitButton
            title="Sign In"
            handleSubmit={handleSubmit}
            loading={loading}
          />

          <Text small center>
            Not yet registered?{" "}
            <Text onPress={() => navigation.navigate("Signup")} color="#ff2222">
              Sign Up
            </Text>
          </Text>

          <Text small center color="orange" style={{ marginTop: 10 }}>
            Forgot Password?
          </Text>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default Login;

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
    marginTop: "40%",
    borderRadius: 20,
    maxHeight: 380,
    paddingBottom: "30%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "10%",
    marginTop: "5%",
    marginBottom: "40%",
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
  button: {
    width: "80%",
    backgroundColor: "black",
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonAlt: {
    width: "80%",
    borderWidth: 1,
    height: 40,
    borderRadius: 50,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonAltText: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
  },
  message: {
    fontSize: 16,
    marginVertical: "5%",
  },
});
