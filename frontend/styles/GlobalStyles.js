// frontend/styles/GlobalStyles.js
import { StyleSheet } from "react-native";

const colors = {
  primary: "#2e7d32",
  secondary: "#e8f5e9",
  background: "#f5fff5",
  white: "#ffffff",
  gray: "#555",
  lightGray: "#ccc",
  darkText: "#333",
  border: "#ddd",
  success: "#4caf50",
  error: "#f44336",
  info: "#2196f3",
};

const text = {
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkText,
    marginBottom: 8,
    width: "90%",
    alignSelf: "center",
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  body: {
    fontSize: 16,
    color: colors.darkText,
    lineHeight: 22,
    width: "90%",
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.white,
    marginBottom: 15,
    width: "90%",
    alignSelf: "center",
  },
  resultText: {
    fontSize: 16,
    color: colors.darkText,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    textAlign: "center",
    marginTop: 5,
  },
  successText: {
    fontSize: 14,
    color: colors.success,
    textAlign: "center",
    marginTop: 5,
  },
};

const layout = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 60,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  section: {
    marginVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
};

const buttons = {
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
    width: "70%",
    alignSelf: "center",
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
    width: "70%",
    alignSelf: "center",
  },
  danger: {
    backgroundColor: colors.error,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
    width: "70%",
    alignSelf: "center",
  },
  textPrimary: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  textSecondary: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
};

const images = {
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  plant: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  plantLarge: {
    width: 200,
    height: 200,
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 20,
  },
};

const components = {
  inputContainer: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    width: "90%",
    alignSelf: "center",
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  statsContainer: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    width: "90%",
    alignSelf: "center",
  },
};

const GlobalStyles = StyleSheet.create({
  ...layout,
  ...text,
  ...buttons,
  ...images,
  ...components,
});

export { colors, text, layout, buttons, images, components };
export default GlobalStyles;