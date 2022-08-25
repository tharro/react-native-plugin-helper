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
  TextStyle,
} from 'react-native';
import Styles from './styles';
import SvgUri from 'react-native-svg-uri';
import { MyPluginHelper } from 'react-native-plugin-helper';
import { h } from 'src/extensions';

interface Props {
  label?: string;
  labelStyles?: StyleProp<TextStyle>;
  spaceBetweenLabelAndTextInput?: number;
  spaceBetweenErrorAndTextInput?: number;
  inputProps: TextInputProps;
  inputStyles: StyleProp<ViewStyle>;
  prefixIcon?: ImageURISource;
  suffixIcon?: ImageURISource;
  eyeOnIcon?: ImageURISource;
  eyeOffIcon?: ImageURISource;
  onPressSuffixIcon?: Function;
  widthIcon?: number;
  heightIcon?: number;
  value: string;
  onChangeText: Function;
  validType?: ValidType;
  errorStyles?: StyleProp<TextStyle>;
  borderColor: string;
  borderFocusColor: string;
  borderErrorColor: string;
  passwordValidType?: PasswordValidType;
}

interface State {
  secureTextEntry?: boolean;
  textError?: string;
  hasFocus?: boolean;
}

export enum ValidType {
  none,
  password,
  email,
  notEmpty,
  cardNumber,
  expired,
  cvv,
}

export enum PasswordValidType {
  atLeast8Characters,
  strongPassword,
}

export default class ComponentTextInputCustom extends React.Component<
  Props,
  State
> {
  static defaultProps = {
    secureTextEntry: false,
    validType: ValidType.none,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      secureTextEntry: this.props.validType === ValidType.password,
      textError: '',
      hasFocus: false,
    };
  }

  _checkValid = (text: string) => {
    const { validType, passwordValidType } = this.props;
    const { textError } = this.state;
    switch (validType) {
      case ValidType.none:
        if (textError !== '') {
          this.setState({
            textError: '',
          });
        }
        break;
      case ValidType.email:
        if (!MyPluginHelper.isValidateEmail(text)) {
          this.setState({
            textError: 'key_invalid_email',
          });
        } else {
          this.setState({
            textError: '',
          });
        }
        break;
      case ValidType.password:
        if (MyPluginHelper.isValidPassword(text, passwordValidType)) {
          this.setState({
            textError: 'key_invalid_password',
          });
        } else {
          this.setState({
            textError: '',
          });
        }
        break;
      case ValidType.notEmpty:
        if (MyPluginHelper.isValidateEmail(text)) {
          this.setState({
            textError: 'key_input_cannot_empty',
          });
        } else {
          this.setState({
            textError: '',
          });
        }
        break;
      default:
        break;
    }
  };

  render() {
    const {
      label,
      labelStyles,
      inputStyles,
      prefixIcon,
      widthIcon,
      heightIcon,
      inputProps,
      value,
      onChangeText,
      suffixIcon,
      onPressSuffixIcon,
      validType,
      eyeOffIcon,
      eyeOnIcon,
      errorStyles,
      spaceBetweenLabelAndTextInput,
      spaceBetweenErrorAndTextInput,
    } = this.props;
    const { textError } = this.state;
    return (
      <View style={Styles.container}>
        {label ? <Text style={labelStyles}>{label}</Text> : null}
        {h(spaceBetweenLabelAndTextInput ?? 5)}
        <View
          style={[
            Styles.row,
            {
              borderColor: this._checkFocusBorder(),
            },
            inputStyles,
          ]}
        >
          {prefixIcon ? (
            <SvgUri source={prefixIcon} width={widthIcon} height={heightIcon} />
          ) : null}
          <View style={Styles.flex}>
            <TextInput
              onFocus={() => {
                this.setState({
                  hasFocus: true,
                });
              }}
              onBlur={() =>
                this.setState({
                  hasFocus: false,
                })
              }
              value={value}
              secureTextEntry={this.state.secureTextEntry}
              onChangeText={(text) => {
                this._checkValid(text);
                onChangeText(text);
              }}
              {...inputProps}
            />
          </View>
          {suffixIcon || validType === ValidType.password ? (
            <TouchableOpacity
              onPress={() => {
                if (validType === ValidType.password) {
                  this.setState({
                    secureTextEntry: !this.state.secureTextEntry,
                  });
                } else {
                  if (onPressSuffixIcon) {
                    onPressSuffixIcon();
                  }
                }
              }}
            >
              <SvgUri
                source={
                  suffixIcon ??
                  (this.state.secureTextEntry ? eyeOnIcon : eyeOffIcon)
                }
                width={widthIcon}
                height={heightIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {h(spaceBetweenErrorAndTextInput ?? 5)}
        <Text style={errorStyles}>{textError}</Text>
      </View>
    );
  }

  _checkFocusBorder = () => {
    const { hasFocus, textError } = this.state;
    const { borderColor, borderFocusColor, borderErrorColor } = this.props;
    if (textError !== '') {
      return borderErrorColor;
    } else {
      if (hasFocus) {
        return borderFocusColor;
      } else {
        return borderColor;
      }
    }
  };
}
