import React, { FC, useState, useCallback } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import AnimatedNumberInput from "animated-number-input";

const App: FC = () => {
  const [code, setCode] = useState<string>("");

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

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Demo</Text>
        <AnimatedNumberInput
          code={code}
          numberOfInputs={5}
          onChangeText={onChangeText}
          onSubmitCode={onSubmit}
        />

        <View style={{ margin: 10 }} />

        <AnimatedNumberInput
          code={code}
          numberOfInputs={5}
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
          numberOfInputs={5}
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
    justifyContent: "center",
  },
  customCodeContainer: {
    backgroundColor: "#060054",
    color: "#c1cefa",
    borderRadius: 0,
  },
  customActiveCodeContainer: {
    backgroundColor: "#c1cefa",
    borderRadius: 0,
  },
  customCursorStyle: {
    color: "#00b5f5",
  },
  borderActiveCodeContainer: {
    backgroundColor: "transparent",
    borderRadius: 50,
    borderColor: "#b2b",
    width: 70,
    height: 70,
  },
  borderCodeContainer: {
    backgroundColor: "transparent",
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
    marginBottom: 50,
  },
});

export default App;
