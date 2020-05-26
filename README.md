# Animated Number Input

A React Native component for animated code input for iOS, Android and React Native Web.

## Demo

## Getting started

```
npm 

yarn
```

Run example:

```
 cd example
 yarn install
 cd ios
 pod install
 cd ..
 react-native run-ios
## Example


```
import React, {FC, useRef, useState, useCallback} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import AnimatedNumberInput from 'animated-number-input';

const App: FC = () => {
  const textInputCode = useRef<TextInput>(null);
  const [code, setCode] = useState<string>('');

  const onChangeText = useCallback((text: string) => {
    console.log('code', text);
    setCode(text);
  }, []);

  const onSubmit = useCallback((codeValue: string) => {
    console.log('DONE ', codeValue);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <AnimatedNumberInput
          code={code}
          numberOfInputs={6}
          onBlur={onBlur}
          onChangeText={onChangeText}
          textInputCodeRef={textInputCode}
          onSubmit={onSubmit}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
```

## Attributes

Properties for this component:  

| Prop                          | Type         | Default | Description                                                 |
| ----------------------------- | ------------ | ------- | ----------------------------------------------------------- |
| `cursorAnimationDuration`     | number       | 500     | cursor animation duration                                   |
| `codeAnimationDuration`       | number       | 500     | code animation duration container                           |
| `code` (**Required**)         | string       | ''      | code string                                                 |
| `index`                       | number       | 0       | active code input                                           |
| `codeContainerStyle`          | style object | {}      | custom input style                                          |
| `activeCodeContainerStyle`    | style object | {}      | custom active input style                                   |
| `cursorStyle`                 | style object | {}      | custom cursor style                                         |
| `timeout`                     | number       | 100     | timeout after something is type in input                    |
| `numberOfInputs`              | number       | 1       | number of code inputs                                       |
| `onBlur`                      | function     | void    | callback that is called when the text input is blurred.     |
| `onChangeText` (**Required**) | function     | void    | callback that is called when the text input's text changes. |
| `onSubmit` (**Required**)     | function     | void    | callback function called when every code input has a value  |
