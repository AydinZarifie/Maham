const fs = require("fs");
const path = require("path")
const clearImage = async (estate) => {

  console.log(estate);

  const filePath = path.join(__dirname , `../uploads/images/estates/${estate.country_name}_${estate.city_name}_${estate.estate_title}`);
  console.log(filePath);

  fs.rmSync(filePath , {recursive : true} , (err) => {
    if(err){
      console.log("Delete files was failed");
    }
    else{
      console.log("Delete file successfully");
    }
  })

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