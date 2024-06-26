import React, { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ title, style, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity ref={ref} {...touchableProps} style={[styles.button, style as ViewStyle]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = {
  button: {
    alignItems: 'center',
    backgroundColor: '#6366f1', // indigo-500
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
  } as ViewStyle,
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  } as TextStyle,
};
