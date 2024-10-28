import { StyleSheet, useColorScheme } from "react-native";
import { ViewProps } from "react-native";
import { Colors } from "@/constants/Colors";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import {
  getStandingsFull,
  getStandingsPreview,
  getTeamImage,
} from "@/services/api";
import { ThemedText } from "@/components/ThemedText";
import { useState, useEffect } from "react";
import teams from "../../assets/standings.json";
import { Image } from "react-native";
import { DataTable } from "react-native-paper";
import { getFontSize } from "@/helper/font";
import { Config } from "@/config/config";
import { Dimensions } from "react-native";
import { ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type TabelleProps = ViewProps & {
  mode?: string;
  teamname: string;
};

export function Tabellerendering({ teamname, mode }: TabelleProps) {
  const [apiData, setApiData] = useState("");
  const [teamImage, setTeamImage] = useState("");
  const vereinsname = Config.vereinsname;
  const colorScheme = useColorScheme();
  var width = Dimensions.get("window").width;
  async function getData() {
    if (mode === "full") {
      const res = await getStandingsFull(teamname);
      setApiData(res);
    } else {
      const res = await getStandingsPreview(teamname);
      setApiData(res);
    }
  }
  async function loadTeamImage() {
    const response = await getTeamImage(teamname);
    setTeamImage(response);
    console.log(response);
  }
  useEffect(() => {
    if (apiData === "") {
      getData();
      loadTeamImage();
    }
  }, []);
  return (
    <View style={{ marginBottom: 20 }}>
      {apiData !== "" && (
        <View style={{ marginBottom: 20 }}>
          {teamImage !== "" && (
            <ImageBackground
              source={{ uri: teamImage + "480x270.jpeg" }}
              resizeMode="cover"
              style={{
                height: 250,
                width: width,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  paddingVertical: 0,
                  paddingHorizontal: 15,
                  flex: 2,
                  alignItems: "flex-end",
                  flexDirection: "row",
                  width: width,
                  justifyContent: "flex-start",
                  marginBottom: 0,
                }}
              >
                <View
                  style={{
                    width: width / 2,
                    backgroundColor: "#ffffff",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingHorizontal: 2,
                    paddingVertical: 2,
                  }}
                >
                  <ThemedText
                    type="defaultSemiBold"
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      padding: 4,
                      paddingBottom: 0,
                    }}
                  >
                    {Config.translations[teamname]}
                  </ThemedText>
                  <ThemedText
                    type="defaultSemiBold"
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      display: "flex",
                    }}
                  >
                    {apiData.competition.name}
                  </ThemedText>
                </View>
              </View>
            </ImageBackground>
          )}
          <DataTable style={styles.tablecontainer}>
            <DataTable.Header style={styles.tablecontainer}>
              <DataTable.Title style={{ maxWidth: 20 }}>
                {" "}
                <Text style={{ color: Colors[colorScheme ?? "dark"].text }}>
                  P
                </Text>
              </DataTable.Title>
              <DataTable.Title style={{ minWidth: 155 }}>
                {" "}
                <Text style={{ color: Colors[colorScheme ?? "dark"].text }}>
                  Team
                </Text>
              </DataTable.Title>
              <DataTable.Title>
                {" "}
                <Text style={{ color: Colors[colorScheme ?? "dark"].text }}>
                  Sp.
                </Text>
              </DataTable.Title>
              <DataTable.Title style={{ minWidth: 15 }}>
                {" "}
                <Text style={{ color: Colors[colorScheme ?? "dark"].text }}>
                  S-U-N
                </Text>
              </DataTable.Title>
              <DataTable.Title>
                {" "}
                <Text style={{ color: Colors[colorScheme ?? "dark"].text }}>
                  Diff.
                </Text>
              </DataTable.Title>
              <DataTable.Title>
                {" "}
                <Text style={{ color: Colors[colorScheme ?? "dark"].text }}>
                  Pkt.
                </Text>
              </DataTable.Title>
            </DataTable.Header>
            {apiData.standings.map((item: any, index: any) => {
              return (
                <DataTable.Row
                  key={index}
                  style={{
                    backgroundColor:
                      item.team.name.full === vereinsname
                        ? Colors[colorScheme ?? "dark"].tableTeamHighlight
                        : "",
                  }}
                >
                  <DataTable.Cell style={{ maxWidth: 20 }}>
                    <Text
                      style={{
                        color:
                          item.team.name.full === vereinsname
                            ? Colors[colorScheme ?? "dark"]
                                .tableTeamHighlightText
                            : Colors[colorScheme ?? "dark"].text,
                      }}
                    >
                      {item.rank}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      minWidth: 160,
                      paddingRight: 10,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.team.image.path + "50x50.png" }}
                      alt="alt"
                      width={25}
                      height={25}
                      style={{
                        marginRight: 10,
                        alignSelf: "center",
                        marginBottom: -9,
                      }}
                    />
                    {item.team.name.full === vereinsname ? (
                      <Text
                        style={{
                          fontWeight: "bold",
                          color:
                            Colors[colorScheme ?? "dark"]
                              .tableTeamHighlightText,
                        }}
                      >
                        {item.team.name.full}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color:
                            item.team.name.full === vereinsname
                              ? Colors[colorScheme ?? "dark"]
                                  .tableTeamHighlightText
                              : Colors[colorScheme ?? "dark"].text,
                        }}
                      >
                        {item.team.name.full}
                      </Text>
                    )}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {" "}
                    <Text
                      style={{
                        color:
                          item.team.name.full === vereinsname
                            ? Colors[colorScheme ?? "dark"]
                                .tableTeamHighlightText
                            : Colors[colorScheme ?? "dark"].text,
                      }}
                    >
                      {item.matches}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ minWidth: 30 }}>
                    {" "}
                    <Text
                      style={{
                        color:
                          item.team.name.full === vereinsname
                            ? Colors[colorScheme ?? "dark"]
                                .tableTeamHighlightText
                            : Colors[colorScheme ?? "dark"].text,
                      }}
                    >
                      {item.wins}-{item.draws}-{item.defeats}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {" "}
                    <Text
                      style={{
                        color:
                          item.team.name.full === vereinsname
                            ? Colors[colorScheme ?? "dark"]
                                .tableTeamHighlightText
                            : Colors[colorScheme ?? "dark"].text,
                      }}
                    >
                      {item.goalDifference}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {" "}
                    <Text
                      style={{
                        color:
                          item.team.name.full === vereinsname
                            ? Colors[colorScheme ?? "dark"]
                                .tableTeamHighlightText
                            : Colors[colorScheme ?? "dark"].text,
                      }}
                    >
                      {item.points}
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
      )}
      <View style={{ paddingHorizontal: 15 }}>
        <Link
          href="/teams"
          style={{
            color: Colors[colorScheme ?? "dark"].teamColor,
            textAlign: "right",
          }}
        >
          alle Details zur {Config.translations[teamname]}{" "}
          <Ionicons
            name="chevron-forward-outline"
            size={12}
            style={{ marginRight: 0 }}
            ios="ios-chevron-forward-outline"
            color={Colors[colorScheme ?? "dark"].headerTintColor}
          />
        </Link>
      </View>
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
