import React, { FC, useState, useCallback, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Platform } from "react-native";
import AnimatedNumberInput from "animated-number-input";
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
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Demo</Text>

        <AnimatedNumberInput
          code={code}
          numberOfInputs={NUMBER_OF_INPUTS}
          onChangeText={onChangeText}
          onSubmitCode={onSubmit}
          textColor={"black"}
          activeCodeContainerStyle={{
            customStyle: styles.simplyActiveCodeContainer,
          }}
          codeContainerStyle={{ customStyle: styles.simplyCustomCodeContainer }}
          cursorStyle={styles.simplyCursorStyle}
        />

        <View style={{ margin: 10 }} />

        <AnimatedNumberInput
          code={code}
          numberOfInputs={NUMBER_OF_INPUTS}
          onChangeText={onChangeText}
          onSubmitCode={onSubmit}
        />

        <View style={{ margin: 10 }} />

        <AnimatedNumberInput
          code={code}
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

        <AnimatedNumberInput
          code={code}
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 0,
    backgroundColor: "white",
  },
  simplyCustomCodeContainer: {
    backgroundColor: "#ffde1a",
    color: "#c1cefa",
    borderRadius: 0,
    borderColor: "black",
  },
  simplyCursorStyle: {
    color: "white",
  },
  simplyActiveCodeContainer: {
    backgroundColor: "#ffde1a",
    borderColor: "black",
    borderRadius: 0,
  },
  customCodeContainer: {
    backgroundColor: "#060054",
    color: "#c1cefa",
    borderRadius: 0,
  },
  customActiveCodeContainer: {
    backgroundColor: "#c1cefa",
    borderColor: "#060054",
    borderRadius: 0,
  },
  customCursorStyle: {
    color: "#00b5f5",
  },
  borderActiveCodeContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "#b2b",
    width: 70,
    height: 70,
  },
  borderCodeContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "#060054",
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
    marginBottom: 20,
  },
});

export default App;
