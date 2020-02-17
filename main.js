var cv = require("./opencv");
const getCropingCordinates = (imgElement, width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(imgElement, 0, 0, width, height);

  // reading canvas image using open cv
  const src = cv.imread(canvas);
  const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(src, src, 120, 200, cv.THRESH_BINARY);
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  // finding different cordinates using contorus
  cv.findContours(
    src,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  );
  let maxArea = 0;
  let cordinates = {};
  // drwaing and finding biggest cordinates
  for (let i = 0; i < contours.size(); ++i) {
    const color = new cv.Scalar(
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255)
    );
    cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
    // getting particular boundary
    const cnt = contours.get(i);
    const rect = cv.boundingRect(cnt);
    const area = rect.width * rect.height;
    // finding max area based on previous value
    if (area > maxArea) {
      cordinates = rect;
      maxArea = area;
    }
  }
  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();
  return cordinates;
};
const cropImage = (image, croppingCoords) => {
  const cc = croppingCoords;
  const workCan = document.createElement("canvas"); // create a canvas
  workCan.width = Math.floor(cc.width); // set the canvas resolution to the cropped image size
  workCan.height = Math.floor(cc.height);
  const ctx = workCan.getContext("2d"); // get a 2D rendering interface
  ctx.drawImage(image, -Math.floor(cc.x), -Math.floor(cc.y)); // draw the image offset to place it correctly on the cropped region
  return workCan.toDataURL();
};
module.exports = { getCropingCordinates, cropImage };
