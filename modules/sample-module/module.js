const sampleModuleRouter = require("./routers/sample-module-router");

module.exports = app => {
    // load routes
    app.use("/sample-module", sampleModuleRouter);
}