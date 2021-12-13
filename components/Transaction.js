import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Transaction({ navigation }) {
  const [isData, setData] = useState([]);
  const [isAll, setAll] = useState(true);
  const [isLoad, setLoad] = useState(false);
  const [isSimCard, setSimCard] = useState(false);
  const [isPocketWifi, setPocketWifi] = useState(false);

  useEffect(() => {
    (async () => {
      const AbortCont = new AbortController();
      const isID = await AsyncStorage.getItem("_id");

      await fetch(`https://dfa-db.herokuapp.com/api/dsp/customer/${isID}`, {
        signal: AbortCont.signal,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.log("error", error));

      return () => AbortCont.abort();
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          margin: 20,
          padding: 15,
          backgroundColor: "#52ABFA",
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setAll(true);
            setLoad(false);
            setSimCard(false);
            setPocketWifi(false);
          }}
        >
          <Text
            style={{
              color: isAll ? "black" : "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAll(false);
            setLoad(true);
            setSimCard(false);
            setPocketWifi(false);
          }}
        >
          <Text
            style={{
              color: isLoad ? "black" : "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Load
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAll(false);
            setLoad(false);
            setSimCard(true);
            setPocketWifi(false);
          }}
        >
          <Text
            style={{
              color: isSimCard ? "black" : "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Sim Card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAll(false);
            setLoad(false);
            setSimCard(false);
            setPocketWifi(true);
          }}
        >
          <Text
            style={{
              color: isPocketWifi ? "black" : "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Pocket Wifi
          </Text>
        </TouchableOpacity>
      </View>
      {isAll ? (
        <ScrollView
          style={{
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          {isData.map((item, index) => {
            const date = new Date(item.date);
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("ViewTransaction", { item })}
                key={index}
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "#3DB2FF",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item.name}
                </Text>
                <Text style={{ color: "white", fontSize: 10 }}>
                  {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : undefined}
      {isLoad ? (
        <ScrollView
          style={{
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          {isData.map((item, index) => {
            const date = new Date(item.date);
            return (
              <>
                {item.type === "load" ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ViewTransaction", { item })
                    }
                    key={index}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: "#3DB2FF",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 16 }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {date.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                ) : undefined}
              </>
            );
          })}
        </ScrollView>
      ) : undefined}
      {isSimCard ? (
        <ScrollView
          style={{
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          {isData.map((item, index) => {
            const date = new Date(item.date);
            return (
              <>
                {item.type === "simcard" ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ViewTransaction", { item })
                    }
                    key={index}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: "#3DB2FF",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 16 }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {date.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                ) : undefined}
              </>
            );
          })}
        </ScrollView>
      ) : undefined}
      {isPocketWifi ? (
        <ScrollView
          style={{
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          {isData.map((item, index) => {
            const date = new Date(item.date);
            return (
              <>
                {item.type === "pocketwifi" ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ViewTransaction", { item })
                    }
                    key={index}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: "#3DB2FF",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 16 }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {date.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                ) : undefined}
              </>
            );
          })}
        </ScrollView>
      ) : undefined}
    </View>
  );
}
