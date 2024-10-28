/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { Config } from "@/config/config";

const tintColorLight = Config.vereinsfarbe;
const tintColorDark = Config.vereinsfarbe;

//MAINTEAMCOLORS
const mainTeamColor = Config.vereinsfarbe;
const white = "#fff"

export const Colors = {
  light: {
    teamColor: mainTeamColor,
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    headerBackground: white,
    headlineColor: mainTeamColor,
    sliderBackground: mainTeamColor,
    white: white,
    green: mainTeamColor,
    black: "#000000",
    tabBarBackground: '#ffffff',
    tabBarActiveTintColor: mainTeamColor,
    textbg: "#FFFFFF",
    headline: mainTeamColor,
    headerTintColor: mainTeamColor,
    tableTeamHighlight: "#d0edcb",
    tableTeamHighlightText: "#000000",
    warningRed: "#ce1a1a"

  },
  dark: {
    teamColor: mainTeamColor,
    text: '#ffffff',
    background: '#000000',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    headerBackground: "#000000",
    headlineColor: mainTeamColor,
    sliderBackground: mainTeamColor,
    white: white,
    green: mainTeamColor,
    black: "#000000",
    tabBarBackground: "#000000",
    tabBarActiveTintColor: "#ffffff",
    textbg: "#000000",
    headline: mainTeamColor,
    headerTintColor: "#ffffff",
    tableTeamHighlight: "#6b9971",
    tableTeamHighlightText: "#ffffff",
    warningRed: "#ce1a1a"
  },
};
