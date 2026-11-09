import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../conf/sequelize.connection.ts";

const sequelize = sequelizeConnection.getSequelize();

interface IUser extends Model {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: "customer" | "admin";
  isActive: boolean;
  createdAt: Date;
}

const User = sequelize.define<IUser>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      allowNull: false,
      defaultValue: "customer",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "users",
    underscored: true,
    timestamps: true,
    updatedAt: false,
  },
);

export default User;