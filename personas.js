
img = "";
objects = [];
status = "";


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector=ml5.objectDetector("cocossd",identificar)
 
}

function identificar(){
    console.log("cargado");
    status=true;
}

function personas(error,resultados){
    if(error){
        console.log(error)
        
    }else{
      console.log(resultados)
        objects=resultados;

    }

}

function draw() {
  image(video, 0, 0, 380, 380);
     if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, personas );
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Estado: objeto detectado";
          document.getElementById("number_of_objects").innerHTML = "El número de objetos detectados es: "+ objects.length;
 
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          
         
        }
      } 
}
