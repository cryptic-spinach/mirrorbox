let verticalSlider;
let horizontalSlider;

let zeroVector;
let normalVector;
let heightVector;
let mirrorVector;
let rayVector;
let reflectedRayVector;

let objectPosition;
let eyePosition;
let leftMirrorPosition;
let rightMirrorPosition;
let endOfRayPosition;

let showDirection = false;
let showDot = true;
let initialMirrorSpacing = 300;
let initialMirrorLength = 500;

let theta;
let heightOfTriangle;
let numberOfReflections;
let normalToBottomOfBox;

let bgColor = 0;
let textColor = 215;
let normalColor = '#ffffff'
let rayColor = '#ffaf40';
let mirrorColor = '#40efff'

let verticalSliderHorizontalOffset = -150;
let verticalSliderVerticalOffset = -12; 

let horizontalSliderHorizontalOffset = -800;
let horizontalSliderVerticalOffset = 250;

let messageTextHorizontalOffset = -800; 
let messageTextVerticalOffset = 0;

let angleTextHorizontalOffset = -800;
let angleTextVerticalOffset = 450;

let successTextHorizontalOffset = -65;
let successTextVerticalOffset = 110;


let additionalRayTrail = 5;
let isSuccess = false;
let eyeHeight = 40;
let successVector;


let messageText = "Use the interactive to determine how many paths exist between the object and observer for a given mirror length. The slider above can be used to adjust the angle of incidence and the vertical slider controls the mirror length. Note: The path of the light must make contact with the white dot above the eye in order to be considered a valid path."
