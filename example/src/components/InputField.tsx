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
  textContentType?: string;
  testID?: string;
  textInputCode: React.RefObject<TextInput>;
  onSubmit: () => void;
}

const NUMBER_REGEX = /[^0-9]/g;

const InputField: FC<IProps> = (props) => {
  const {codeValue, codeMaxLength, onSubmit, onChangeText, onBlur} = props;

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
      autoFocus={props.autoFocus}
      caretHidden={true}
      keyboardType="number-pad"
      onBlur={onBlurCallback}
      onChangeText={onChangeTextCallback}
      maxLength={props.codeMaxLength}
      ref={props.textInputCode}
      style={styles.input}
      testID={props.testID}
      textContentType={props.textContentType ? 'oneTimeCode' : undefined}
      value={props.codeValue}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 0,
    height: 1,
    margin: 0,
    opacity: 0,
    padding: 0,
  },
});

export default InputField;
