import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  StyleProp,
  Animated,
  TextProps,
  Platform,
} from "react-native";

export interface ICodeInputProps {
  cursorAnimationDuration?: number;
  codeAnimationDuration?: number;
  value: string;
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
    customStyle?: StyleProp<ViewStyle>;
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
    customStyle?: StyleProp<ViewStyle>;
  };
  cursorStyle?: {
    color?: string;
    fontSize?: number;
    marginLeft?: number;
    marginTop?: number;
    customStyle?: StyleProp<TextProps>;
  };
  afterInputDelay?: number;
}

const DEFAULT_BACKGROUND_COLOR = "#F3F0F3";
const NUMBER_ANIMATION_DURATION = 300;
const CURSOR_ANIMATION_DURATION = 500;
const DEFAULT_CURSOR_COLOR = "#4A72FF";
const DEFAULT_WIDTH = 55;
const DEFAULT_HEIGHT = 70;
const DEFAULT_FONT_SIZE = 30;
const DEFAULT_FONT_WEIGHT = "bold";
const DEFAULT_AFTER_INPUT_DELAY = 50;
const DEFAULT_TEXT_COLOR = "black";

export const InputSingleItem: React.FC<ICodeInputProps> = (
  props: ICodeInputProps
) => {
  const [textValue, setTextValue] = useState("");
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [animatedValueCursor, setAnimatedValueCursor] = useState(
    new Animated.Value(0)
  );

  const {
    activeCodeContainerStyle,
    value,
    codeAnimationDuration,
    codeContainerStyle,
    cursorAnimationDuration,
    cursorStyle,
    index,
    textColor,
    afterInputDelay,
  } = props;

  const start = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: codeAnimationDuration
        ? codeAnimationDuration
        : NUMBER_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, codeAnimationDuration]);

  const startCursor = useCallback(() => {
    Animated.timing(animatedValueCursor, {
      toValue: 1,
      duration: cursorAnimationDuration
        ? cursorAnimationDuration
        : CURSOR_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animatedValueCursor, {
        toValue: 0,
        duration: cursorAnimationDuration
          ? cursorAnimationDuration
          : CURSOR_ANIMATION_DURATION,
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
    const currentIndex = index ? index : 0;
    const text =
      value.length <= currentIndex ? "" : value.substr(currentIndex, 1);
    if (text.length < textValue.length) {
      resetAnimationAfterDelete();
    }
    setTextValue(text);

    if (text.length === 1) {
      setTimeout(
        () => {
          start();
        },
        afterInputDelay ? afterInputDelay : DEFAULT_AFTER_INPUT_DELAY
      );
    }
  }, [
    value,
    index,
    afterInputDelay,
    start,
    textValue,
    resetAnimationAfterDelete,
  ]);

  useEffect(() => {
    if (textValue.length === 0) {
      setTimeout(
        () => {
          startCursor();
        },
        afterInputDelay ? afterInputDelay : DEFAULT_AFTER_INPUT_DELAY
      );
    }
  }, [textValue, afterInputDelay, startCursor]);

  return (
    <View
      style={
        value.length === index
          ? [
              styles.codeContainer,
              activeCodeContainerStyle,
              activeCodeContainerStyle?.customStyle,
            ]
          : [
              styles.codeContainer,
              codeContainerStyle,
              codeContainerStyle?.customStyle,
            ]
      }
      key={`code-field ${index ? index : 0}`}
    >
      <Animated.View
        style={{
          opacity: animatedValue,
        }}
      >
        <Text
          style={[
            {
              fontSize: codeContainerStyle?.inputFontSize
                ? codeContainerStyle?.inputFontSize
                : DEFAULT_FONT_SIZE,
              fontWeight: codeContainerStyle?.fontWeight
                ? codeContainerStyle?.fontWeight
                : DEFAULT_FONT_WEIGHT,
              color: textColor ? textColor : DEFAULT_TEXT_COLOR,
            },
          ]}
        >
          {textValue}
        </Text>
      </Animated.View>
      {textValue.length === 0 && value.length === index && (
        <Animated.View
          style={{
            opacity: animatedValueCursor,
          }}
        >
          <Text style={[styles.cursor, cursorStyle, cursorStyle?.customStyle]}>
            {"|"}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  codeContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: Platform.select({
      ios: 10,
      android: -20,
    }),
    color: DEFAULT_CURSOR_COLOR,
  },
});

export default InputSingleItem;
