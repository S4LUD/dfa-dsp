import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Meeting() {
  const [isData, setData] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch("https://dfa-db.herokuapp.com/api/dsp/meeting", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.log("error", error));
    })();
  }, []);

  return (
    <>
      {isData ? (
        <View
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {isData.map((data) => {
            return (
              <Text
                key={data._id}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#FA7365",
                  marginBottom: 10,
                  padding: 20,
                  color: "white",
                  fontSize: 16,
                  textAlign: "justify",
                }}
              >
                {data.content}
              </Text>
            );
          })}
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18 }}>No meeting(s) today.</Text>
        </View>
      )}
    </>
  );
}
