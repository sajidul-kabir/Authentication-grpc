const dotenv = require("dotenv");
const mongoose = require("mongoose");
const services = require("./services");

//////////////////////////////////////////////////////////////////////////
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

var PROTO_PATH = __dirname + "/auth.proto";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var auth_proto = grpc.loadPackageDefinition(packageDefinition).authPackage;
////////////////////////////////////////////////////////////////////////////

//main function
function main() {
  var server = new grpc.Server();
  server.addService(auth_proto.Auth.service, {
    sayHello: services.sayHello,
    register: services.register,
    login: services.login,
  });

  //database connection
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(console.log("database connected"));

  //server start
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("server started on port 50051");
    }
  );
}

main();
