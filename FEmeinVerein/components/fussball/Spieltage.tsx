import { StyleSheet, useColorScheme } from "react-native";
import { ViewProps } from "react-native";
import { Colors } from "@/constants/Colors";
import { View, Text } from "react-native";
import { getStandingsFull } from "@/services/api";
import { ThemedText } from "@/components/ThemedText";
import { useState, useEffect } from "react";
import teams from "../../assets/standings.json";
import { Image } from "react-native";
import { DataTable } from "react-native-paper";
import { getFontSize } from "@/helper/font";
import { Config } from "@/config/config";

export type TabelleProps = ViewProps & {
  mode?: string;
  teamname: string;
};

export function Spieltage({ mode, teamname }: TabelleProps) {
  const [apiData, setApiData] = useState("");
  const vereinsname = Config.vereinsname;
  const colorScheme = useColorScheme();
  async function getData() {
    setApiData("");
  }
  useEffect(() => {
    if (apiData === "") {
      getData();
    }
  }, []);
  return (
    <View style={{}}>
      {apiData !== "" && (
        <View>
          <ThemedText
            type="defaultSemiBold"
            style={{
              paddingVertical: 10,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            {apiData.competition.name}
          </ThemedText>
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
