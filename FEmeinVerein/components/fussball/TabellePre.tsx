import { StyleSheet, useColorScheme } from "react-native";
import { ViewProps } from "react-native";
import { Colors } from "@/constants/Colors";
import { View, Text } from "react-native";
import { getStandingsFull, getStandingsPreview } from "@/services/api";
import { ThemedText } from "@/components/ThemedText";
import { useState, useEffect } from "react";
import teams from "../../assets/standings.json";
import { Image } from "react-native";
import { DataTable } from "react-native-paper";
import { getFontSize } from "@/helper/font";
import { Config } from "@/config/config";
import { Tabellerendering } from "./tabellerendering";

export type TabelleProps = ViewProps & {
  mode: string;
  teams: string;
};

export function TabellePre({ teams }: TabelleProps) {
  return (
    <View style={{}}>
      {teams.map((item: any, index: any) => {
        return <Tabellerendering key={index} teamname={item.team} mode="" />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tablecontainer: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
    minWidth: 330,
    color: "red",
  },
});
