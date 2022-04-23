leftWristY_divide_1000 = 0;
song = "";

function preload()
{
    song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function modelLoaded()
{
    console.log('PoseNet is initialised');
}

function gotposes(results)
{
    if(results.length > 0)
    {
       scoreRightWrist = results[0].pose.keypoints[10].score; 
       scoreLeftWrist = results[0].pose.keypoints[9].score;
       console.log("Score Right Wrist = " + scoreRightWrist + " Score Left Wrist = " + scoreLeftWrist); 

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + " rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + " leftWristY = " + rightWristY);

    }
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2){

    
    circle(leftWristX, leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        new_leftWristY = Math.floor(InNumberleftWristY);
        leftWristY_divide_1000 = new_leftWristY/500;
        document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000);
    }
    
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        if(rightWristY >0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed : 0.5x";
            song.rate(0.5);
        }
        if(rightWristY >100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed : 1x";
            song.rate(1);
        }
        if(rightWristY >200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed : 1.5x";
            song.rate(1.5);
        }
        if(rightWristY >300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed : 2x";
            song.rate(2);
        }
        if(rightWristY >400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed : 2.5x";
            song.rate(2.5);
        }
    }

    

    
    
        
    
}

function play()
{
    song.play();
}