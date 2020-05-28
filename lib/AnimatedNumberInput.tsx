import React, { FC, useCallback, useRef } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import InputSingleItem, { ICodeInputProps } from "./InputSingleItem";
import InputField, { IInputProps } from "./InputField";

interface IProps extends ICodeInputProps, IInputProps {
  numberOfInputs: number;
  onSubmitCode: (codeValue: string) => void;
}

const AnimatedNumberInput: FC<IProps> = (props) => {
  const { code, numberOfInputs, onBlur, onChangeText, onSubmitCode } = props;
  const animatedNumberInputRef = useRef<TextInput>(null);

  const renderItem = useCallback(
    (index: number) => (
      <InputSingleItem
        code={code}
        key={`InputSingleItem ${index}`}
        index={index}
        {...props}
      />
    ),
    [code, props]
  );

  const onPressCode = useCallback(() => {
    animatedNumberInputRef.current?.focus();
  }, [animatedNumberInputRef]);

  const onSubmit = useCallback(() => {
    onSubmitCode(code);
  }, [code, onSubmitCode]);

  return (
    <>
      <TouchableOpacity
        onPress={onPressCode}
        style={styles.items}
        activeOpacity={1}
      >
        <View style={styles.container}>
          {Array(numberOfInputs || 1)
            .fill(0)
            .map((_item, index) => renderItem(index))}
        </View>
      </TouchableOpacity>
      <InputField
        textInputRef={animatedNumberInputRef}
        onChangeText={onChangeText}
        onBlur={onBlur}
        codeMaxLength={numberOfInputs || 1}
        code={code}
        testID={"Animated_Code_Input"}
        onSubmit={onSubmit}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  items: { alignItems: "stretch" },
});

export default AnimatedNumberInput;
