import mongoose from "mongoose";
import { Password } from "../services/password";

// Interfaces
// Properties required to create a new User
interface UserAttrs {
  email: string;
  password: string;
  username: string;
  role: string;
}
// Properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
// Properties that a User document has
interface UserDoc extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  username: string;
  role: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
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

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc };
