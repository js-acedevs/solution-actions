// models
import UserDBModel from '../models/UserDB.model';

// interfaces
import { UserModel } from '../interfaces/models';
import { StatusCodeEnums } from '../interfaces/enums';

// utils
import { failure, ok, hashPassword, generateJWT } from '../utils';

export const RegisterService = {
    register: async (data: Pick<UserModel, 'name' | 'email' | 'password'>) => {
        const { name, email, password } = data;

        // Check if user with this email exists
        const user = await UserDBModel.query().findOne({ email });

        if (user) return failure('This user already exists!', StatusCodeEnums.USER_EXISTS);

        // insert user
        let insertUser: UserDBModel;

        try {
            insertUser = await UserDBModel.query().insert({
                name,
                email,
                password: await hashPassword(password)
            });
        } catch (error) {
            return failure({ 'Something went wrong': error });
        }

        return ok({ token: generateJWT(insertUser) });
    }
};
