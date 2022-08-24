import React from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextInput,
  TextInputProps,
  ImageURISource,
  TouchableOpacity,
} from 'react-native';
import Styles from './styles';
import { h } from '../../extensions';
import SvgUri from 'react-native-svg-uri';
interface Props {
  label?: string;
  labelStyles?: StyleProp<ViewStyle>;
  spaceBetweenLabelAndTextInput: number;
  inputProps: TextInputProps;
  inputStyles?: StyleProp<ViewStyle>;
  prefixIcon: ImageURISource;
  suffixIcon: ImageURISource;
  onPressSuffixIcon: Function;
}

interface State {
  label?: string;
}

export default class ComponentTextInputCustom extends React.Component<
  Props,
  State
> {
  static defaultProps = {};

  render() {
    return (
      <View style={Styles.container}>
        {this.props.label ? (
          <Text style={this.props.labelStyles}>{this.props.label}</Text>
        ) : null}
        {h(this.props.spaceBetweenLabelAndTextInput ?? 5)}
        <View style={[Styles.row, this.props.inputStyles]}>
          <SvgUri source={this.props.prefixIcon} width={30} height={30} />
          <View style={Styles.flex}>
            <TextInput {...this.props.inputProps} />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (this.props.onPressSuffixIcon) {
                this.props.onPressSuffixIcon();
              }
            }}
          >
            <SvgUri source={this.props.suffixIcon} width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
