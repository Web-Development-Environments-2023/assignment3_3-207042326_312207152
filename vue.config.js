module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    // host: "132.72.65.211"
    // host: "localhost"

    //this work remote!!!
    // host: "http://132.73.84.138:8080"
    host: "nofandsha.cs.bgu.ac.il"

  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
