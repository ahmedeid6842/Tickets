import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  userName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) return next();
  if (!process.env.SALT_FACTORY) {
    throw new Error("You should set salt factory");
  }
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_FACTORY));
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcrypt.compare(userPassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("user", userSchema);
export default User;
