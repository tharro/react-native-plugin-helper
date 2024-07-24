import moment from 'moment';
import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { PasswordValidType } from './components/textInput/ComponentTextInputCustom';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  listenOrientationChange,
  removeOrientationListener,
} from 'react-native-responsive-screen';

/* RESPONSIVE UI - START */
export const wdp = (number: number | string) =>
  typeof number === 'string'
    ? widthPercentageToDP(number)
    : widthPercentageToDP((number / 375) * 100);

export const hdp = (number: number | string) =>
  typeof number === 'string'
    ? heightPercentageToDP(number)
    : heightPercentageToDP((number / 667) * 100);

export const lor = (component: Component<any, any>) =>
  listenOrientationChange(component);

export const rol = () => removeOrientationListener();

/* RESPONSIVE UI - END */

export const w = (a: number) => {
  return <View style={{ width: wdp(a) }} />;
};

export const h = (a: number) => {
  return <View style={{ height: hdp(a) }} />;
};

export const HideKeyboard = ({
  children,
}: {
  children: React.ReactElement;
}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const isValidateEmail = (email: string) => {
  var p: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return p.test(email);
};

export const convertUtcToLocalTime = (
  utc: string,
  format: string = 'DD/MM/YYYY HH:MM'
) => {
  return moment.utc(new Date(utc)).local().format(format);
};

export function isValidToken(expiredToken: number): boolean {
  var minutes: number = moment(expiredToken).diff(moment(), 'minutes');
  return minutes > 5;
}

export function isValidPassword(
  password: string,
  passwordValidType: PasswordValidType = PasswordValidType.atLeast8Characters,
  customRegexPassword?: (password: string) => boolean | undefined
) {
  switch (passwordValidType) {
    case PasswordValidType.custom:
      return customRegexPassword!(password);
    case PasswordValidType.atLeast8Characters:
      return password.length >= 8;
    case PasswordValidType.strongPassword:
      var regexPassword: RegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{8,99}/;
      return regexPassword.test(password);
    default:
      return true;
  }
}

/// Calculate the time between today's time and the set time.
///
/// Example
/// ```
/// DateTime now = DateTime.now(); // ~> 2023-09-09 07:00:00
/// String dateTime = '2023-09-09 09:00:00'
/// Strong formatTime = MyPluginHelper.convertTimeToHourOrDay(dateTime);
/// ```
/// Output: 2 hours
export function convertTimeToHourOrDay(
  dateTime: string,
  format: string = 'DD/MM/YYYY HH:MM'
) {
  try {
    var date = moment(dateTime, format);
    const dateNow = moment();
    const day = dateNow.diff(date, 'days');
    if (day === 0) {
      const hours = dateNow.diff(date, 'hours');
      if (hours === 0) {
        const minutes = dateNow.diff(date, 'minutes');
        if (minutes === 0) {
          const sec = dateNow.diff(date, 'seconds');
          return `${sec} second${sec > 1 ? 's' : ''}`;
        } else {
          return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
      } else {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
      }
    }
    if (day > 7) {
      return moment(date).format(format);
    }
    return `${day} day${day > 1 ? 's' : ''}`;
  } catch (e) {
    return '-:--';
  }
}
