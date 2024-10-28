import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "./ThemedText";
import { Image } from "react-native";
const HEADER_HEIGHT = 450;

type Props = PropsWithChildren<{
  data: any;
}>;

export default function NewsDetailRendering({ data }: Props) {
  const colorScheme = useColorScheme();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>
          {data.text.map((item: any) => {
            switch (item.type) {
              case "paragraph": {
                return item.children.map((subitem: any, index: any) => {
                  return subitem.text !== "" ? (
                    <ThemedText
                      key={index}
                      style={{
                        color: Colors[colorScheme ?? "dark"].text,
                        fontSize: 20,
                        lineHeight: 30,
                        paddingHorizontal: 22,
                      }}
                    >
                      {subitem.text}
                    </ThemedText>
                  ) : (
                    <ThemedText key={index} style={{}}></ThemedText>
                  );
                });

                break;
              }

              case "image": {
                return (
                  <Image
                    style={{ height: 300, width: 420 }}
                    source={{
                      uri: item.image.url,
                    }}
                  />
                );

                break;
              }
              case "list": {
                //statements;
                break;
              }
              case "heading": {
                //statements;
                break;
              }
              default: {
                //statements;
                break;
              }
            }
          })}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 400,
    paddingHorizontal: 0,
    paddingVertical: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "static",
  },
  content: {
    flex: 1,
    padding: 0,
    gap: 16,
    overflow: "hidden",
  },
});
