import React, {FC, useCallback} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleSheet,
} from 'react-native';

import InputSingleItem, {ICodeInputProps} from './InputSingleItem';
import InputField from './InputField';

interface IProps extends ICodeInputProps {
  numberOfInputs: number;
  code: string;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText: (text: string) => void;
  textInputCodeRef: React.RefObject<TextInput>;
  onSubmit: (codeValue: string) => void;
}

const BrainilyInput: FC<IProps> = (props) => {
  const {
    code,
    numberOfInputs,
    textInputCodeRef,
    onChangeText,
    onBlur,
    onSubmit,
  } = props;

  const renderItem = useCallback(
    (index: number) => (
      <InputSingleItem
        code={code}
        key={`InputSingleItem ${index}`}
        index={index}
        {...props}
      />
    ),
    [code],
  );

  const onPressCode = useCallback(() => {
    if (textInputCodeRef === null) return;

    textInputCodeRef.current?.focus();
  }, []);

  const onCodeSubmit = useCallback(() => {
    onSubmit(props.code);
  }, [props.code]);

  return (
    <>
      <TouchableOpacity
        onPress={onPressCode}
        style={styles.items}
        activeOpacity={1}>
        <View style={styles.container}>
          {Array(numberOfInputs)
            .fill(0)
            .map((_item, index) => renderItem(index))}
        </View>
      </TouchableOpacity>
      <InputField
        textInputCode={textInputCodeRef}
        autoFocus={true}
        onChangeText={onChangeText}
        onBlur={onBlur}
        codeMaxLength={numberOfInputs}
        codeValue={code}
        testID={'Code_Input'}
        onSubmit={onCodeSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  items: {alignItems: 'stretch'},
});

export default BrainilyInput;
