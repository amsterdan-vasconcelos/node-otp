import * as signIn from './signIn';
import * as signUp from './signUp';
import * as useOTP from './useOTP';

export const usersController = {
  ...signIn,
  ...signUp,
  ...useOTP,
};
