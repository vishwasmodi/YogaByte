import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";

const color = "aqua";
const boundingBoxColor = "red";
const lineWidth = 2;

export const tryResNetButtonName = "tryResNetButton";
export const tryResNetButtonText = "[New] Try ResNet50";
const tryResNetButtonTextCss = "width:100%;text-decoration:underline;";
const tryResNetButtonBackgroundCss = "background:#e61d5f;";

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isMobile() {
  return isAndroid() || isiOS();
}

function setDatGuiPropertyCss(propertyText, liCssString, spanCssString = "") {
  var spans = document.getElementsByClassName("property-name");
  for (var i = 0; i < spans.length; i++) {
    var text = spans[i].textContent || spans[i].innerText;
    if (text == propertyText) {
      spans[i].parentNode.parentNode.style = liCssString;
      if (spanCssString !== "") {
        spans[i].style = spanCssString;
      }
    }
  }
}

export function updateTryResNetButtonDatGuiCss() {
  setDatGuiPropertyCss(
    tryResNetButtonText,
    tryResNetButtonBackgroundCss,
    tryResNetButtonTextCss
  );
}

/**
 * Toggles between the loading UI and the main canvas UI.
 */
export function toggleLoadingUI(
  showLoadingUI,
  loadingDivId = "loading",
  mainDivId = "main"
) {
  if (showLoadingUI) {
    document.getElementById(loadingDivId).style.display = "block";
    document.getElementById(mainDivId).style.display = "none";
  } else {
    document.getElementById(loadingDivId).style.display = "none";
    document.getElementById(mainDivId).style.display = "block";
  }
}

function toTuple({ y, x }) {
  return [y, x];
}

export function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      scale,
      ctx
    );
  });
}

export function calculateAngle(keypoint1, keypoint2, keypoint3) {
  var AB = Math.sqrt(
    Math.pow(keypoint2.x - keypoint1.x, 2) +
      Math.pow(keypoint2.y - keypoint1.y, 2)
  );
  var BC = Math.sqrt(
    Math.pow(keypoint2.x - keypoint3.x, 2) +
      Math.pow(keypoint2.y - keypoint3.y, 2)
  );
  var AC = Math.sqrt(
    Math.pow(keypoint3.x - keypoint1.x, 2) +
      Math.pow(keypoint3.y - keypoint1.y, 2)
  );

  var angle =
    Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * (180 / Math.PI);

  if (angle < 0) {
    angle += 360;
  }
  return angle;
}

export function classifyPose(keypoints) {
  var label = "Unknown Pose";
  var left_elbow_angle = calculateAngle(
    keypoints[5].position,
    keypoints[7].position,
    keypoints[9].position
  );

  var right_elbow_angle = calculateAngle(
    keypoints[6].position,
    keypoints[8].position,
    keypoints[10].position
  );

  var left_shoulder_angle = calculateAngle(
    keypoints[7].position,
    keypoints[5].position,
    keypoints[11].position
  );

  var right_shoulder_angle = calculateAngle(
    keypoints[12].position,
    keypoints[6].position,
    keypoints[8].position
  );

  var left_knee_angle = calculateAngle(
    keypoints[11].position,
    keypoints[13].position,
    keypoints[15].position
  );

  var right_knee_angle = calculateAngle(
    keypoints[12].position,
    keypoints[14].position,
    keypoints[16].position
  );

  console.log(left_elbow_angle);
  console.log(right_elbow_angle);
  console.log(left_shoulder_angle);
  console.log(right_shoulder_angle);
  console.log(left_knee_angle);
  console.log(right_knee_angle);

  if (
    left_elbow_angle > 165 &&
    left_elbow_angle < 195 &&
    right_elbow_angle > 165 &&
    right_elbow_angle < 195
  ) {
    if (
      left_shoulder_angle > 80 &&
      left_shoulder_angle < 110 &&
      right_shoulder_angle > 80 &&
      right_shoulder_angle < 110
    ) {
      if (
        (left_knee_angle > 165 && left_knee_angle < 195) ||
        (right_knee_angle > 165 && right_knee_angle < 195)
      ) {
        if (
          (left_knee_angle > 90 && left_knee_angle < 120) ||
          (right_knee_angle > 90 && right_knee_angle < 120)
        ) {
          label = "Warrior II Pose";
        }
      }

      if (
        left_knee_angle > 160 &&
        left_knee_angle < 195 &&
        right_knee_angle > 160 &&
        right_knee_angle < 195
      ) {
        label = "T Pose";
      }
    }
  }

  if (
    (left_knee_angle > 165 && left_knee_angle < 195) ||
    (right_knee_angle > 165 && right_knee_angle < 195)
  ) {
    if (
      (left_knee_angle > 315 && left_knee_angle < 335) ||
      (right_knee_angle > 25 && right_knee_angle < 45)
    ) {
      label = "Tree Pose";
    }
  }
  console.log(label);
  // cv2.putText(output_image, label, (10, 30),cv2.FONT_HERSHEY_PLAIN, 2, color, 2)

  // if display:
  //     plt.figure(figsize=[10,10])
  //     plt.imshow(output_image[:,:,::-1]);plt.title("Output Image");plt.axis('off');

  // else:
  //     return output_image, label
}
/**
 * Draw pose keypoints onto a canvas
 */
export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}

/**
 * Draw the bounding box of a pose. For example, for a whole person standing
 * in an image, the bounding box will begin at the nose and extend to one of
 * ankles
 */
export function drawBoundingBox(keypoints, ctx) {
  const boundingBox = posenet.getBoundingBox(keypoints);

  ctx.rect(
    boundingBox.minX,
    boundingBox.minY,
    boundingBox.maxX - boundingBox.minX,
    boundingBox.maxY - boundingBox.minY
  );

  ctx.strokeStyle = boundingBoxColor;
  ctx.stroke();
}

/**
 * Converts an arary of pixel data into an ImageData object
 */
export async function renderToCanvas(a, ctx) {
  const [height, width] = a.shape;
  const imageData = new ImageData(width, height);

  const data = await a.data();

  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    const k = i * 3;

    imageData.data[j + 0] = data[k + 0];
    imageData.data[j + 1] = data[k + 1];
    imageData.data[j + 2] = data[k + 2];
    imageData.data[j + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Draw an image on a canvas
 */
export function renderImageToCanvas(image, size, canvas) {
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);
}

/**
 * Draw heatmap values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's heatmap outputs
 * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
 */
export function drawHeatMapValues(heatMapValues, outputStride, canvas) {
  const ctx = canvas.getContext("2d");
  const radius = 5;
  const scaledValues = heatMapValues.mul(tf.scalar(outputStride, "int32"));

  drawPoints(ctx, scaledValues, radius, color);
}

/**
 * Used by the drawHeatMapValues method to draw heatmap points on to
 * the canvas
 */
function drawPoints(ctx, points, radius, color) {
  const data = points.buffer().values;

  for (let i = 0; i < data.length; i += 2) {
    const pointY = data[i];
    const pointX = data[i + 1];

    if (pointX !== 0 && pointY !== 0) {
      ctx.beginPath();
      ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}
