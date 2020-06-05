import React, { useCallback } from "react";
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Keyboard,
  InteractionManager,
  StyleSheet,
} from "react-native";

export interface IInputProps {
  autoFocus?: boolean;
  value: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  textContentType?:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password";
}

interface IProps extends IInputProps {
  codeMaxLength: number;
  testID?: string;
  textInputRef: React.RefObject<TextInput>;
}

const NON_NUMBER_REGEX = /[^0-9]/g;

const InputField: React.FC<IProps> = (props: IProps) => {
  const {
    autoFocus,
    codeMaxLength,
    value,
    onBlur,
    onChangeText,
    onSubmit,
    testID,
    textContentType,
    textInputRef,
  } = props;

  const onChangeTextCallback = useCallback(
    (text: string) => {
      const numbersFromText = text.replace(NON_NUMBER_REGEX, "");
      const codeChanged = numbersFromText !== value;
      if (onChangeText) {
        onChangeText(numbersFromText);
      }
      if (codeChanged) {
        if (numbersFromText.length === codeMaxLength) {
          Keyboard.dismiss();
        }
      }
    },
    [codeMaxLength, value, onChangeText]
  );

  const onBlurCallback = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      InteractionManager.runAfterInteractions(() => {
        if (onSubmit && value.length === codeMaxLength) {
          onSubmit();
        }
      });
      if (onBlur) {
        onBlur(e);
      }
    },
    [onSubmit, onBlur]
  );

  return (
    <TextInput
      autoFocus={autoFocus || true}
      caretHidden={true}
      keyboardType="number-pad"
      onBlur={onBlurCallback}
      onChangeText={onChangeTextCallback}
      maxLength={codeMaxLength}
      ref={textInputRef}
      style={styles.input}
      testID={testID}
      textContentType={textContentType ? textContentType : "oneTimeCode"}
      value={value}
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
