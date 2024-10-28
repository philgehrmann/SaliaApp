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
import { Spieltage } from "@/components/fussball/Spieltage";
import { getFontSize } from "@/helper/font";
import { Link } from "expo-router";
import { Config } from "@/config/config";
import { View } from "react-native";
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
import * as Notifications from "expo-notifications";

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
  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      };
    },
  });
  const getToken = async () => {
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: "saliasechtemapp",
    });
    console.log("asdasd test2");
    console.log("device token: ", token.data);
  };

  useEffect(() => {
    getToken();
    if (apiData !== "") {
      getData();
    }
  }, []);

  const navData = [
    {
      tabLabel: "News",
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
    },
    pillContainer: {
      backgroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      zIndex: -1,
    },
    staticPillsContainer: {
      height: 35,
      backroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      zIndex: 0,
      marginTop: 20,
    },
    pillButton: {
      backgroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      borderRadius: 20,
    },
    pillActive: {
      backgroundColor: Colors[colorScheme ?? "dark"].tabBarBackground,
      height: 35,
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
      paddingBottom: 10,
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
        <Eilmeldung />
        {apiData !== "" && <NewsSlider apiData={apiData} />}
        <View style={{ position: "relative", zIndex: -1 }}>
          <Swiper
            data={navData}
            isStaticPills={true}
            style={styles}
            stickyHeaderEnabled={false}
            scrollableContainer={false}
            stickyHeaderIndex={0}
            // FlatList props
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
