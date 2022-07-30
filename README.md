

<h1 align="center"> Images And Video To Ascii </h1>


<p align="center">
<img alt="Project Preview Image" src="https://gcdnb.pbrd.co/images/oQV6SnZywOul.jpg?o=1" />
A Tool For Displaying <b>Images</b> And <b>Videos</b> In Terminal 🌅 
<p align="center">
With The Purpose Of Turning Boring Terminal Logs Into Cooler And More Beautiful Logs. ✨
</p>
<p align="center">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
 </p>
</p>
<h1 align="center">Intro</h1>
I Always wanted to add images to my server-side apps and cli apps to make it less boring and more beautiful so i decided to make this package for later uses . with this package you can start your apps with cool images and even videos ! 

<h1 align="center">Getting Started</h1>

### Install NPM Package
```sh
npm i image-and-video-to-ascii
```
### Import Package:
```javascript
// Default Import :

import  im2  from  "image-and-video-to-ascii";
im2.showImage("image.jpg")

// Named Import :

import {showImage} from  "image-and-video-to-ascii"
showImage("image.jpg")
```
### Simple Usage Image:
```javascript
import  im2  from  "image-and-video-to-ascii";

// Show Image In Terminal With Default Resize Options
im2.showImage("image.jpg")

// Show Image In Terminal With Resize Options
im2.showImage("image.jpg",{height : 75 , width : 75})

// Show Image In Terminal Without Resizing
im2.showImage("image.jpg",{noResize})

// Show Image In Terminal With Spaces
im2.showImage("image.jpg",{space : 20})
```
### Simple Usage Video:
```javascript
// Show Video In Terminal With Default Resize And FPS Options
import  im2  from  "image-and-video-to-ascii";
im2.showVideo("video.mp4")

// Show Video In Terminal With Resize Options
im2.showVideo("video.mp4",{height : 75 , width : 75})

// Show Video In Terminal Without Resizing
im2.showVideo("video.mp4",{noResize})

// Show Video In Terminal With FPS Option
im2.showVideo("video.mp4",{fps : 24})

// Show Video In Terminal With Spaces
im2.showVideo("video.mp4",{space : 20})
```
<h1 align="center">Methods </h1>

 - **showImage( ImagePath ,Options )** =>  Displays Image In Console/Terminal
   - ImagePath => String | Path To Image ( Can Be URL ) [required]
   - Options => Object | Spacing And Resizing Settings [optional]
     - height => Number | Resize Height
     - width=> Number | Resize Width
     - space=> Number | Spacing From Start Of Line
 - **showVideo( VideoPath , Options )** => Displays Video In Console/Terminal
   - VideoPath => String | Path To Video [required]
   - Options => Object | Spacing And Resizing Settings [optional]
     - height => Number | Resize Height
     - width=> Number | Resize Width
     - space=> Number | Spacing From Start Of Line
     - fps=> Number | Ascii Video FPS
 - **getImageAscii( ImagePath , Options )** => Returns String Of Colored Characters
   - ImagePath => String | Path To Video [required]
   - Options => Object | Spacing And Resizing Settings [optional]
     - height => Number | Resize Height
     - width=> Number | Resize Width
     - space=> Number | Spacing From Start Of Line
 - **getVideoAscii( VideoPath , Options )** => Returns Array Of Colored Characters String
   - VideoPath => String | Path To Video [required]
   - Options => Object | Spacing And Resizing Settings [optional]
     - height => Number | Resize Height
     - width=> Number | Resize Width
     - space=> Number | Spacing From Start Of Line
     - fps=> Number | Ascii Video FPS
 - **logWithSpace( Text , Space , Color)** =>  Prints A Text With Space And Color Options (Fancier console.log)
   - Text => String | Text To Print In Terminal [required]
   - Space => Number | Spacing From Start Of Line [required]
   - Color => String | Accepts Hex And Colors The Text [optional]
 - **setDefaultOptions( Settings )** =>  Changes The Default Options For Height , Width , FPS
   - Settings => Object | Resizing And Fps Settings [required]
       - height => Number | Resize Height 
	   - width=> Number | Resize Width
	   - fps=> Number | Ascii Video FPS
    
    
<h1 align="center">Notes</h1>
Use The Default Settings For Videos (height 50px , width 50px , fps 10) To Have Smoother Looks And Prevent Lags . ⭕️
Options Are Optional . If You Not Pass Any It Will Use Default Options ⭕️
