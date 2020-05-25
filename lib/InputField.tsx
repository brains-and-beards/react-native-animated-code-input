import React, {FC, useCallback} from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Keyboard,
  InteractionManager,
  StyleSheet,
} from 'react-native';

interface IProps {
  autoFocus?: boolean;
  codeMaxLength: number;
  codeValue?: string;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  textContentType?: string;
  testID?: string;
  textInputCode: React.RefObject<TextInput>;
}

const NUMBER_REGEX = /[^0-9]/g;

const InputField: FC<IProps> = (props) => {
  const {
    autoFocus,
    codeMaxLength,
    codeValue,
    onBlur,
    onChangeText,
    onSubmit,
    testID,
    textContentType,
    textInputCode,
  } = props;

  const onChangeTextCallback = useCallback(
    (text: string) => {
      const value = text.replace(NUMBER_REGEX, '');
      const codeChanged = value !== codeValue;
      onChangeText(value);
      if (codeChanged) {
        if (value.length === codeMaxLength) {
          Keyboard.dismiss();
        }
      }
    },
    [codeMaxLength, codeValue, onChangeText],
  );

  const onBlurCallback = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      InteractionManager.runAfterInteractions(() => {
        onSubmit();
      });
      onBlur(e);
    },
    [onSubmit, onBlur],
  );

  return (
    <TextInput
      autoFocus={autoFocus}
      caretHidden={true}
      keyboardType="number-pad"
      onBlur={onBlurCallback}
      onChangeText={onChangeTextCallback}
      maxLength={codeMaxLength}
      ref={textInputCode}
      style={styles.input}
      testID={testID}
      textContentType={textContentType ? 'oneTimeCode' : undefined}
      value={codeValue}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 1,
    height: 1,
    margin: 0,
    opacity: 0,
    padding: 0,
  },
});

export default InputField;
