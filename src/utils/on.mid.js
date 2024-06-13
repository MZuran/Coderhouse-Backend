process.on("exit", (code) => {
    console.log("just before closing");
    console.log(code);
  });
  process.on("uncaughtException", (exc) => {
    console.log("uncaught Exception");
    console.log(exc);
  });
  process.on("message", (message) => {
    console.log("when it receives a message from another process");
    console.log(message);
  });
  console();
  process.exit();