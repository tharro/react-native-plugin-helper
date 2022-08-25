import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

export const w = (a: number) => {
  return <View style={{ width: a }} />;
};
export const h = (a: number) => {
  return <View style={{ height: a }} />;
};

export const HideKeyboard = ({
  children,
}: {
  children: React.ReactElement;
}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
