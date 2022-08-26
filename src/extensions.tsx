import moment from 'moment';
import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { PasswordValidType } from './components/textInput/ComponentTextInputCustom';

export const w = (a: number) => {
  return <View style={{ width: a }} />;
};

export const h = (a: number) => {
  return <View style={{ height: a }} />;
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
  return moment.utc(utc).local().format('dd/MM/yyyy HH:mm');
};

export function isValidToken(expiredToken: number): boolean {
  const date = new Date(expiredToken * 1000);
  var minutes: number = moment(moment.now()).diff(date, 'minutes');
  return minutes > 5;
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
