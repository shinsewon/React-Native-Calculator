import React, {memo, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface IBtnProps {
  btn: string | number;
  backgroundColor?: string;
  fontColor?: boolean;
  darkMode: boolean;
  minWidth?: string;
  getBackgroundColor?: (btn: string | number) => string;
  handleOnClick: (btn: string | number) => void;
}

const Button: React.FC<IBtnProps> = ({
  btn,
  backgroundColor,
  handleOnClick,
  minWidth,
  darkMode,
  fontColor,
}) => {
  const styles = StyleSheet.create({
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      height: 70,
      marginVertical: 15,
      marginHorizontal: 10,
      borderRadius: 50,
      borderWidth: 1,
      flex: 1,
    },
    textButton: {
      color: fontColor ? 'white' : darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 30,
    },
  });
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor, minWidth}]}
      onPress={() => handleOnClick(btn)}>
      <Text style={[styles.textButton]}>{btn}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
