import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { type ComponentProps } from "react";
import { Platform } from "react-native";
import { View, Text, useColorScheme } from "react-native";
import { useState, useEffect } from "react";
import { getEilmeldung } from "@/services/api";
import { Colors } from "@/constants/Colors";

export function Eilmeldung() {
  const [apiData, setApiData] = useState();
  const colorScheme = useColorScheme();
  async function getData() {
    if (apiData !== "") {
      const res = await getEilmeldung();
      setApiData(res);
    }
  }

  useEffect(() => {
    if (apiData !== "") {
      getData();
    }
  }, []);
  return (
    <>
      {apiData && apiData.aktivieren && (
        <View
          style={{
            backgroundColor: Colors[colorScheme ?? "dark"].warningRed,
            paddingVertical: 10,
            position: "",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors[colorScheme ?? "dark"].white,
              fontSize: 16,
            }}
          >
            {apiData.meldung}
          </Text>
        </View>
      )}
    </>
  );
}
