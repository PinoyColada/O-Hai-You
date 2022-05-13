import React from "react";
import { View, Image } from "react-native";

const O_Hai_You = ({ children }) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 20,
    }}
  >
    <View
      style={{
        backgroundColor: "#FEF9FB",
        height: 190,
        width: 190,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children ? (
        children
      ) : (
        <Image
          source={require("../assets/O-Hai-You_v2.png")}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />
      )}
    </View>
  </View>
);

export default O_Hai_You;
