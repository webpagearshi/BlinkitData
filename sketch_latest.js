
//set variables
let table1, table2, table3; 
let totalRows,totalRows2,totalRows3;
let month,timeslot,deliveryTime;
let x,y;
var stars =[];
let yOff =0.0;
var song;

function preload(){

  //load the datasets into p5.js
  table1 =loadTable("blinkit_daily.csv","csv","header");
  table2 =loadTable("blinkit_data_monthly.csv","csv","header");
  table3 =loadTable("blinkit_itemlist.csv","csv","header");

  // loading music files
  //soundFormats('mp3', 'ogg');
  song = loadSound("assets/wavessound.mp3");
  //img =loadImage('assets/gold_tex.jpg');
}


function setup() {
  // put setup code here
  var cnv =createCanvas (windowWidth, windowHeight);
  cnv.style('display', 'block');
  
  totalRows = table1.getRowCount(); // number of rows in table 1
  totalRows2 = table2.getRowCount(); // number of rows in table 2
  totalRows3 = table3.getRowCount(); // number of rows in table 3
  
  //angleMode(DEGREES);
  
  
  
  for(var k=0;k<totalRows3;k++){

    item = table3.getString(k,"ItemName");
    frequency =table3.getNum(k,"OrderFrequency")
    var star ={
      m: random(30,width-65),
      n: random(10,200),
      r1: 2.5,
      r2: 3.5,
      npoints: frequency+1,
      text: "Bought "+item+" "+frequency+ " times",
      //angle: frameCount/100
    };
    stars.push(star);
    
    //play song
    //wavesound.play();
  }


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
  
}

function draw() {
  // put drawing code here
  //reference for gradient: https://editor.p5js.org/Jaemi13/sketches/gAS-FB5Sx
  //c1 = color('#280F6B');
   //translate(-width/2,-height/2,0); //moves our drawing origin to the top left corner
 // c1 = color('#002134');
  //c3 = color('#3E8CE1');
  
  //c4 =color('#005985');
  //c2 = lerpColor(c3,c4, 0.6);

  c1 = color('#00193b');
  c2 = color('#0067bd');
  c3 = lerpColor(c1,c2,0.3);
  c4 =color('#012b71');
  c5 =color('#4dafec');
  c6 = lerpColor(c3,c4, 0.3);

  for(let y=0; y<height; y++){
    n = map(y,0, height,0,1); //remaps number from one range to another
    let newc = lerpColor(c3,c6,n); //lerpColor- blend two colors to find the third color between them
    stroke(newc);
    line(0,y,width,y); //width is the system variable; line to draw lines in 2D
  }
  
  
  let monData=['Feb','Mar','Apr','May','Jun','Jul'];
  let Index =0;
  let yPos =height -120;
  let ySpacing =0;
  let xPos = 75;
  let barWidth = 150;
  let barMargin = 10;

  

  // draw rectangles -buildings for monthly expenditure
  
  for(let j=0; j<totalRows2;j++){
    mon = table2.getString(j, "Month");
    totalBill = table2.getNum(j, "TotalBill");
    orderFrequency = table2.getNum(j,"OrderFrequency");
    push();
    
    fill(0);
    rect(xPos*j+width/9*j+barMargin,height -100 -totalBill/19,barWidth, totalBill/19);
    pop();

    if(dist(mouseX, mouseY,xPos*j+width/9*j+barMargin,height -100 -totalBill/19)<(barMargin+30)){
          push();
          const boxColorb = color(255,255,255); //text box color
          boxColorb.setAlpha(30); // add transperancy to text box
          fill(boxColorb);
          stroke(255);
          rect(xPos*j+width/9*j+barMargin+barWidth-20,height -100 -totalBill/19,90, 90);
          noStroke();
          fill(255);
          textSize(12);
          textAlign(CENTER);
          text("Expenditure in "+mon+" is Rs "+totalBill+".\nEach row represents a single order.",xPos*j+width/9*j+barMargin+barWidth-20,height -95 -totalBill/19,90);
          pop();
    }
  }

  // draw squares -windows    
  for (let i=0; i< totalRows; i++){
      

      
      //get data points 
      month =table1.getString(i, "Month"); //get the month -str
      timeslot =table1.getString(i,"Time"); // get the time of the day -str
      deliveryTime =table1.getNum(i,"DeliveryTime"); //delivery time - #
      noOfItems =table1.getNum(i,"NoOfItems"); // no of items - #
      amount = table1.getNum(i, "BillAmount"); // bill amount - #
      day = table1.getString(i, "Day"); // day of the week

      //let yMargin =10;
      //let yPos = yMargin+i*20;
      //let yStop = yMargin+66*20;
      //console.log(yStop);
      //let newYPos =map(yPos,300, height -160,200, windowHeight-150);
      //yPos = height-150;
     

    
    // change xPos when month changes and set yPos to starting position
      if(monData[Index]!=month){
        xPos+=width/6;
        Index+=1;
        yPos =height -120;
        ySpacing =0;
        }
        else{
         ySpacing +=1;
         yPos =yPos- ySpacing;
        }




        // draw a 2 squares for each row 
        drawWindow(xPos, yPos, deliveryTime,'black'); //square size based on delivery time
        push();
        stroke('yellow');
        strokeWeight(1.5);
        noFill();
        rectMode(CENTER);
        square(xPos+50, yPos, noOfItems*2); //square size based on no of Items ordered
        
        pop();
        stroke(255);
        if(dist(mouseX, mouseY, xPos, yPos)<10){

          const boxColor1 = color(255,255,255); //text box color
          boxColor1.setAlpha(30); // add transperancy to text box
          fill(boxColor1);
          rect(xPos-75, yPos-30,55, 50);
          noStroke();
          fill(255);
          textSize(12);
          textAlign(CENTER);
          text("Delivery Time: "+deliveryTime,xPos-75,yPos-20,50);

        }
        if(dist(mouseX, mouseY, xPos+50, yPos)<10){

        const boxColor2 = color(255,255,255); //text box color
        boxColor2.setAlpha(30);
        fill(boxColor2);
        rect(xPos+65, yPos-30,60, 60);
        noStroke();
        fill(255);
        textSize(12);
        textAlign(CENTER);
        text("Paid Rs "+amount+" for "+noOfItems+" Items",xPos+65,yPos-25,60);
        
        }
        yPos -=30;

        
      }

        //set border for waves 
        push();
        stroke(47,212,233);
        //drawingContext.setLineDash([8,5]);
        fill('#257499');
        rect(0,height-100,width,height-100);
        pop();


        //create the moon
        let noiseVal;
        let noiseScale =0.02;

        push();
        ellipse(width/2, 100, 40);
        pop();
        //create halo for moon
        push();
        const moonColor = color(255,255,255); //moon
        moonColor.setAlpha(30);
        fill(moonColor);
        noStroke();
        ellipse(width/2,100, 70);

        if(dist(mouseX, mouseY, width/2,100)< 50){
          
          stroke(210,245,245);
          rect(width/2+10,110,210,130,20);
          fill(255);
          noStroke();
          textSize(12);
          textAlign(CENTER);
          text("Blinkit is a grocery delivery app which delivers in minutes. This dataviz represents 6 months of my family's shopping data which I have collected from the app. Hover over each element to know more.", width/2+15,130, 200);
        }
        pop();
        
       //create a star for each item bought during the 6 months
        for (var a=0;a < stars.length;a++){
          push();
          fill('yellow');
          noStroke();
          ellipseMode(CENTER);
          translate(stars[a].m,stars[a].n);
          rotate(frameCount/20);
          
          createStar(0,0,stars[a].r1,stars[a].r2,stars[a].npoints);
          //text(stars[a].text,stars[a].m,stars[a].n);
          //console.log(stars.length);
          pop();
          if(dist(mouseX,mouseY,stars[a].m,stars[a].n)<5){

            push();
            const boxColor3 = color(255,255,255); //text box color
            boxColor3.setAlpha(30);
            fill(boxColor3);
            rect(stars[a].m,stars[a].n,75,70);
            pop();
            push();
            fill('yellow');
            noStroke();
            textAlign(CENTER);
            text(stars[a].text,stars[a].m,stars[a].n+10,75,70);
            pop();
          }
        }
    
    //create waves using perlin noise 
    //https://www.gorillasun.de/blog/smooth-curves-with-perlin-noise-and-recreating-the-unknown-pleasures-album-cover-in-p5/   
    // gradient color - https://github.com/alterebro/p5.fillGradient 
    

        push();
        for(n=height-55; n<height+30;n+=15){
        beginShape();
         let xOff =-10.0;

         //iterate over horizontal pixels
        for(c=xOff; c<width- xOff;c+=10){
          
          fillGradient('linear',{
            from: [c,n],
            to: [c+10,n+15],
            steps:[
              color(5,13,41),
              color(3,72,71),
              color(1,50,76),
              color(37,116,153)
              ]
          });
          //let v = random(0.2,2);
          //stroke(47,212,233);
          stroke(255,255,255);
          drawingContext.setLineDash([8,5]); //create the dashed line pattern
          //var d =dist(c, height-110,width/2,height-110);
         noiseDetail(5, 0.5);
         curveVertex(c,n-noise(n+c*0.02)*80);
          //vertex(x,y);
          //xOff+=0.05;
        }
        //yOff += 0.01;
       // vertex(width-xOff, height-100);
      //  vertex(0, height-100);
        endShape();
        
      }
      pop();


// create legends 
      push();
      for(i=0;i<7;i++){
      if (i==0){
          fill('#80e7f2');
           square(10+30*i,height -40, 20);
          if(dist(mouseX, mouseY, 10+30*i,height-40)<15){
            push();
            const boxColorn = color(255,255,255); //text box color
            boxColorn.setAlpha(30);
            fill(boxColorn);
            rect(10+30*i,height-70,55,20);
            pop();
            push();
            fill('white');
            noStroke();
            textAlign(CENTER);
            text("Morning",12+30*i,height-65,50,20);
            pop(); 
          }
        } 
        else if(i ==1){
          fill('#FFE400');
          square(10+30*i,height -40, 20);
          if(dist(mouseX, mouseY, 10+30*i,height-40)<15){
            push();
            const boxColorn = color(5,13,41); //text box color
            boxColorn.setAlpha(30);
            fill(boxColorn);
            rect(10+30*i,height-70,55,20);
            pop();
            push();
            fill('white');
            noStroke();
            text("Afternoon",12+30*i,height-65,50,20);
            pop(); 
          }
        }
        else if(i==2){
          fill('#FF9800');
          square(10+30*i,height -40, 20);
          if(dist(mouseX, mouseY, 10+30*i,height-40)<15){
            push();
            const boxColorn = color(255,255,255); //text box color
            boxColorn.setAlpha(30);
            fill(boxColorn);
            rect(10+30*i,height-70,55,20);
            pop();
            push();
            fill('white');
            noStroke();
            textAlign(CENTER);
            text("Evening",12+30*i,height-65,50,20);
            pop(); 
          }
        }
        else if(i==3){
          fill('#034aa6');
          square(10+30*i,height -40, 20);
          if(dist(mouseX, mouseY, 10+30*i,height-40)<15){
            push();
            const boxColorn = color(255,255,255); //text box color
            boxColorn.setAlpha(30);
            fill(boxColorn);
            rect(10+30*i,height-70,50,20);
            pop();
            push();
            fill('white');
            noStroke();
            textAlign(CENTER);
            text("Night",12+30*i,height-65,45,20);
            pop(); 
          }
        }
        else if(i==4){
          noFill();
          stroke('yellow');
          square(10+30*i,height -40, 20);
          if(dist(mouseX, mouseY, 10+30*i,height-40)<15){
            push();
            const boxColorn = color(255,255,255); //text box color
            boxColorn.setAlpha(30);
            fill(boxColorn);
            rect(10+30*i,height-70,125,30);
            pop();
            push();
            fill('white');
            noStroke();
            textAlign(CENTER);
            text("Size is proportional to no of items",12+30*i,height-65,120,100);
            pop(); 
          }}
          else if(i==5){
          stroke('black');
          fill('black');
          square(10+30*i,height -40, 20);
          //stroke('');
          if(dist(mouseX, mouseY, 10+30*i,height-40)<15){
            push();
            const boxColorn = color(255,255,255); //text box color
            boxColorn.setAlpha(30);
            fill(boxColorn);
            stroke('white');
            rect(10+30*i,height-70,150,60);
            pop();
            push();
            fill('white');
            noStroke();
            textAlign(CENTER);
            text("Hover over the top left corner. Height is proportional to monthly expenditure",12+30*i,height-65,150,100);
            pop(); 
          }
        }
       else{
        noStroke();
        fill('yellow');
        createStar(20+30*i,height-30,5,5,4);
        if(dist(mouseX, mouseY, 10+30*i,height-40)<15){
            push();
            const boxColorn = color(255,255,255); //text box color
            boxColorn.setAlpha(30);
            fill(boxColorn);
            stroke('white');
            rect(10+30*i,height-70,150,60);
            pop();
            push();
            fill('white');
            noStroke();
            textAlign(CENTER);
            text("Hover over the stars to know the no of times the item was purchased in 6 months",12+30*i,height-65,150,100);
            pop(); 
          }
       }
      }
    
      pop();

  }
  
    
  
        


function drawWindow(xPos, yPos, size,color){
  push();

        if (timeslot =="Morning"){
          fill('#80e7f2');
        } 
        else if(timeslot =="Afternoon"){
          fill('#FFE400');
        }
        else if(timeslot =="Evening"){
          fill('#FF9800');
        }
        else {
          fill('#034aa6');
        }
        
        rectMode(CENTER);
        stroke(color);
        square(xPos, yPos,size);
        pop(); 
}

function createStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;

  beginShape();
  //rotate(frameCount);
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    //background(255, 0, 0);
  } else {
    song.play();
    //background(0, 255, 0);
  }
}