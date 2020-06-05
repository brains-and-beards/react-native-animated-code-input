import React, { FC, useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AnimatedCodeInput from "@brainsbeards/react-native-animated-code-input";
import Clipboard from "@react-native-community/clipboard";

const NON_NUMBER_REGEX = /[^0-9]/g;
const NUMBER_OF_INPUTS = 5;

const App: FC = () => {
  const [code, setCode] = useState<string>("");
  let intervalId: NodeJS.Timeout;

  const onChangeText = useCallback((text: string) => {
    setCode(text);
  }, []);

  const onSubmit = useCallback((codeValue: string) => {
    Alert.alert(
      "DONE",
      codeValue,
      [{ text: "OK", onPress: () => setCode("") }],
      { cancelable: false }
    );
  }, []);

  const readFromClipboard = useCallback(async () => {
    const clipboardContent = await Clipboard.getString();
    const value = clipboardContent.replace(NON_NUMBER_REGEX, "");
    if (value.length === NUMBER_OF_INPUTS) {
      setCode(value);
      onSubmit(value);
      await Clipboard.setString("");
      clearInterval(intervalId);
    }
  }, []);

  // To handle sms code after click "Copy "NUMBER"" ("Copy "12345"") option on Android
  useEffect(() => {
    if (Platform.OS === "android") {
      intervalId = setInterval(() => readFromClipboard(), 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []); // if you want to observe code all the time, replace [] with [code]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.scrollContainer}>
          <Text style={styles.title}>
            react-native-animated-code-input demo
          </Text>
          <View>
            <AnimatedCodeInput
              value={code}
              numberOfInputs={NUMBER_OF_INPUTS}
              onChangeText={onChangeText}
              onSubmitCode={onSubmit}
              textColor={"black"}
              activeCodeContainerStyle={{
                customStyle: styles.simplyActiveCodeContainer,
              }}
              codeContainerStyle={{
                customStyle: styles.simplyCustomCodeContainer,
              }}
              cursorStyle={styles.simplyCursorStyle}
            />

            <View style={{ margin: 10 }} />

            <AnimatedCodeInput
              value={code}
              numberOfInputs={NUMBER_OF_INPUTS}
              onChangeText={onChangeText}
              onSubmitCode={onSubmit}
            />

            <View style={{ margin: 10 }} />

            <AnimatedCodeInput
              value={code}
              numberOfInputs={NUMBER_OF_INPUTS}
              onChangeText={onChangeText}
              onSubmitCode={onSubmit}
              textColor={"white"}
              activeCodeContainerStyle={{
                customStyle: styles.customActiveCodeContainer,
              }}
              codeContainerStyle={{ customStyle: styles.customCodeContainer }}
              cursorStyle={styles.customCursorStyle}
            />

            <View style={{ margin: 10 }} />

            <AnimatedCodeInput
              value={code}
              numberOfInputs={NUMBER_OF_INPUTS}
              onChangeText={onChangeText}
              onSubmitCode={onSubmit}
              textColor={"black"}
              activeCodeContainerStyle={{
                customStyle: styles.borderActiveCodeContainer,
              }}
              codeContainerStyle={{ customStyle: styles.borderCodeContainer }}
              cursorStyle={styles.cursorStyle}
            />
            <View style={{ margin: 10 }} />
          </View>
        </View>
      </ScrollView>
      <Text style={styles.footnote}>Coded with ❤️ by Brains & Beards</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffde1a",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
  },
  simplyCustomCodeContainer: {
    backgroundColor: "#ffde1a",
    color: "#c1cefa",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  simplyCursorStyle: {
    color: "black",
  },
  simplyActiveCodeContainer: {
    backgroundColor: "#ffde1a",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
  },
  customCodeContainer: {
    backgroundColor: "#060054",
    color: "#c1cefa",
    borderRadius: 5,
  },
  customActiveCodeContainer: {
    backgroundColor: "#c1cefa",
    borderColor: "#060054",
    borderRadius: 10,
  },
  customCursorStyle: {
    color: "#00b5f5",
  },
  borderActiveCodeContainer: {
    backgroundColor: "#ffde1a",
    borderRadius: 50,
    borderColor: "#b2b",
    borderWidth: 2,
    width: 70,
    height: 70,
  },
  borderCodeContainer: {
    backgroundColor: "#ffde1a",
    borderRadius: 50,
    borderColor: "#060054",
    borderWidth: 2,
    width: 70,
    height: 70,
  },
  cursorStyle: {
    color: "transparent",
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    marginBottom: 60,
  },
  footnote: {
    textAlign: "center",
    marginBottom: 10,
  },
});

export default App;
