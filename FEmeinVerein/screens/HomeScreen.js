import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../contexts/LanguageContext";
import { fetchArticles } from "../../services/api";

const HomeScreen = () => {
    const { language, switchLanguage } = useContext(LanguageContext);
    const [articles, setArticles] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const loadArticles = async () => {
            const fetchedArticles = await fetchArticles(language);
            setArticles(fetchedArticles);
        };

        loadArticles();
    }, [language]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title={`Switch to ${language === "en" ? "French" : "English"}`}
                    onPress={() => switchLanguage(language === "en" ? "fr" : "en")}
                    color="#6200ee"
                />
            </View>
            <FlatList
                data={articles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Article", { articleId: item.id })
                        }
                    >
                        <View style={styles.articleContainer}>
                            <Image
                                source={{
                                    uri:
                                        `http://localhost:1337` +
                                        item.cover[0].url,
                                }}
                                style={styles.image}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.author}>{item.author}</Text>
                                <Text style={styles.date}>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    //...
});

export default HomeScreen;