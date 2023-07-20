const fs = require("fs");
const path = require("path")
const clearImage = async (filePath) => {
    filePath.forEach(async (imagePath) => {
      console.log(imagePath);
      imagePath = path.join(__dirname, "../", imagePath);
      if (await fs.existsSync(imagePath)) {
        await fs.unlinkSync(imagePath, (err) => {
          throw err;
        });
        console.log("Image deleted successfully");
      } else {
        console.log("Image not found");
      }
    });
};
const clearVideo = async (filePath) => {
    filePath.forEach(async (videoPath) => {
      console.log(videoPath);
      videoPath = path.join(__dirname, "../", videoPath);
      if (await fs.existsSync(videoPath)) {
        await fs.unlinkSync(videoPath, (err) => {
          throw err;
        });
        console.log("Video deleted successfully");
      } else {
        console.log("Image not found");
      }
    });
};

module.exports = {clearImage , clearVideo};