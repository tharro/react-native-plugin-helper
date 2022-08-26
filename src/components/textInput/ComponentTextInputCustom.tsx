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
import { h, isValidateEmail, isValidPassword } from '../../extensions';
import MessageMultipleLanguage from '../../messages_mandatory';

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
  onPressSuffixIcon?: () => void;
  widthIcon?: number;
  heightIcon?: number;
  onChangeText: (text: string) => void;
  validType?: ValidType;
  errorStyles?: StyleProp<TextStyle>;
  borderColor: string;
  borderFocusColor: string;
  borderErrorColor: string;
  passwordValidType?: PasswordValidType;
  onRef?: (ref: TextInput | null) => void;
  value?: string;
  textError?: string;
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
    textError: '',
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
        if (!isValidateEmail(text)) {
          this.setState({
            textError: MessageMultipleLanguage.invalidEmail,
          });
        } else {
          this.setState({
            textError: '',
          });
        }
        break;
      case ValidType.password:
        if (isValidPassword(text, passwordValidType)) {
          this.setState({
            textError: MessageMultipleLanguage.weakPassword,
          });
        } else {
          this.setState({
            textError: '',
          });
        }
        break;
      case ValidType.notEmpty:
        if (isValidateEmail(text)) {
          this.setState({
            textError: MessageMultipleLanguage.canNotEmpty,
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
      onChangeText,
      suffixIcon,
      onPressSuffixIcon,
      validType,
      eyeOffIcon,
      eyeOnIcon,
      errorStyles,
      spaceBetweenLabelAndTextInput,
      spaceBetweenErrorAndTextInput,
      onRef,
      value,
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
              ref={(r) => {
                if (onRef) {
                  onRef(r);
                }
              }}
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
        {this.props.textError !== '' || textError !== '' ? (
          <>
            {h(spaceBetweenErrorAndTextInput ?? 5)}
            <Text style={errorStyles}>
              {this.props.textError !== '' ? this.props.textError : textError}
            </Text>
          </>
        ) : null}
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
