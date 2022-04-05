const User = require("./models/userModel");

//sayHello function
exports.sayHello = function (call, callback) {
  callback(null, { message: "Hello " + call.request.name });
};

//register function
exports.register = async function (call, callback) {
  await User.create({
    name: call.request.userName,
    email: call.request.email,
    password: call.request.password,
    occupation: call.request.occupation,
  });
  callback(null, {
    message: "201 created",
  });
};

//login function
exports.login = async function (call, callback) {
  let key = 1;
  let user = await User.findOne({
    name: call.request.userName,
  });
  if (user) {
    if (user.password === call.request.password) {
      key = 2;
    }
  }
  if (key === 1) {
    callback(null, {
      message: "400 bad requst, Invalid user credentials",
    });
  } else {
    callback(null, {
      message: `hey there ${call.request.userName}`,
    });
  }
};
