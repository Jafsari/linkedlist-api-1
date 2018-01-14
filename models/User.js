const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { APIError, dbError } = require("../helpers");

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: "String",
      unique: true,
      required: true,
      maxlength: [55, "email has a 55 character limit"]
    },
    firstName: {
      type: "String",
      required: true,
      maxlength: [55, "first name has a 55 character limit"]
    },
    lastName: {
      type: "String",
      required: true,
      maxlength: [55, "last name has a 55 character limit"]
    },
    password: {
      type: "String",
      required: true,
      maxlength: [55, "passwords have a 55 character limit"]
    },
    username: {
      type: "String",
      unique: true,
      required: true,
      maxlength: [55, "usernames have a 55 character limit"]
    },
    photo: String,
    experience: [],
    education: [],
    skills: []
  },
  { timestamps: true }
);

// Auth methods & hooks
// userSchema.methods.comparePassword = (candidatePassword, next) => {
//   return bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     if (err) {
//       return next(err);
//     }
//     return next(null, isMatch);
//   });
// };

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  return bcrypt
    .hash(this.password, SALT_WORK_FACTOR)
    .then(hash => {
      this.password = hash;
      return next();
    })
    .catch(err => next(err));
});

userSchema.pre("findOneAndUpdate", function(next) {
  const password = this.getUpdate().password;
  if (!password) {
    return next();
  }
  try {
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    const hash = bcrypt.hashSync(password, salt);
    this.getUpdate().password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

// User CRUD logic
userSchema.statics = {
  createUser(newUser) {
    return this.findOne({ username: newUser.username })
      .exec()
      .then(user => {
        if (user) {
          throw new APIError(
            409,
            "User Already Exists",
            `There is already a user with username '${user.username}'.`
          );
        }
      })
      .then(() => newUser.save())
      .then(user => user.toObject())
      .catch(error => Promise.reject(dbError(error)));
  },
  // remember to include .populate('experience') for gets and update
  getUser(username) {
    return this.findOne({ username })
      .exec()
      .then(user => {
        if (!user) {
          throw new APIError(
            404,
            "User Not Found",
            `No user '${username}' found.`
          );
        }
        return user.toObject();
      })
      .catch(error => Promise.reject(dbError(error)));
  },
  getUsers(query, fields, skip, limit) {
    return this.find(query, fields)
      .skip(skip)
      .limit(limit)
      .sort({ username: 1 })
      .exec()
      .then(users => {
        if (users.length === 0) {
          return [];
        }
        return users.map(user => user.toObject());
      })
      .catch(error => Promise.reject(dbError(error)));
  },
  updateUser(username, userUpdate) {
    return this.findOneAndUpdate({ username }, userUpdate, { new: true })
      .exec()
      .then(user => {
        if (!user) {
          throw new APIError(
            404,
            "User Not Found",
            `No user with username '${username}' found.`
          );
        }
        return user.toObject();
      })
      .catch(error => Promise.reject(dbError(error)));
  },
  deleteUser(username) {
    return this.findOneAndRemove({ username })
      .exec()
      .then(user => {
        if (!user) {
          throw new APIError(
            404,
            "User Not Found",
            `No user '${username}' found.`
          );
        }
        return Promise.resolve({
          status: 200,
          title: "User Deleted",
          message: `User '${username}' successfully deleted.`
        });
      })
      .catch(error => Promise.reject(dbError(error)));
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
