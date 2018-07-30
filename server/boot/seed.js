const ROLES = [
  {
    name: 'admin',
    description: 'ANY operations',
  },
  {
    name: 'default',
    description: 'READ only',
  },
];
const USER_ADMIN = {
  username: 'admin',
  password: 'boss',
};

module.exports = (app) => {
  const { Role, BaseUser, RoleMapping } = app.models;
  /**
   * Seed Roles
   */
  ROLES.forEach(role => Role.findOrCreate({ where: { name: role.name } }, role));
  /**
   * Seed User Admin and map role
   */
  BaseUser.findOrCreate({
    where: { username: USER_ADMIN.username },
  }, USER_ADMIN, (err, userAdmin) => {
    if (err) throw err;
    Role.findOne({ where: { name: 'admin' } }, (err2, role) => {
      if (err2) throw err2;
      const roleMap = {
        principalId: userAdmin.id,
        roleId: role.id,
      };
      RoleMapping.findOrCreate({ where: roleMap }, roleMap, (err3) => {
        if (err3) throw err3;
      });
    });
  });
};
