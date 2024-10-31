import { Image, StyleSheet, Platform, ScrollViewBase } from "react-native";
import React, { useEffect, useState } from "react";
import { RefreshControl, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NewsSlider } from "@/components/NewsSlider";
import { NewsList } from "@/components/NewsList";
import Swiper from "react-native-screens-swiper";
import { Teams } from "@/components/TeamNavigation/Teams";
import { getFontSize } from "@/helper/font";
import { Config } from "@/config/config";
import { Tabelle } from "@/components/fussball/Tabelle";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { fetchArticles, getStandingsPreview } from "@/services/api";
import { Team } from "@/components/fussball/Team";

export default function HomeScreen() {
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
    if (apiData !== "") {
      getData();
    }
  }, []);

  const data = [
    {
      tabLabel: "Neuigkeiten",
      component: NewsList,
      props: { apiData: apiData },
    },
    {
      tabLabel: "Ergebnisse",
      component: Teams,
      props: {
        apiData: apiData,
        teamname: Config.teams.ersteMannschaft,
        mannschaft: "1.Mannschaft",
      },
    },
    {
      tabLabel: "Tabelle",
      component: Tabelle,
      props: {
        apiData: apiData,
        teamname: Config.teams.zweiteMannschaft,
        mannschaft: "2.Mannschaft",
      },
    },
    {
      tabLabel: "Mannschaft",
      component: Team,
      props: {
        teamname: Config.teams.ersteMannschaft,
      },
    },
  ];
  const styles = {
    pillsOverflow: {
      backroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      zIndex: -1,
    },
    pillContainer: {
      backgroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      zIndex: -1,
      height: 60,
    },
    staticPillsContainer: {
      height: 40,
      backroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      zIndex: 0,
      marginTop: 60,
      marginBottom: 40,
    },
    pillButton: {
      backgroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      borderRadius: 20,
    },
    pillActive: {
      backgroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      height: 20,
    },
    pillLabel: {
      color: Colors[colorScheme ?? "dark"].text,
      paddingBottom: 10,
      textAlign: "left",
      fontSize: getFontSize(11),
    },
    activeLabel: {
      color: Colors[colorScheme ?? "dark"].teamColor,
      fontWeight: "bold",
      backgroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      paddingBottom: 5,
      borderRadius: 10,
    },
    borderActive: {
      borderColor: Colors.dark.green,
    },
  };
  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors[colorScheme ?? "dark"].green]}
          />
        }
      >
        {apiData !== "" && <NewsSlider apiData={apiData} />}
        <Swiper
          data={data}
          isStaticPills={true}
          style={styles}
          stickyHeaderEnabled={false}
          scrollableContainer={false}
          stickyHeaderIndex={0}
          // FlatList props
        />
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
