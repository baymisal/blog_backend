const { myDB, RoleBlog } = require('./models');

const syncDB = async () => {
  try {
    await myDB.sync({ force: false }); // Set to `true` if you want to drop and re-create tables
    console.log("All models synced");

    const defaultRoles = ['Admin', 'Author', 'Guest'];
    for (const roleName of defaultRoles) {
      await RoleBlog.findOrCreate({ where: { roleName } });
    }

    console.log("Default roles ensured");
  } catch (err) {
    console.error(" Error syncing DB:", err);
  }
};

syncDB();
