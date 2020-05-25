import * as React from 'react';
import * as ReactNative from 'react-native';

declare module 'animated-number-input' {
  interface AnimatedNumberInputProps extends ReactNative.TextInputProperties {}

  export default class AnimatedNumberInput extends React.Component<AnimatedNumberInputProps, any> {}
}
