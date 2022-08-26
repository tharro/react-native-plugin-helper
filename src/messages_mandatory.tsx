class MessageMultipleLanguage {
  static noConnection: string = 'No internet connection';
  static emptyData: string = 'No data found';
  static reconnecting: string = 'Reconnecting...';
  static weakPassword: string = 'Weak password';
  static invalidEmail: string = 'Invalid email address';
  static canNotEmpty: string = 'This field cannot be empty';

  static setMessage({
    keyNoConnection,
    keyEmptyData,
    keyReconnecting,
    keyWeakPassword,
    keyCanNotEmpty,
    keyInvalidEmail,
  }: {
    keyNoConnection?: string;
    keyEmptyData?: string;
    keyReconnecting?: string;
    keyWeakPassword?: string;
    keyCanNotEmpty?: string;
    keyInvalidEmail?: string;
  }) {
    MessageMultipleLanguage.noConnection =
      keyNoConnection ?? MessageMultipleLanguage.noConnection;
    MessageMultipleLanguage.emptyData =
      keyEmptyData ?? MessageMultipleLanguage.emptyData;
    MessageMultipleLanguage.reconnecting =
      keyReconnecting ?? MessageMultipleLanguage.reconnecting;
    MessageMultipleLanguage.weakPassword =
      keyWeakPassword ?? MessageMultipleLanguage.weakPassword;
    MessageMultipleLanguage.invalidEmail =
      keyInvalidEmail ?? MessageMultipleLanguage.invalidEmail;
    MessageMultipleLanguage.canNotEmpty =
      keyCanNotEmpty ?? MessageMultipleLanguage.canNotEmpty;
  }
}

export default MessageMultipleLanguage;
