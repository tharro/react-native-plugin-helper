import React from 'react';
import { View } from 'react-native';
import Styles from './styles';

interface Props {
  label?: string;
}

interface State {
  label?: string;
}

export default class MyTextInputCustom extends React.Component<Props, State> {
  render() {
    return <View style={Styles.container}></View>;
  }
}
