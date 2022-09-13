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

export const hdp = (number: number) =>
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
  var p: RegExp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return email.match(p);
};

export const convertUtcToLocalTime = (utc: string) => {
  return moment.utc(utc).local().format('DD/MM/YYYY HH:mm');
};

export function isValidToken(expiredToken: number): boolean {
  var minutes: number = moment().diff(new Date(expiredToken), 'minutes');
  return minutes < -5;
}

export function isValidPassword(
  password: string,
  passwordValidType: PasswordValidType = PasswordValidType.atLeast8Characters
) {
  switch (passwordValidType) {
    case PasswordValidType.atLeast8Characters:
      return password.length >= 8;
    case PasswordValidType.strongPassword:
      var regexPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{8,99}/;
      return password.match(regexPassword);
  }
}
