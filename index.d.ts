import * as React from 'react';
import * as ReactNative from 'react-native';

declare module 'animated-number-input' {
  interface ICodeInputProps {
    cursorAnimationDuration?: number;
    codeAnimationDuration?: number;
    code: string;
    index?: number;
    textColor?: string;
    // style props
    codeContainerStyle?: {
      backgroundColor?: string;
      borderWidth?: number;
      codeWidth?: number;
      codeHeight?: number;
      inputFontSize?: number;
      borderRadius?: number;
      fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
      customStyle?: ReactNative.StyleProp<ReactNative.ViewStyle>;
    };
    activeCodeContainerStyle?: {
      backgroundColor?: string;
      borderWidth?: number;
      codeWidth?: number;
      codeHeight?: number;
      inputFontSize?: number;
      borderRadius?: number;
      fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
      customStyle?: ReactNative.StyleProp<ReactNative.ViewStyle>;
    };
    cursorStyle?: {
      color?: string;
      fontSize?: number;
      marginLeft?: number;
      marginTop?: number;
      customStyle?: ReactNative.StyleProp<ReactNative.TextProps>;
    };
    timeout?: number;
  }

  interface AnimatedNumberInputProps extends ICodeInputProps {
    numberOfInputs: number;
    code: string;
    onBlur: (e: ReactNative.NativeSyntheticEvent<ReactNative.TextInputFocusEventData>) => void;
    onChangeText: (text: string) => void;
    onSubmit: (codeValue: string) => void;
  }

  export default class AnimatedNumberInput extends React.Component<AnimatedNumberInputProps, any> {}
}
