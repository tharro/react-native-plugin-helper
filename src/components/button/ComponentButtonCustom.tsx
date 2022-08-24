import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  View,
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
  width?: number | string;
  height: number | string;
  isWidthDynamic?: boolean;
  childrenLeft?: React.ReactElement;
  childrenRight?: React.ReactElement;
}

export default class ComponentButtonCustom extends React.Component<Props> {
  static defaultProps = {
    isSecondary: false,
    isOutLine: false,
    enable: true,
    borderRadius: 5,
    isWidthDynamic: false,
  };

  render() {
    return (
      <View
        style={{ flexDirection: this.props.isWidthDynamic ? 'row' : 'column' }}
      >
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
              height: this.props.height,
              width: this.props.width,
            },
            this.props.buttonStyles,
          ]}
        >
          {this.props.childrenLeft}
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
          {this.props.childrenRight}
        </TouchableOpacity>
      </View>
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
