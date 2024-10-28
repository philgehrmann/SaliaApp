import { StyleSheet, useColorScheme } from "react-native";
import { ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { View, Text } from "react-native";
import { getTeamFull } from "@/services/api";
import { ThemedText } from "@/components/ThemedText";
import { useState, useEffect } from "react";
import teams from "../../assets/standings.json";
import { Image } from "react-native";
import { DataTable } from "react-native-paper";
import { getFontSize } from "@/helper/font";
import squad from "../../assets/squad.json";
import { Colors } from "@/constants/Colors";
import { Config } from "@/config/config";

export type TabelleProps = ViewProps & {
  teamname: string;
};

export function Team({ teamname }: TabelleProps) {
  const [apiData, setApiData] = useState("");
  const vereinsname = Config.vereinsname;
  const colorScheme = useColorScheme();
  async function getData() {
    const data = await getTeamFull(teamname);
    setApiData(data);
  }
  useEffect(() => {
    if (apiData === "") {
      getData();
    }
  }, []);
  return (
    <View style={{ paddingHorizontal: 15 }}>
      {apiData !== "" && (
        <>
          <View>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: Colors[colorScheme ?? "dark"].teamColor,
                borderBottomColor: Colors[colorScheme ?? "dark"].teamColor,
                paddingBottom: 10,
                marginBottom: 10,
              }}
            >
              <ThemedText type="defaultSemiBold">Trainerteam</ThemedText>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              {apiData.coaches.map((item: any, index: any) => {
                return (
                  <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                    <Image
                      source={{ uri: item.image.path + "320x400.jpeg" }}
                      alt="alt"
                      resizeMode="stretch"
                      height={120}
                      width={100}
                      style={{
                        marginRight: 10,
                        alignSelf: "flex-start",
                        marginBottom: 0,
                        borderRadius: 10,
                        shadowColor: "#000000",
                        shadowOpacity: 100,
                        shadowOffset: 20,
                        shadowRadius: 20,
                      }}
                    />
                    <ThemedText style={{ fontWeight: "bold", paddingTop: 5 }}>
                      {item.position}
                    </ThemedText>
                    <ThemedText>
                      {item.firstName} {item.lastName}
                    </ThemedText>
                  </View>
                );
              })}
            </View>
          </View>
          <View>
            {apiData.squad.map((item: any, index: any) => {
              return (
                <View style={{}}>
                  <View>
                    <View
                      style={{
                        borderBottomWidth: 0.5,
                        borderColor: Colors[colorScheme ?? "dark"].teamColor,
                        borderBottomColor:
                          Colors[colorScheme ?? "dark"].teamColor,
                        paddingBottom: 10,
                        marginTop: 20,
                        marginBottom: 10,
                      }}
                    >
                      <ThemedText type="defaultSemiBold">
                        {item.position}
                      </ThemedText>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                      }}
                    >
                      {item.players.map((players: any, index: any) => {
                        return (
                          <View
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 5,
                              maxWidth: 120,
                              position: "relative",
                            }}
                          >
                            {players.jerseyNumber !== "" && (
                              <View
                                style={{
                                  right: 15,
                                  top: 10,
                                  padding: 4,
                                  borderRadius: 2,

                                  position: "absolute",
                                  zIndex: 400,
                                  opacity: 1,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: getFontSize(20),
                                    fontWeight: "bold",
                                    color: Colors[colorScheme ?? "dark"].white,
                                  }}
                                >
                                  {players.jerseyNumber}
                                </Text>
                              </View>
                            )}
                            <Image
                              source={{
                                uri: players.image.path + "320x400.jpeg",
                              }}
                              alt="alt"
                              resizeMode="stretch"
                              height={110}
                              width={100}
                              style={{
                                marginRight: 10,
                                alignSelf: "flex-start",
                                marginBottom: 0,
                                borderRadius: 10,
                                shadowColor: "#000000",
                                shadowOpacity: 100,
                                shadowOffset: 20,
                                shadowRadius: 20,
                              }}
                            />
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{ paddingTop: 8 }}
                            >
                              <Text
                                style={{
                                  fontSize: getFontSize(11),
                                  color: Colors[colorScheme ?? "dark"].text,
                                }}
                              >
                                {players.firstName}{" "}
                              </Text>
                              <Text
                                style={{
                                  fontSize: getFontSize(11),
                                  color: Colors[colorScheme ?? "dark"].text,
                                }}
                                numberOfLines={2}
                              >
                                {players.lastName}
                              </Text>
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tablecontainer: {
    fontSize: 28,
    lineHeight: 32,
    padding: 0,
  },
});
