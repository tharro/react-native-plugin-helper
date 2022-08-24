import React from 'react';
import { View } from 'react-native';

export const w = (a: number) => {
  return <View style={{ width: a }} />;
};
export const h = (a: number) => {
  return <View style={{ height: a }} />;
};
