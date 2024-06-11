import React, { useState } from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import Styles from './styles';
import { h, isValidateEmail, isValidPassword } from '../../extensions';
import MessageMultipleLanguage from '../../messages_mandatory';

interface Props {
  label?: string;
  labelStyles?: StyleProp<TextStyle>;
  spaceBetweenLabelAndTextInput?: number;
  spaceBetweenErrorAndTextInput?: number;
  inputProps: TextInputProps;
  inputStyles?: StyleProp<ViewStyle> | undefined;
  prefixIcon?: React.ReactElement;
  suffixIcon?: React.ReactElement;
  eyeOnIcon: React.ReactElement;
  eyeOffIcon: React.ReactElement;
  onPressSuffixIcon?: () => void;
  onChangeText: (text: string) => void;
  validType?: ValidType;
  errorStyles?: StyleProp<TextStyle>;
  borderColor: string;
  borderFocusColor: string;
  borderErrorColor: string;
  passwordValidType?: PasswordValidType;
  passWordError?: string | undefined;
  customRegexPassword?: () => boolean | undefined;
  value?: string;
  textError?: string;
  ref?: React.LegacyRef<TextInput> | undefined;
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
  custom,
}

const defaultProps = {
  secureTextEntry: false,
  validType: ValidType.none,
  textError: '',
};

const ComponentTextInputCustom = (props: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(
    props.validType === ValidType.password
  );
  const [textError, setTextError] = useState<string>('');
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  const checkValid = (text: string) => {
    const { validType, passwordValidType, passWordError, customRegexPassword } =
      props;

    switch (validType) {
      case ValidType.none:
        if (textError !== '') {
          setTextError('');
        }
        break;
      case ValidType.email:
        if (!isValidateEmail(text)) {
          setTextError(MessageMultipleLanguage.invalidEmail);
        } else {
          setTextError('');
        }
        break;
      case ValidType.password:
        if (!isValidPassword(text, passwordValidType, customRegexPassword)) {
          setTextError(passWordError ?? MessageMultipleLanguage.weakPassword);
        } else {
          setTextError('');
        }
        break;
      case ValidType.notEmpty:
        if (text.length == 0) {
          setTextError(MessageMultipleLanguage.canNotEmpty);
        } else {
          setTextError('');
        }
        break;
      default:
        break;
    }
  };

  const checkFocusBorder = () => {
    const { borderColor, borderFocusColor, borderErrorColor } = props;
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

  props = Object.assign({}, defaultProps, props);

  const {
    label,
    labelStyles,
    inputStyles,
    prefixIcon,
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
    ref,
    value,
  } = props;
  return (
    <View style={Styles.container}>
      {label ? <Text style={labelStyles}>{label}</Text> : null}
      {h(spaceBetweenLabelAndTextInput ?? 5)}
      <View
        style={[
          Styles.row,
          inputStyles,
          {
            borderColor: checkFocusBorder(),
          },
        ]}
      >
        {prefixIcon ? prefixIcon : null}
        <View style={Styles.flex}>
          <TextInput
            ref={ref}
            onFocus={() => {
              setHasFocus(true);
            }}
            onBlur={() => setHasFocus(false)}
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={(text) => {
              checkValid(text);
              onChangeText(text);
            }}
            {...inputProps}
          />
        </View>
        {suffixIcon || validType === ValidType.password ? (
          <TouchableOpacity
            onPress={() => {
              if (validType === ValidType.password) {
                setSecureTextEntry(!secureTextEntry);
              } else {
                if (onPressSuffixIcon) {
                  onPressSuffixIcon();
                }
              }
            }}
          >
            {suffixIcon ?? secureTextEntry ? eyeOnIcon : eyeOffIcon}
          </TouchableOpacity>
        ) : null}
      </View>
      {props.textError !== '' || textError !== '' ? (
        <>
          {h(spaceBetweenErrorAndTextInput ?? 5)}
          <Text style={errorStyles}>
            {props.textError !== '' ? props.textError : textError}
          </Text>
        </>
      ) : null}
    </View>
  );
};

export default ComponentTextInputCustom;
