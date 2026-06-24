import User from './user.model.js';

class UserService {
  async createUser(userData) {
    const user = await User.create(userData);
    return user;
  }

  async getAllUsers() {
    const users = await User.find({}).select('-password');
    return users;
  }

  async getUserById(id) {
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default new UserService();
