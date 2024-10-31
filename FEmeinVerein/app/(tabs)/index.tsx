import { Image, StyleSheet, Platform, ScrollViewBase } from "react-native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { RefreshControl, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NewsSlider } from "@/components/NewsSlider";
import { NewsList } from "@/components/NewsList";
import Swiper from "react-native-screens-swiper";
import { Teams } from "@/components/TeamNavigation/Teams";
import { Ionicons } from "@expo/vector-icons";
import { Spieltage } from "@/components/fussball/Spieltage";
import { getFontSize } from "@/helper/font";
import { Link } from "expo-router";
import { Config } from "@/config/config";
import { View } from "react-native";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { Raleway_200ExtraLight } from "@expo-google-fonts/raleway";
import { Quicksand_300Light } from "@expo-google-fonts/quicksand";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { fetchArticles, getStandingsPreview } from "@/services/api";
import { Eilmeldung } from "@/components/Eilmeldung";
import { TabellePre } from "@/components/fussball/TabellePre";
import {
  requestUserPermission,
  NotificationListener,
} from "@/services/notificationService";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Raleway_200ExtraLight,
    Quicksand_300Light,
  });
  const colorScheme = useColorScheme();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [apiData, setApiData] = useState();
  const onRefresh = React.useCallback(() => {
    getData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  async function getData() {
    if (apiData !== "") {
      const res = await fetchArticles("de");
      setApiData(res);
    }
  }

  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    if (apiData !== "") {
      getData();
    }
  }, []);

  const navData = [
    {
      tabLabel: "Neuigkeiten",
      component: NewsList,
      props: { apiData: apiData },
    },
    {
      tabLabel: "Spieltage",
      component: Spieltage,
      props: {
        teamname: Config.teams.ersteMannschaft,
      },
    },
    {
      tabLabel: "Tabellen",
      component: TabellePre,
      props: {
        teams: [
          { team: Config.teams.ersteMannschaft },
          {
            team: Config.teams.zweiteMannschaft,
          },
        ],
      },
    },
    {
      tabLabel: "Nachwuchs",
      component: NewsList,
    },
  ];
  const styles = {
    pillsOverflow: {
      backroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      zIndex: -1,
      borderRadius: 20,
      marginTop: 10,
    },
    pillContainer: {
      backgroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      zIndex: -1,
      borderRadius: 20,
    },
    staticPillsContainer: {
      backroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      zIndex: 0,
      borderRadius: 20,
    },
    pillButton: {
      backgroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      borderRadius: 30,
    },
    pillActive: {
      backgroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      borderRadius: 20,
    },
    pillLabel: {
      color: Colors[colorScheme ?? "dark"].text,
      paddingBottom: 10,
      paddingTop: 10,
      textAlign: "left",
      fontSize: getFontSize(10),
      borderRadius: 3,
      overflow: "hidden",
    },
    activeLabel: {
      color: Colors[colorScheme ?? "dark"].white,
      paddingHorizontal: 10,
      fontWeight: "bold",
      backgroundColor: "#2a832f",
      borderRadius: 5,
    },
    borderActive: {
      borderColor: "transparent",
    },
  };
  // {apiData !== "" && <NewsSlider apiData={apiData} />}
  return (
    <ThemedView style={tw.style("rounded-[20px]")}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={32}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={"#4fc65d"}
            colors={[Colors[colorScheme ?? "dark"].green]}
            progressBackgroundColor={"#4fc65d"}
            progressViewOffset={2}
          />
        }
      >
        <View
          style={tw.style(
            "h-[400px] shadow-md shadow-opacity-75 rounded-bl-lg"
          )}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={["#4fc65d", "#2a832f"]}
            style={tw.style(
              "h-[400px] shadow-md rounded-bl-[75px] pt-[80px] px-6"
            )}
          >
            <View
              style={tw.style(
                "w-full border-[1px] border-[#000000] flex flex-row stretch "
              )}
            >
              <View style={tw.style("grow")}>
                <Text>
                  {" "}
                  <Image
                    source={require("../../assets/images/logo.png")}
                    alt="alt"
                    width={20}
                    height={20}
                    resizeMode={"cover"}
                    style={{
                      width: 30,
                      height: 40,
                    }}
                  />
                </Text>
              </View>
              <View style={tw.style("grow text-right grow justify-self-end")}>
                <Text style={tw.style("text-right")}>a</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={{ zIndex: 0 }}>
          <Swiper
            data={navData}
            isStaticPills={true}
            style={styles}
            stickyHeaderEnabled={true}
            scrollableContainer={false}
            stickyHeaderIndex={1}
          />
        </View>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headline: {
    color: Colors.light.headlineColor,
    fontSize: 24,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.dark.headerBackground,
    textAlign: "center",
    position: "static",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ffffff",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingLeft: 0,
    paddingRight: 0,
  },
  reactLogo: {
    height: 40,
    width: 40,
    bottom: 0,
    left: 0,
  },
  slideContainer: {
    height: 300,
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 20,
    gap: 0,
  },
});
