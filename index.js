//Chalk for printing colors in terminal
//Jimp for proccessing image
//Ffmpeg for extracting frames out of video
//fs for checing and removing temp files
//Delay to add delay between frames
import chalk from "chalk";
import jimp from "jimp";
import ffmpegExtractFrames from "ffmpeg-extract-frames";
import fs from "fs";
import delay from "delay";
//This part is for extractor to work
import ffmpInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath(ffmpInstaller.path);

//Path to image (can feed url)
const imagePath = "tstiimg.jpg";

//Image Size And Video Fps Option
const settings = { height: 50, width: 50, fps: 10 };

export const setDefaultOptions = (options) => {
  if (options.height) settings.height = options.height;
  if (options.width) settings.width = options.width;
  if (options.fps) settings.fps = options.fps;
};
const pathValidation = async (path) => {
  return fs.existsSync(path);
};
export const getImageAscii = async (imgPath, opt) => {
  try {
    if (!(await pathValidation(imgPath))) throw "Path Not Valid";
    let result = "";
    let heightAndWidth = {};
    let spaces = opt && opt.space ? opt.space : 0;
    await jimp.read(imgPath).then((img) => {
      if (opt && (opt.noResize || opt.noResize == true)) {
        heightAndWidth.width = img.bitmap.width;
        heightAndWidth.height = img.bitmap.height;
      } else if (opt && opt.height && opt.width) {
        heightAndWidth = opt;
      } else {
        heightAndWidth = settings;
      }
      img.resize(heightAndWidth.height, heightAndWidth.width);

      for (let i = 0; i < heightAndWidth.height; i++) {
        for (let j = 0; j < heightAndWidth.width + spaces; j++) {
          if (j < spaces) {
            result += "　";
            continue;
          }
          const pixel = img.getPixelColor(j - spaces, i);
          if (pixel == 0) {
            result += "　";
          } else {
            const { r, g, b } = jimp.intToRGBA(pixel);
            result += chalk.rgb(r, g, b).inverse("　");
          }
        }
        result += "\n";
      }
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const showImage = async (imgPath, opt) => {
  console.log(await getImageAscii(imgPath, opt));
};

const extractingFrames = async (videoPath, fps) => {
  if (!fs.existsSync("tmpFrames")) {
    fs.mkdirSync("tmpFrames");
  }
  await ffmpegExtractFrames({
    input: videoPath,
    output: "./tmpFrames/%d.png",
    fps: fps,
  });
};
export const getVideoAscii = async (videoPath, opt) => {
  try {
    if (!(await pathValidation(videoPath))) throw "Path Not Valid";
    await extractingFrames(opt && opt.fps ? opt.fps : settings.fps);
    let frames = [];
    const tmpFrames = fs.readdirSync("./tmpFrames");
    for (let i = 1; i <= tmpFrames.length; i++) {
      const image = `./tmpFrames/${i}.png`;
      frames.push(await getImageAscii(image, opt));
    }
    await deleteTempFiles();
    return frames;
  } catch (error) {
    console.log(error);
  }
};

const deleteTempFiles = async () => {
  if (fs.existsSync("tmpFrames")) {
    fs.rmSync("tmpFrames", { recursive: true, force: true });
  }
};
export const showVideo = async (videoPath, opt) => {
  try {
    if (!(await pathValidation(videoPath))) throw "Path Not Valid";
    const frames = await getVideoAscii(videoPath, opt);
    for (let i = 0; i < frames.length; i++) {
      process.stdout.write(frames[i]);
      process.rawde;
      await delay(50);
      console.clear();
    }
  } catch (error) {
    console.log(error);
  }
};
export const logWithSpace = (text, space, color) => {
  try {
    let result = "";
    for (let i = 0; i < space; i++) {
      result += "　";
    }
    result += text;
    if (color && color.length != 0) {
      console.log(chalk.hex(color)(result));
      return;
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

//To Make Both Named And Default Import Work
export default {
  setDefaultOptions,
  getImageAscii,
  showImage,
  getVideoAscii,
  showVideo,
  logWithSpace,
};
