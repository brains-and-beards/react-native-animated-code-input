import * as React from "react";
import * as ReactNative from "react-native";

declare module "react-native-animated-code-input" {
  interface ICodeInputProps {
    afterInputDelay?: number;
    cursorAnimationDuration?: number;
    codeAnimationDuration?: number;
    code: string;
    index?: number;
    // style props
    codeContainerStyle?: {
      backgroundColor?: string;
      borderWidth?: number;
      codeWidth?: number;
      codeHeight?: number;
      inputFontSize?: number;
      borderRadius?: number;
      fontWeight?:
        | "normal"
        | "bold"
        | "100"
        | "200"
        | "300"
        | "400"
        | "500"
        | "600"
        | "700"
        | "800"
        | "900";
      customStyle?: ReactNative.StyleProp<ReactNative.ViewStyle>;
    };
    activeCodeContainerStyle?: {
      backgroundColor?: string;
      borderWidth?: number;
      codeWidth?: number;
      codeHeight?: number;
      inputFontSize?: number;
      borderRadius?: number;
      fontWeight?:
        | "normal"
        | "bold"
        | "100"
        | "200"
        | "300"
        | "400"
        | "500"
        | "600"
        | "700"
        | "800"
        | "900";
      customStyle?: ReactNative.StyleProp<ReactNative.ViewStyle>;
    };
    cursorStyle?: {
      color?: string;
      fontSize?: number;
      marginLeft?: number;
      marginTop?: number;
      customStyle?: ReactNative.StyleProp<ReactNative.TextProps>;
    };
    textColor?: string;
  }

  interface IInputProps {
    autoFocus?: boolean;
    code: string;
    onBlur?: (
      e: ReactNative.NativeSyntheticEvent<ReactNative.TextInputFocusEventData>
    ) => void;
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
      | "password"
      | "newPassword"
      | "oneTimeCode";
  }

  interface AnimatedCodeInputProps extends ICodeInputProps, IInputProps {
    numberOfInputs: number;
    onSubmitCode: (codeValue: string) => void;
  }

  export default class AnimatedCodeInput extends React.Component<
    AnimatedCodeInputProps,
    any
  > {}
}
