import React, {FC, useState, useEffect, useCallback} from 'react';
import {View, Text, ViewStyle, StyleSheet, StyleProp, Animated, TextProps} from 'react-native';

export interface ICodeInputProps {
  cursorAnimationDuration?: number;
  codeAnimationDuration?: number;
  code: string;
  index?: number;
  selectedInputBigger?: boolean;
  // style props
  codeContainerStyle?: {
    backgroundColor?: string;
    borderWidth?: number;
    codeWidth?: number;
    codeHeight?: number;
    inputFontSize?: number;
    borderRadius?: number;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    customStyle?: StyleProp<ViewStyle>;
  };
  activeCodeContainerStyle?: {
    backgroundColor?: string;
    borderWidth?: number;
    codeWidth?: number;
    codeHeight?: number;
    inputFontSize?: number;
    borderRadius?: number;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    customStyle?: StyleProp<ViewStyle>;
  };
  cursorStyle?: {
    color?: string;
    fontSize?: number;
    customStyle?: StyleProp<TextProps>;
  };
  timeout?: number;
}

const DEFAULT_BACKGROUND_COLOR = '#F3F0F3';
const NUMBER_ANIMATION_DURATION = 400;
const CURSOR_ANIMATION_DURATION = 700;
const DEFAULT_CURSOR_COLOR = '#4A72FF';
const DEFAULT_WIDTH = 55;
const DEFAULT_HEIGHT = 70;
const DEFAULT_FONT_SIZE = 30;
const DEFAULT_FONT_WEIGHT = 'bold';
const DEFAULT_TIMEOUT = 500;

export const InputSingleItem: FC<ICodeInputProps> = (props: ICodeInputProps) => {
  const [textValue, setTextValue] = useState('');
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [animatedValueCursor, setAnimatedValueCursor] = useState(new Animated.Value(0));

  const {
    activeCodeContainerStyle,
    code,
    codeAnimationDuration,
    codeContainerStyle,
    cursorAnimationDuration,
    cursorStyle,
    index,
    timeout,
  } = props;

  const start = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: codeAnimationDuration ? codeAnimationDuration : NUMBER_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, codeAnimationDuration]);

  const startCursor = useCallback(() => {
    Animated.timing(animatedValueCursor, {
      toValue: 1,
      duration: cursorAnimationDuration ? cursorAnimationDuration : CURSOR_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animatedValueCursor, {
        toValue: 0,
        duration: cursorAnimationDuration ? cursorAnimationDuration : CURSOR_ANIMATION_DURATION,
        useNativeDriver: true,
      }).start(() => {
        startCursor();
      });
    });
  }, [animatedValueCursor, cursorAnimationDuration]);

  const resetAnimationAfterDelete = useCallback(() => {
    setAnimatedValueCursor(new Animated.Value(0));
    setAnimatedValue(new Animated.Value(0));
  }, []);

  useEffect(() => {
    const currentIndex = props.index ? props.index : 0;
    const text = props.code.length <= currentIndex ? '' : props.code.substr(currentIndex, 1);
    if (text.length < textValue.length) {
      resetAnimationAfterDelete();
    }
    setTextValue(text);

    if (text.length === 1) {
      setTimeout(
        () => {
          start();
        },
        timeout ? timeout : DEFAULT_TIMEOUT,
      );
    }
  }, [props.code, props.index, timeout, start, textValue, resetAnimationAfterDelete]);

  useEffect(() => {
    if (textValue.length === 0) {
      setTimeout(
        () => {
          startCursor();
        },
        timeout ? timeout : DEFAULT_TIMEOUT,
      );
    }
  }, [textValue, timeout, startCursor]);

  return (
    <View
      style={
        props.code.length === props.index
          ? [styles.codeContainer, activeCodeContainerStyle]
          : [styles.codeContainer, codeContainerStyle]
      }
      key={`code-field ${props.index ? props.index : 0}`}>
      <Animated.View
        style={{
          opacity: animatedValue,
        }}>
        <Text
          style={[
            {
              fontSize: codeContainerStyle?.inputFontSize ? codeContainerStyle?.inputFontSize : DEFAULT_FONT_SIZE,
              fontWeight: codeContainerStyle?.fontWeight ? codeContainerStyle?.fontWeight : DEFAULT_FONT_WEIGHT,
            },
          ]}>
          {textValue}
        </Text>
      </Animated.View>
      {textValue.length === 0 && code.length === index && (
        <Animated.View
          style={{
            opacity: animatedValueCursor,
          }}>
          <Text style={[styles.cursor, cursorStyle]}>{'|'}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  codeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: DEFAULT_BACKGROUND_COLOR,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
  },
  cursor: {
    fontSize: 35,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    marginLeft: 20,
    marginTop: 10,
    color: DEFAULT_CURSOR_COLOR,
  },
});

export default InputSingleItem;
