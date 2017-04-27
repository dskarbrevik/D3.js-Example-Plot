var dataset = [];

//Width and height
var w = 800;
var h = 500;
var padding = 70;

//create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", screen.width)
            .attr("height", h);

//scales for x and y axis values
var yScale = d3.scaleLinear()
           .domain([0,6])
           .range([h - padding, padding]);

var xScale = d3.scaleLinear()
            .domain([1,50])
            .range([0,w])

//our line plot
var testLine = d3.line()
                .x(function(d){return xScale(d[0])})
                .y(function(d){return yScale(d[2])});

//create Y axis
svg.append("g")
    .attr("transform", "translate("+padding+","+0+")")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale).ticks(7));

//create X axis
svg.append("g")
    .attr("transform", "translate("+padding+","+(h - padding)+")")
    .attr("class", "axis")
    .call(d3.axisBottom(xScale));

//label for Y axis
svg.append("text")
    .attr("transform", "translate(40,"+(w/2 - 60)+") rotate(-90)")
    .text("Average Die Roll Value");

//label for X axis
svg.append("text")
    .attr("transform", "translate("+(w/2+35)+","+(h-25)+")")
    .text("# of Rolls");

//create the line plot
var lines = svg.append("path")
    .data([dataset])
    .attr("transform", "translate("+padding+","+0+")")
    .attr("class","line")
    .attr("d",testLine);




    //update the plot with new dataset
    function update(){

         var line = svg.selectAll(".line")
                        .remove()
                        .exit()
                        .data([dataset])

        line.enter()
            .append("path")
            .attr("transform", "translate("+padding+","+0+")")
            .attr("class","line")
            .attr("d",testLine);


    }

    //adds to the dataset and updates line chart
    function AddOne(){
        if (dataset.length == 50) {
            document.getElementById("roll").innerHTML = "Please hit reset if you'd like to roll again.";  
        }
        
        else {
            var min = 1;
            var max = 6;
            
            if (dataset.length==0){
                
                var newNum = Math.floor(Math.random() * (max - min + 1)) + min;
                
                var newData = [dataset.length+1,newNum, newNum];

                dataset.push(newData);
                
                document.getElementById("avg").innerHTML = "Average Value = " + newNum;

                document.getElementById("roll").innerHTML = "You rolled: " + newNum;
                
            }
            else {
                var newNum = Math.floor(Math.random() * (max - min + 1)) + min;

                var sum = 0;
                for (var i = 0; i < dataset.length; i++){
                    sum += dataset[i][1]
                }
                
                sum += newNum
                
                var avgRoll = Math.round(sum/(dataset.length+1) * 100)/100;

                var newData = [dataset.length+1,newNum, avgRoll];

                dataset.push(newData);

                document.getElementById("avg").innerHTML = "Average Value = " + avgRoll;

                document.getElementById("roll").innerHTML = "You rolled: " + newNum;
            }
            
            update();
        }   
    }
    
    //resets line chart 
    function Reset(){  
        
        dataset = []
        
        document.getElementById("avg").innerHTML = "<br>";

        document.getElementById("roll").innerHTML = "<br>";
        
        update();
        
    } 