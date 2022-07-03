import { Schema, Document, model, models } from 'mongoose'
import crypto from 'crypto';

import { iProfile } from '../types/profile.types';

export default interface iProfileModel extends Document, iProfile {
  setPassword(password: string): void
  validPassword(password: string): boolean
  mapper(): iProfile
}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      defaults: false,
    },
  },
  {
    timestamps: true,
  },
)

schema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

schema.methods.validPassword = function (password: string): boolean {
  if (!this.salt) this.salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.password === hash
}

schema.methods.mapper = function(): Omit<iProfile, 'password'> {
  return {
    name: this.name,
    login: this.login,
    admin: this.admin,
  }
}

export const Profile = models.Profile || model<iProfileModel>('Profile', schema)
