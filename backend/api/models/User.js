import { DataTypes, Model } from "sequelize"
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class User extends Model {

    validatePassword = async (password) => {
        return await bcrypt.compare(password, this.password);
      };
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[A-Za-z]+(\s[A-Za-z]+)*$/gi,
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[A-Za-z]+(\s[A-Za-z]+)*$/gi,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                len: [5, 15],
              },
        }
    },
    {
        sequelize: connection,
        modelName: "User",
        tableName: 'users',
        timestamps: false
    }
)

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

export default User;
    