let lower_ob_array=[]
let index=1;
var object_index=1;

function handleLoss() {
    alert("Lower object hit!");
    window.location.reload();
    
    // Example: Reset game state or show a restart button
    const gameOverScreen = document.getElementById("game-over");
    if (gameOverScreen) {
        gameOverScreen.style.display = "block";
    }

    // Optionally reset positions, scores, etc.
    // resetGame(); // ← Your custom reset logic
}

// game logic 
function Game_logic(object_left_axis_value,object_height,object_class,object_id){
    var bird_position_top=parseInt(bird.style.top)||280;
    var bird_position_left=parseInt(bird.style.left)|| 300;

    // var object_position=parseInt(objects.style.top);
    
    if (object_class=="upper_object"){
        
        

         if(bird_position_left == object_left_axis_value){
            // console.log("Object Class : Upper object\n","object data",object_left_axis_value,"object height:",object_height,"\n bird data:",bird_position_left,bird_position_top);
            // console.log("multyply method calculation\n:","bird:",bird_position_left*bird_position_top,"\n object:",object_height*object_left_axis_value)

            if (bird_position_top > object_height){
                // console.log("status Ok");
            }
            else if (bird_position_top < object_height){
                // console.log("collision");
                window.alert("you lost");
                window.location.reload();
            }
         }

    }
   else if (object_class === "lower_object") {
    const birdHeight = 19;
    const birdBottom = bird_position_top + birdHeight;
    const objectRightEdge = object_left_axis_value + 49;

    const isHorizontallyAligned = bird_position_left >= object_left_axis_value && bird_position_left <= objectRightEdge;
    const isVerticallyColliding = birdBottom > object_height;

    if (isHorizontallyAligned) {
        console.log(
            "Object Class: lower_object",
            "object data:", object_left_axis_value,
            "object height:", object_height,
            "\nbird data:", birdBottom
        );

        if (!isVerticallyColliding) {
            console.log("status Ok");
        } else {
            console.log("collision");
            handleLoss("Lower object hit!");
        }
    }
}
   
}

function create_lower_obs(){
    var max=300, min=150;
    let lower_div=document.createElement("div");
    lower_div.setAttribute("class","lower_obs");
    let lower_ob_height=Math.random()*(max-min)+min;
    lower_div.style.height=lower_ob_height+"px";
    // lower_div.style.bottom= '600px';
    lower_div.style.top=(600-lower_ob_height)+"px";
    lower_div.id='l'+index;
    index++;
    lower_ob_array.push(index);
    let lower_position=document.getElementById("lower_objects");
    lower_position.appendChild(lower_div);

    // console.log("v:",600-lower_ob_height)

    return 600-lower_ob_height;
        // console.log(up_ob_array,lower_ob_array)
}
function create_upper_obs(){
        let up_ob_array=[]
        // console.log("create object function call")
        var max=300;
        var min=150;
        let upper_div=document.createElement("div");
        upper_div.setAttribute("class","upper_obs");
       

        // setting randome size
        let upper_ob_height=Math.random()*(max-min)+min;
        upper_div.style.height=upper_ob_height+"px";
        upper_div.id='u'+object_index;
        object_index++;
        up_ob_array.push(object_index);
        

        let upper_position=document.getElementById("upper_objects");
 
        upper_position.appendChild(upper_div);
        //  return height for game logic checking
        return upper_ob_height;
        
}


function move_upper_objects(upper_obs,height,object_id){
        var upos=parseInt(upper_obs.style.left)||750;
        var top_position=parseInt(upper_obs.style.top)|| height;

        var interval=100
        var counter=0
            setInterval(() => {
                if(upos){
                    var val=upos-10;
                    
                    upper_obs.style.left=val+"px";
                
                    upos=upos-10;
                    counter+=10
                    // checking game logic:
                    Game_logic(val,top_position,"upper_object",object_id);

                    if(val==0){
                        upper_obs.remove();
                    }
                    
                    
                } else{
                    // console.log("end upper object");
                    clearInterval();
                    
                }
            }, interval);
            

    }

function move_lower_objects(lower_obs,height,object_id){

        var lpos=parseInt(lower_obs.style.left)||750;
        var top_position=parseInt(lower_obs.style.top)|| height;

        var interval=100;
        var counter=0
        setInterval(() => {
            if(lpos){
                var val = lpos-10;
                lower_obs.style.left=val+"px";
                lpos-=10;

                Game_logic(val,top_position,"lower_object",object_id);
                if(val==0){
                        lower_obs.remove();
                    }
                if(counter==60){
                        // add_obs();
                        counter=0
                    }

            }else{
                // console.log("end lower object");
                clearInterval();
            }
            
        }, interval);
}


function looping(){
    // stop scrolling during game play
    document.body.style.overflow = "hidden"; 
 const gap = 1000; // delay between each obstacle start (ms)
//  let i=1,j=1;
    let controler=20;

    for (let i = 1,j=1; i < controler; i++,j++) {
        setTimeout(() => {
            
            height=create_upper_obs();
            let upper_obs = document.getElementById("u" + i);
            
            move_upper_objects(upper_obs,height,"u"+i);
            
        }, i * gap);

        setTimeout(()=>{
            let height= create_lower_obs();
            let lower_obs=document.getElementById("l"+j);
            move_lower_objects(lower_obs,height,'l'+j);

        },i*gap)
    };
    // window.alert("game is finished");
    // window.location.reload();
};


// running the game through the loop


function move_bird_up() {
    var bird = document.getElementById("bird");
    var pos = parseInt(bird.style.top)||280 ;
    // console.log(pos)
    bird.style.top = (pos - 10) + "px";
}

function move_bird_down(){
    var bird = document.getElementById("bird");
    var pos = parseInt(bird.style.top) ||280;
    // console.log(pos)
    bird.style.top = (pos + 10) + "px";
       
}

  
window.onload = function() {

document.addEventListener('keydown',function(event){
            if(event.key==='ArrowUp'){
                console.log("up key press")
                move_bird_up();
            }
            else if(event.key==='ArrowDown'){
                move_bird_down();
            }
        });
};

function get_player_data(){
    let player_name=document.getElementById("name").value;
    console.log("player name:",player_name);

    // data={name:player_name};

    const post_location="/get_player_data";
    fetch(post_location,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:player_name})
    })
    .then(response=>response.json())
    .then(data=>{
        console.log("player data fetched:",data);
    })
    .catch(error=>{
        console.error("Error fetching player data:",error);
    });

    
}

function hide_player_input_section(){
    let player_input_section=document.getElementById("player_input_section");
    player_input_section.style.display="none";
}

function Scoring_system(){
    // scoring logic here
    let score=document.getElementById("score_value");
    let counter=parseInt(score.innerText.split(": ")[1])||0;
    counter+=1;
    score.innerText="Score: "+counter;
}

document.getElementById("form-submit").addEventListener("click",function(event){
    event.preventDefault(); // prevent form submission
    get_player_data();
    
    looping();
});



