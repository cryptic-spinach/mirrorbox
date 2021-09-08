function drawArrow(base, vec, color, weight) {
    push();
    stroke(color);
    strokeWeight(weight);
    fill(color);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    if (showDirection) {
        rotate(vec.heading());
        let arrowSize = 7;
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    }
    pop();
}

function drawPngImages() {
    push();
    rectMode(CENTER);
    scale(1, -1);
    image(eyeImage, -25, initialMirrorLength/2, 50, 50);
    image(gemImage, -25, -initialMirrorLength/2 - 45, 50, 50);
    if(showDot) {
        ellipse(0, initialMirrorLength/2, 10);
    }
    pop();
}

function addVerticalSlider() {
    let sliderWidthString = (initialMirrorLength).toString() + "px";
    verticalSlider = createSlider(-initialMirrorLength, 0, mirrorVector.y);
    verticalSlider.position(windowWidth/2 + rightMirrorPosition.x + verticalSliderHorizontalOffset, windowHeight/2 - 12);
    verticalSlider.style("transform", "rotate(-90deg)");
    verticalSlider.style('width', sliderWidthString);
}

function addHorizontalSlider() {
    horizontalSlider = createSlider(2, initialMirrorLength, 50);
    horizontalSlider.position(windowWidth/2 - 500, windowHeight/2 + 300);
    horizontalSlider.style('width', '400px');
}


function showValue(label, x, y, color, wrap) {
    push();
    scale(1, -1);
    textSize(26);
    fill(color);
    text(label, x, y, wrap);
    pop();
}

function getAngleOfIncidence(vector) {
    return vector.heading() + 180;
}

function getTriangleHeight(angle, vector) {
    let sineOfAngle = Math.sin(angle * Math.PI/180);
    return sineOfAngle * vector.mag() * 2;
}

function getFirstToBottom(mirrorPosition, mirror, ray, objPosistion) {
    let topToObject = mirrorPosition.y - objPosistion.y;
    let objectToFirst = -ray.y;
    return mirror.mag() - topToObject - objectToFirst;
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    verticalSlider.position(windowWidth/2 + rightMirrorPosition.x + verticalSliderHorizontalOffset, windowHeight/2 - 12);
    horizontalSlider.position(windowWidth/2 - 500, windowHeight/2 + 300);

}