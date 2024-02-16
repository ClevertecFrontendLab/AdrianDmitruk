class DASHBOARD {
    private auth = '/auth';

    LOGIN = this.auth;
    REGISTRATION = `${this.auth}/registration`;
    CONFIRM_EMAIL = `${this.auth}/confirm-email`;
    CHANGE_PASSWORD = `${this.auth}/change-password`;

    private result = '/result';

    RESULT = this.result;
    SUCCESS = `${this.result}/success`;
    SUCCESS_CHANGE_PASSWORD = `${this.result}/success-change-password`;
    ERROR = `${this.result}/error`;
    ERROR_LOGIN = `${this.result}/error-login`;
    ERROR_USER_EXIST = `${this.result}/error-user-exist`;
    ERROR_CHECK_EMAIL_NO_EXIST = `${this.result}/error-check-email-no-exist`;
    ERROR_CHECK_EMAIL = `${this.result}/error-check-email`;
    ERROR_CHANGE_PASSWORD = `${this.result}/error-change-password`;

    private main = '/main';

    HOME = this.main;
}

export const DASHBOARD_PAGES = new DASHBOARD();
