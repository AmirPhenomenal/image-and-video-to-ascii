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

export const setOptions = (options) => {
  if (options.height) settings.height = options.height;
  if (options.width) settings.width = options.width;
  if (options.fps) settings.fps = options.fps;
};
const pathValidation = async (path) => {
  return fs.existsSync(path);
};
export const getImageAscii = async (imgPath) => {
  try {
    if (!(await pathValidation(imgPath))) throw "Path Not Valid";
    let result = "";
    await jimp.read(imgPath).then((img) => {
      img.resize(settings.height, settings.width);
      for (let i = 0; i < settings.height; i++) {
        for (let j = 0; j < settings.width; j++) {
          const { r, g, b } = jimp.intToRGBA(img.getPixelColor(j, i));
          result += chalk.rgb(r, g, b).inverse("　");
        }
        result += "\n";
      }
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const printImage = async (imgPath) => {
  console.log(await getImageAscii(imgPath));
};

const extractingFrames = async (videoPath) => {
  if (!fs.existsSync("tmpFrames")) {
    fs.mkdirSync("tmpFrames");
  }
  await ffmpegExtractFrames({
    input: videoPath,
    output: "./tmpFrames/%d.png",
    fps: settings.fps,
  });
};
export const getVideoAscii = async (videoPath) => {
  try {
    if (!(await pathValidation(videoPath))) throw "Path Not Valid";
    await extractingFrames(videoPath);
    let frames = [];
    const tmpFrames = fs.readdirSync("./tmpFrames");
    for (let i = 1; i <= tmpFrames.length; i++) {
      const image = `./tmpFrames/${i}.png`;
      frames.push(await getImageAscii(image));
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
export const showVideo = async (videoPath) => {
  try {
    if (!(await pathValidation(videoPath))) throw "Path Not Valid";
    const frames = await getVideoAscii(videoPath);
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

//To Make Both Named And Default Import Work
export default {
  setOptions,
  getImageAscii,
  printImage,
  getVideoAscii,
  showVideo,
};
