let eyeImage;
let gemImage;

function preload() {
  eyeImage = loadImage('eye2.png');
  gemImage = loadImage('gem.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  objectPosition = createVector(0, initialMirrorLength/2);
  rayVector = createVector(initialMirrorSpacing/2, -75);
  leftMirrorPosition = createVector(-initialMirrorSpacing/2, initialMirrorLength/2);
  rightMirrorPosition = createVector(initialMirrorSpacing/2, initialMirrorLength/2);
  mirrorVector = createVector(0, -initialMirrorLength);
  eyePosition = createVector(0, -initialMirrorLength/2);
  zeroVector = createVector(0, 0);
  addVerticalSlider();
  addHorizontalSlider();
}
  
function draw() {
  background(bgColor);
  translate(windowWidth/2 + 300, windowHeight/2);
  scale(1, -1);
  angleMode(DEGREES);

  rayColor = '#ffaf40';

  if ( isSuccess ) {
    rayColor = '#2eff66';
    showValue('Path found!', -60, -objectPosition.y - 100, '#2eff66', 500);
  }  

  // Draw Mirror Vector at Mirror Position
  mirrorVector.y = verticalSlider.value();
  rayVector.y = -horizontalSlider.value();
  drawArrow(leftMirrorPosition, mirrorVector, mirrorColor, 3);
  drawArrow(rightMirrorPosition, mirrorVector, mirrorColor, 3);
  
  // Draw First Ray at Object Position
  drawArrow(objectPosition, rayVector, rayColor, 3);

  // Get Angle of Incidence
  theta = getAngleOfIncidence(rayVector);

  // Get Triangle Height
  heightOfTriangle = getTriangleHeight(theta, rayVector);

  // Gives Cartesian Coordinates of End of First Ray
  endOfRayPosition = objectPosition.copy().add(rayVector);

  // Distance from First Reflection to Bottom of Box
  normalToBottomOfBox = getFirstToBottom(leftMirrorPosition, mirrorVector, rayVector, objectPosition);

  // Check number of reflections using the height of the triangle
  numberOfReflections = Math.floor(normalToBottomOfBox / heightOfTriangle) + 1;

  // Draw Normal Vector at End of Ray Position
  normalVector = createVector(rightMirrorPosition.x * 2, 0);
  

  // This Ray is set to reflect over the Normal Vector
  reflectedRayVector = rayVector.copy().mult(2);

  // Ray will actually reflect if the bottom of the mirror is lower than the reflection point
  let bottomOfMirrorYCoordinate = mirrorVector.y + initialMirrorLength/2;
  if (endOfRayPosition.y >= bottomOfMirrorYCoordinate) { 
    reflectedRayVector.reflect(normalVector);
  }
  drawArrow(endOfRayPosition, reflectedRayVector, rayColor, 3);

  // Draw rays that start in the box
  for (let i = 0; i < numberOfReflections - 1; i++) {
    endOfRayPosition.add(reflectedRayVector);
    if (endOfRayPosition.y >= bottomOfMirrorYCoordinate) {
      reflectedRayVector.reflect(normalVector);
    }
    
    drawArrow(endOfRayPosition, reflectedRayVector, rayColor, 3);
  }

  // Success occurs when Success Vector is suffciently close to the Eye Position
  successVector = endOfRayPosition.copy().add(reflectedRayVector.copy().mult(1/2));


  if (Math.abs(successVector.y - eyePosition.y) < 5 && successVector.x === 0) {
    isSuccess = true;
  }
  else {
    isSuccess = false;
  }

  // Draw rays that move away from the box
  for (let i = 0; i < additionalRayTrail; i++) {
    endOfRayPosition.add(reflectedRayVector);
    if (endOfRayPosition.y >= bottomOfMirrorYCoordinate) {
      reflectedRayVector.reflect(normalVector);
    }
    
    drawArrow(endOfRayPosition, reflectedRayVector, rayColor, 3);
  }

  showValue('Angle of Incidence: ' + (180-theta).toFixed() + '°', -800, -objectPosition.y + 500, '#c7c7c7', 500);
  //showValue('Mirror Length: ' + -mirrorVector.y.toFixed(2), -800, -objectPosition.y + 450, '#c7c7c7', 500);
  showValue('Mirror Length: ' + -mirrorVector.y.toFixed(2), 250, -objectPosition.y + 525, '#c7c7c7', 500);
  showValue(messageText, -800, -objectPosition.y, '#c7c7c7', 500);
  drawPngImages();
}


