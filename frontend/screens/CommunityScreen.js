import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import GlobalStyles, { colors } from "../styles/GlobalStyles";

export default function CommunityScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([
    { id: "1", user: "Aisha", content: "My new Monstera is thriving! 🌿" },
    { id: "2", user: "Ali", content: "Anyone knows how to revive a dry fern?" },
  ]);
  const [newPost, setNewPost] = useState("");

  // 🪄 useEffect Example
  useEffect(() => {
    console.log("Community Screen Loaded 🌿");
  }, []);

  const addPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now().toString(),
        user: "Sehrish",
        content: newPost,
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  return (
    <View style={GlobalStyles.container}>

      {/* 🪴 Header */}
      <Header title="Community 🌱" />

      {/* 💬 Add Post Input */}
      <View style={{ flexDirection: "row", alignItems: "center", margin: 15 }}>
        <TextInput
          placeholder="Share something..."
          value={newPost}
          onChangeText={setNewPost}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: colors.lightGray,
            borderRadius: 10,
            padding: 10,
            backgroundColor: colors.white,
            marginRight: 10,
          }}
        />
        <TouchableOpacity onPress={addPost} style={GlobalStyles.primary}>
          <Text style={GlobalStyles.textPrimary}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* 🧾 Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[GlobalStyles.card, { marginHorizontal: 15 }]}>
            <Text style={GlobalStyles.value}>{item.user}</Text>
            <Text
              style={[
                GlobalStyles.subtitle,
                { marginTop: 5, color: colors.darkText },
              ]}
            >
              {item.content}
            </Text>
          </View>
        )}
      />
    </View>
  );
}