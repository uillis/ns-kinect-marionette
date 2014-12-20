var starttesting = function () {
    var status = document.getElementById("status");
    var canvas = document.getElementById("testing-canvas"); //document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var camera = new Image();

    camera.onload = function () {
        context.drawImage(camera, 0, 0);
    }

    if (!window.WebSocket) {
        status.innerHTML = "Your browser does not support web sockets!";
        return;
    }

    status.innerHTML = "Connecting to server...";

    // Initialize a new web socket.
    var socket = new WebSocket("ws://localhost:8181");

    // Connection established.
    socket.onopen = function () {
        try{
        status.innerHTML = "Connection successful.";
        }catch(e){}
    };

    // Connection closed.
    socket.onclose = function () {
        try{
        status.innerHTML = "Connection closed.";
    }catch(e){}
    }

    function draw_link(p1,p2){
                    /**/
                    context.strokeStyle = "rgba(255,0,0,.5)";
                    context.beginPath();
                    context.moveTo(p1.x,p1.y);
                    context.lineTo(p2.x,p2.y);
                    context.stroke();
                    /**/
    }

    function draw_point(p){
                     /**/
                    context.fillStyle = "rgba(255, 0, 0, .1)";
                    context.beginPath();
                    context.arc(p.x, p.y, 10, 0, Math.PI * 2, true);
                    context.closePath();
                    context.fill();
                    /**/
    }


/**/
    // Receive data FROM the server!
    socket.onmessage = function (event) {
        if (typeof event.data === "string") {
            // SKELETON DATA

            // Get the data in JSON format.
            var jsonObject = JSON.parse(event.data);
            
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Display the skeleton joints.
            for (var i = 0; i < jsonObject.skeletons.length; i++) {

                var joints = {};

                for (var j = 0; j < jsonObject.skeletons[i].joints.length; j++) {

                    var joint = jsonObject.skeletons[i].joints[j];

                    switch(joint.name) {
                        case 'hipcenter':
                            joints.hipcenter = joint;
                            break;
                        case 'spine':
                            joints.spine = joint;
                            break;
                        case 'shouldercenter':
                            joints.shouldercenter = joint;
                            break;
                        case 'head':
                            joints.head = joint;
                            break;
                        case 'shoulderleft':
                            joints.shoulderleft = joint;
                            break;
                        case 'elbowleft':
                            joints.elbowleft = joint;
                            break;
                        case 'wristleft':
                           joints.wristleft = joint;
                            break;
                        case 'handleft':
                           joints.handleft = joint;
                            break;
                        case 'shoulderright':
                           joints.shoulderright = joint;
                            break;
                        case 'elbowright':
                            joints.elbowright = joint;
                            break;
                        case 'wristright':
                            joints.wristright = joint;
                            break;
                        case 'handright':
                            joints.handright = joint;
                            break;
                        case 'hipleft':
                            joints.hipleft = joint;
                            break;
                        case 'kneeleft':
                            joints.kneeleft = joint;
                            break;
                        case 'ankleleft':
                           joints.ankleleft = joint;
                            break;
                        case 'footleft':
                            joints.footleft = joint;
                            break;
                        case 'hipright':
                            joints.hipright = joint;
                            break;
                        case 'kneeright':
                            joints.kneeright = joint;
                            break;  
                        case 'ankleright':
                           joints.ankleright = joint;
                            break;
                        case 'footright':
                           joints.footright = joint;
                            break;
                    }

                    draw_point(joint);

                }//for joints

                context.fillStyle = "rgba(0, 0, 0, 1)";
                context.fillText(jsonObject.skeletons[i].id, joints.hipcenter.x, joints.hipcenter.y);

                
               // console.log(jsonObject.skeletons[i]);


                /*body*/
                draw_link(joints.head,joints.shouldercenter);
                draw_link(joints.shouldercenter,joints.spine);
                draw_link(joints.spine,joints.hipcenter);
                /*body*/

                /*R Arm*/
                draw_link(joints.shouldercenter,joints.shoulderright);
                draw_link(joints.shoulderright,joints.elbowright);
                draw_link(joints.elbowright,joints.wristright);
                draw_link(joints.wristright,joints.handright);

                /*L Arm*/
                draw_link(joints.shouldercenter,joints.shoulderleft);
                draw_link(joints.shoulderleft,joints.elbowleft);
                draw_link(joints.elbowleft,joints.wristleft);
                draw_link(joints.wristleft,joints.handleft);

                /*R Leg*/
                draw_link(joints.hipcenter,joints.hipright);
                draw_link(joints.hipright,joints.kneeright);
                draw_link(joints.kneeright,joints.ankleright);
                draw_link(joints.ankleright,joints.footright);
                
                 /*L Leg*/
                 draw_link(joints.hipcenter,joints.hipleft);
                 draw_link(joints.hipleft,joints.kneeleft);
                 draw_link(joints.kneeleft,joints.ankleleft);
                 draw_link(joints.ankleleft,joints.footleft);

            }//for skeleton
        }

    };


};


