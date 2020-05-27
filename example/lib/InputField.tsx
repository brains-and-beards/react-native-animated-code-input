import React, { FC, useCallback } from "react";
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
  code: string;
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

const InputField: FC<IProps> = (props) => {
  const {
    autoFocus,
    codeMaxLength,
    code,
    onBlur,
    onChangeText,
    onSubmit,
    testID,
    textContentType,
    textInputRef,
  } = props;

  const onChangeTextCallback = useCallback(
    (text: string) => {
      const value = text.replace(NON_NUMBER_REGEX, "");
      const codeChanged = value !== code;
      if (onChangeText) {
        onChangeText(value);
      }
      if (codeChanged) {
        if (value.length === codeMaxLength) {
          Keyboard.dismiss();
        }
      }
    },
    [codeMaxLength, code, onChangeText]
  );

  const onBlurCallback = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      InteractionManager.runAfterInteractions(() => {
        if (onSubmit && code.length === codeMaxLength) {
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
      value={code}
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
