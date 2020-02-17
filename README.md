# imageautocrop

Image Auto cropping having black background & white subject based on opencvjs. Note it is in still development.

## Step 1

import AutoCrop from 'imageautocrop';

## Step 2

const cordinates = AutoCrop.getCropingCordinates(document.querySelector('img'), width, height);
const cropedBase64 = AutoCrop.cropImage(document.querySelector('img'), cordinates);

# Note

1.This package is based on opencv Contours. So it Crops image having black background & White subject.
2.This one is still under development. Sometimes it throw error new cv.Mat is not a constructor. Kindly use setTimeout to fixit. In future it will be fixed.
