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

  const onBlur = useCallback(() => {}, []);

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
          // textInputCodeRef={textInputCode}
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

export default App;
