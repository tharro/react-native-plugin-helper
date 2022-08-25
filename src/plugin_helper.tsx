import moment from 'moment';
import { PasswordValidType } from './components/textInput/ComponentTextInputCustom';

class MyPluginHelper {
  static isValidateEmail = (email: string) => {
    var p: RegExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return email.match(p);
  };

  static convertUtcToLocalTime = (utc: string) => {
    return moment.utc(utc).local().format('dd/MM/yyyy HH:mm');
  };

  static isValidToken(expiredToken: number): boolean {
    const date = new Date(expiredToken * 1000);
    var minutes: number = moment(moment.now()).diff(date, 'minutes');
    return minutes > 5;
  }

  static isValidPassword(
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
}

export default MyPluginHelper;
