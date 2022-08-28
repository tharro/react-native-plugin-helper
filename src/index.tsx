import ComponentButtonCustom from './components/button/ComponentButtonCustom';
import ComponentFlatListCustom from './components/flatlist/ComponentFlatListCustom';
import ComponentTextInputCustom, {
  ValidType,
  PasswordValidType,
} from './components/textInput/ComponentTextInputCustom';

import {
  h,
  w,
  HideKeyboard,
  convertUtcToLocalTime,
  isValidPassword,
  isValidToken,
  isValidateEmail,
} from './extensions';
import * as SizeScaling from 'react-native-size-scaling';
import * as VectorIcon from 'react-native-vector-icons';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import PushNotification from 'react-native-push-notification';
import Svg from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';
import * as ToastMessage from 'react-native-toast-message';

export {
  ComponentButtonCustom,
  ComponentTextInputCustom,
  ComponentFlatListCustom,
  ValidType,
  PasswordValidType,
  h,
  w,
  convertUtcToLocalTime,
  isValidPassword,
  isValidToken,
  isValidateEmail,
  HideKeyboard,
  SizeScaling,
  VectorIcon,
  DeviceInfo,
  Modal,
  PushNotification,
  Svg,
  SvgUri,
  ToastMessage,
};
