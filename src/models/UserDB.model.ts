import { Model } from 'objection';

export default class UserDBModel extends Model {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    created_at?: Date;
    updated_at?: Date;

    static tableName = 'users';

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'password'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string' },
                password: { type: 'string' },
                created_at: { type: 'date' },
                updated_at: { type: 'date' }
            }
        };
    }
}
