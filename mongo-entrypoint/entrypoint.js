var db = connect(
  `mongodb://${process.env.MONGODB_ROOTUSER}:${process.env.MONGODB_ROOTPASSWORD}@localhost:27017/admin`
);

db = db.getSiblingDB(process.env.MONGODB_DATABASE); // we can not use "use" statement here to switch db

db.createUser({
  user: process.env.MONGODB_USER,
  pwd: process.env.MONGODB_PASSWORD,
  roles: [{ role: "readWrite", db: process.env.MONGODB_DATABASE }],
  passwordDigestor: "server",
});
