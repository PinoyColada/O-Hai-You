import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import UserInput from "../auth/UserInput";
import SubmitButton from "../auth/SubmitButton";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import O_Hai_You from "../auth/O_Hai_You";
import IonIcons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const Account = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [image, setImage] = useState({
    url: "",
    public_id: "",
  });
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
      setImage(image);
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

  // process for the user to upload an image from their device to set it as their profile pic
  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera access is required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    // save to state for preview
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);
    // send to backend for uploading to cloudinary
    const { data } = await axios.post("/upload-image", {
      image: base64Image,
    });
    // update async storage
    const as = JSON.parse(await AsyncStorage.getItem("@auth"));
    as.user = data;
    await AsyncStorage.setItem("@auth", JSON.stringify(as));
    // update context
    setState({ ...state, user: data });
    setImage(data.image);
    alert("Profile image saved");
  };

  return (
    <KeyboardAwareScrollView
      contentCotainerStyle={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <SafeAreaView style={{ marginVertical: 100 }}>
        <O_Hai_You>
          {image && image.url ? (
            <Image
              source={{ uri: image.url }}
              style={{
                width: 190,
                height: 190,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : uploadImage ? (
            <Image
              source={{ uri: uploadImage }}
              style={{
                width: 190,
                height: 190,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => handleUpload()}>
              <IonIcons name="image" size={100} />
            </TouchableOpacity>
          )}
        </O_Hai_You>

        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <IonIcons
              name="image"
              size={25}
              style={{ maringTop: -5, marginBottom: 10, alignSelf: "center" }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <Text style={{ paddingBottom: 10, textAlign: "center" }}>
          {username}
        </Text>
        <Text style={{ paddingBottom: 10, textAlign: "center" }}>
          {firstName} {lastName}
        </Text>
        <Text style={{ paddingBottom: 50, textAlign: "center" }}>{email}</Text>

        <SafeAreaView style={styles.inputs}>
          <UserInput
            style={styles.input}
            name="New Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            autoCompleteType="password"
          />

          <SubmitButton
            title="Update Password"
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </SafeAreaView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingTop: 10,
    fontSize: 16,
    minHeight: 40,
  },
  inputs: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
  },
});

export default Account;
