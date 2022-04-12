import * as posenet from "@tensorflow-models/posenet";
import LeaderboardServices from "./services/leadeboard.service";

const pointRadius = 3;

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

  //   console.log(left_elbow_angle);
  //   console.log(right_elbow_angle);
  //   console.log(left_shoulder_angle);
  //   console.log(right_shoulder_angle);
  //   console.log(left_knee_angle);
  //   console.log(right_knee_angle);

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
      return label;
    }
  }

  console.log(label);
  if (
    label == "Tree Pose" ||
    label == "Warrior II Pose" ||
    label == "Warrior II Pose"
  ) {
    LeaderboardServices.doneYoga();
  }
  return label;
}

export const config = {
  videoWidth: 900,
  videoHeight: 700,
  flipHorizontal: true,
  algorithm: "single-pose",
  showVideo: true,
  showSkeleton: true,
  showPoints: true,
  minPoseConfidence: 0.1,
  minPartConfidence: 0.5,
  maxPoseDetections: 2,
  nmsRadius: 20,
  outputStride: 16,
  imageScaleFactor: 0.5,
  skeletonColor: "#ffadea",
  skeletonLineWidth: 6,
  loadingText: "Loading...please be patient...",
};

function toTuple({ x, y }) {
  return [x, y];
}

export function drawKeyPoints(
  keypoints,
  minConfidence,
  skeletonColor,
  canvasContext,
  scale = 1
) {
  keypoints.forEach((keypoint) => {
    if (keypoint.score >= minConfidence) {
      let { x, y } = keypoint.position;
      x = 900 - x;
      canvasContext.beginPath();
      canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI);
      canvasContext.fillStyle = skeletonColor;
      canvasContext.fill();
    }
  });
}

function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale,
  canvasContext
) {
  firstX = 900 - firstX;
  nextX = 900 - nextX;
  canvasContext.beginPath();
  canvasContext.moveTo(firstX * scale, firstY * scale);
  canvasContext.lineTo(nextX * scale, nextY * scale);
  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = color;
  canvasContext.stroke();
}

export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  canvasContext,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      canvasContext
    );
  });
}
