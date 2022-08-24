import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import Styles from './styles';

interface Props {
  label: string;
  onPress: Function;
  isSecondary?: boolean;
  isOutLine?: boolean;
  labelStyles: StyleProp<TextStyle>;
  buttonStyles?: StyleProp<ViewStyle>;
  buttonProps?: TouchableOpacityProps;
  primaryColor: string;
  secondaryColor: string;
  disableColor: string;
  outlineColor: string;
  borderPrimaryColor: string;
  borderSecondaryColor: string;
  borderDisableColor: string;
  borderOutlineColor: string;
  enable?: boolean;
  borderRadius?: number;
  textPrimaryColor: string;
  textSecondaryColor: string;
  textOutlineColor: string;
  textDisableColor: string;
}

export default class ComponentButtonCustom extends React.Component<Props> {
  static defaultProps = {
    isSecondary: false,
    isOutLine: false,
    enable: true,
    borderRadius: 5,
  };

  render() {
    return (
      <TouchableOpacity
        {...this.props.buttonProps}
        onPress={() => {
          if (this.props.enable) {
            this.props.onPress();
          }
        }}
        style={[
          Styles.container,
          {
            backgroundColor: this._checkBackgroundColor(),
            borderColor: this._checkBorderColor(),
            borderRadius: this.props.borderRadius,
          },
          this.props.buttonStyles,
        ]}
      >
        <Text
          style={[
            this.props.labelStyles,
            {
              color: this._checkTextColor(),
            },
          ]}
        >
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }

  _checkBackgroundColor = () => {
    if (!this.props.enable) {
      return this.props.disableColor;
    } else {
      if (this.props.isSecondary) {
        return this.props.secondaryColor;
      }
      if (this.props.isOutLine) {
        return this.props.outlineColor;
      }
    }
    return this.props.primaryColor;
  };

  _checkBorderColor = () => {
    if (!this.props.enable) {
      return this.props.borderDisableColor;
    } else {
      if (this.props.isSecondary) {
        return this.props.borderSecondaryColor;
      }
      if (this.props.isOutLine) {
        return this.props.borderOutlineColor;
      }
    }
    return this.props.borderPrimaryColor;
  };

  _checkTextColor = () => {
    if (!this.props.enable) {
      return this.props.textDisableColor;
    } else {
      if (this.props.isSecondary) {
        return this.props.textSecondaryColor;
      }
      if (this.props.isOutLine) {
        return this.props.textOutlineColor;
      }
    }
    return this.props.textPrimaryColor;
  };
}
