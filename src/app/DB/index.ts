import config from '../config';
import { User } from '../modules/User/user.model';

const superUser = {
  email: 'shariarn85@gmail.com',
  password: config.super_admin_password,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({
    email: 'shariarn85@gmail.com',
  });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
