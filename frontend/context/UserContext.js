import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🟢 Load user from AsyncStorage when app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  // 💾 Save user automatically when it changes
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
        }
      } catch (error) {
        console.log("Error saving user:", error);
      }
    };
    saveUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

