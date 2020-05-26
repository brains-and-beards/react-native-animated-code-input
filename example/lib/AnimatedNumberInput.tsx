import React, { FC, useCallback, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleSheet,
} from "react-native";

import InputSingleItem, { ICodeInputProps } from "./InputSingleItem";
import InputField from "./InputField";

interface IProps extends ICodeInputProps {
  numberOfInputs: number;
  code: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText: (text: string) => void;
  onSubmit: (codeValue: string) => void;
}

const AnimatedNumberInput: FC<IProps> = (props) => {
  const { code, numberOfInputs, onBlur, onChangeText, onSubmit } = props;
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
    if (animatedNumberInputRef === null) {
      return;
    }

    animatedNumberInputRef.current?.focus();
  }, [animatedNumberInputRef]);

  const onCodeSubmit = useCallback(() => {
    onSubmit(code);
  }, [code, onSubmit]);

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
        textInputCode={animatedNumberInputRef}
        autoFocus={true}
        onChangeText={onChangeText}
        onBlur={onBlur}
        codeMaxLength={numberOfInputs || 1}
        codeValue={code}
        testID={"Code_Input"}
        onSubmit={onCodeSubmit}
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
