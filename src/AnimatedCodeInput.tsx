import React, { useCallback, useRef } from "react";

import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import InputSingleItem, { ICodeInputProps } from "./InputSingleItem";
import InputField, { IInputProps } from "./InputField";

interface IProps extends ICodeInputProps, IInputProps {
  numberOfInputs: number;
  onSubmitCode: (codeValue: string) => void;
}

const AnimatedCodeInput: React.FC<IProps> = (props: IProps) => {
  const { value, numberOfInputs, onBlur, onChangeText, onSubmitCode } = props;
  const animatedCodeInputRef = useRef<TextInput>(null);

  const renderItem = useCallback(
    (index: number) => (
      <InputSingleItem
        {...props}
        value={value}
        key={`InputSingleItem ${index}`}
        index={index}
      />
    ),
    [value, props]
  );

  const onPressCode = useCallback(() => {
    animatedCodeInputRef.current?.focus();
  }, [animatedCodeInputRef]);

  const onSubmit = useCallback(() => {
    onSubmitCode(value);
  }, [value, onSubmitCode]);

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
        {...props}
        textInputRef={animatedCodeInputRef}
        onChangeText={onChangeText}
        onBlur={onBlur}
        codeMaxLength={numberOfInputs || 1}
        value={value}
        testID={"Animated_Code_Input"}
        onSubmit={onSubmit}
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

export default AnimatedCodeInput;
