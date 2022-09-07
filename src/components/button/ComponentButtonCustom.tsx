import React, { ClassAttributes } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  View,
  FlexStyle,
} from 'react-native';
import Styles from './styles';

interface Props extends ClassAttributes<any> {
  label: string;
  onPress: () => void;
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

const ComponentButtonCustom = (props: Props) => {
  props = Object.assign({}, defaultProps, props);
  var flexDirection: FlexStyle['flexDirection'] = 'column';
  if (props.isWidthDynamic) {
    flexDirection = 'row';
  }

  const checkBackgroundColor = () => {
    if (!props.enable) {
      return props.disableColor;
    } else {
      if (props.isSecondary) {
        return props.secondaryColor;
      }
      if (props.isOutLine) {
        return props.outlineColor;
      }
    }
    return props.primaryColor;
  };

  const checkBorderColor = () => {
    if (!props.enable) {
      return props.borderDisableColor;
    } else {
      if (props.isSecondary) {
        return props.borderSecondaryColor;
      }
      if (props.isOutLine) {
        return props.borderOutlineColor;
      }
    }
    return props.borderPrimaryColor;
  };

  const checkTextColor = () => {
    if (!props.enable) {
      return props.textDisableColor;
    } else {
      if (props.isSecondary) {
        return props.textSecondaryColor;
      }
      if (props.isOutLine) {
        return props.textOutlineColor;
      }
    }
    return props.textPrimaryColor;
  };

  return (
    <View style={{ flexDirection: flexDirection }}>
      <TouchableOpacity
        {...props.buttonProps}
        onPress={() => {
          if (props.enable) {
            props.onPress();
          }
        }}
        style={[
          Styles.container,
          {
            backgroundColor: checkBackgroundColor(),
            borderColor: checkBorderColor(),
            borderRadius: props.borderRadius,
            height: props.height,
            width: props.width,
          },
          props.buttonStyles,
        ]}
      >
        {props.childrenLeft}
        <Text
          style={[
            props.labelStyles,
            {
              color: checkTextColor(),
            },
          ]}
        >
          {props.label}
        </Text>
        {props.childrenRight}
      </TouchableOpacity>
    </View>
  );
};

const defaultProps = {
  isSecondary: false,
  isOutLine: false,
  enable: true,
  borderRadius: 5,
  isWidthDynamic: false,
};

export default ComponentButtonCustom;
