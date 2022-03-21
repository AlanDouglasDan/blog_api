import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, immutable: true, unique: true, required: true },
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  savedItems: { type: Array, required: true},
}, { timestamps: true });

userSchema.pre('save', function generateHash(next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  return next();
});

userSchema.methods.validPassword = (newPassword, oldPassword) => {
  const result = bcrypt.compareSync(newPassword, oldPassword);
  return result;
};

export default userSchema;
