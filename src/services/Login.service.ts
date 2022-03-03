// models
import UserDBModel from '../models/UserDB.model';

// interfaces
import { UserModel } from '../interfaces/models';
import { StatusCodeEnums } from '../interfaces/enums';

// utils
import { failure, ok, comparePassword, generateJWT } from '../utils';

export const LoginService = {
    login: async (data: Pick<UserModel, 'email' | 'password'>) => {
        const { email, password } = data;

        // Check if user with this email exists
        const user = await UserDBModel.query().findOne({ email });

        if (!user) return failure("This email doesn't exist!", StatusCodeEnums.INVALID_CREDENTIALS);

        /**
         * Compares hashed password with the one from input
         */
        const passwordIsValid = await comparePassword(password, user.password);

        if (!passwordIsValid) return failure('Invalid Credentials', StatusCodeEnums.INVALID_CREDENTIALS);

        return ok({ token: generateJWT(user) });
    }
};
