import { UserModel } from "../schemas/user.js";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async addLike({ user_id, currentUserId }) {
    const filter = { id: user_id };
    const update = { $inc: { likeCount: 1 }, $push: { likeUsers: currentUserId } }
    const option = { returnOriginal: false };

    const addedLike = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return addedLike;
  }

  static async removeLike({ user_id, currentUserId }) {
    const filter = { id: user_id };
    const update = { $inc: { likeCount: -1 }, $push: { likeUsers: currentUserId } }
    const option = { returnOriginal: false };

    const removedLike = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return removedLike;
  }
}

export { User };
