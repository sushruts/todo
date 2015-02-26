// // http://fengyuanchen.github.io/cropper/#options
// toDoApp.directive('cropupload', function($parse, FileUploader, $timeout, $q) {
//     var $image = null;
//     var uploader = null;
//     var cropperModalId = "#cropperModal";
//     return {
//         restrict: "E",
//         replace: true,
//         scope: {
//             cropperEnabled: '=',
//             width: '=',
//             height: '=',
//             options: '=',
//             model: "@",
//             file: "@",
//             croppedImage: "@",
//             myImage: "@",
//             aggrId: "="
//         },
//         templateUrl: 'templates/chart-template.html',
//         controller: function($scope, $attrs) {

//         },
//         compile: function(element, attrs) {
//             return function(scope, element, attrs, controller) {

//             };
//         }
//     };
// });
// http://phloxblog.in/angulard3/start.html#.VONlOy7_Fdh
// http://bl.ocks.org/Caged/6476579
// http://bl.ocks.org/mbostock/3887051
// http://techslides.com/over-2000-d3-js-examples-and-demos
// https://github.com/mbostock/d3/wiki/Tutorials
toDoApp.directive('angulard3GroupbarChart', function() { // Angular Directive
    return {
        restrict: 'A',
        scope: {
            datajson: '=',
            xaxisName: '=',
            xaxisPos: '=',
            yaxisName: '=',
            yaxisPos: '=',
            d3Format: '='
                // All the Angular Directive Vaiables used as d3.js parameters
        },
        controller: function($scope, $attrs) {

            // properties are directly passed to `create` method
            $scope.GroupbarChart = function(datajson, yaxisName, yaxisPos) {
                this.datajson = datajson;
                this.yaxisName = yaxisName;
                this.yaxisPos = yaxisPos;
                this.workOnElement = function(element) {
                    this.element = element;
                };
                this.generateGraph = function() {

                    var lineData = [ { "x": 2010,   "y": 8819342},  { "x": 2011,  "y": 5204483},
                                    { "x": 2012,  "y": 4159130}, { "x": 2013,  "y": 2402070},
                                   { "x": 2014,  "y": 2704659}];
                     var lineData2 = [ { "x": 2010,   "y": 889342},  { "x": 2011,  "y": 520483},
                                    { "x": 2012,  "y": 415130}, { "x": 2013,  "y": 242070},
                                   { "x": 2014,  "y": 270459}];               

                         

                    //d3 specific coding
                    var groupSpacing = 2;
                    var margin = {
                            top: 20,
                            right: 50,
                            bottom: 30,
                            left: 80
                        },
                        width = 1260 - margin.left - margin.right,
                        height = 500 - margin.top - margin.bottom;

                    var x0 = d3.scale.ordinal()
                        .rangeRoundBands([0, width], 1);

                    var x1 = d3.scale.ordinal();
                    var y = d3.scale.linear()
                        .range([height, 0]);

                    var color = d3.scale.ordinal()
                        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

                    var xAxis = d3.svg.axis()
                        .scale(x0)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .tickFormat(d3.format(".2"));

                    var svg = d3.select(this.element).append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        data=[{
                                "Year": "2010",
                                "Under 5 Years": "8819342",
                                "5 to 13 Years": "552339",
                                "14 to 17 Years": "259034",
                                "18 to 24 Years": "450818",
                                "25 to 44 Years": "1215966",
                                "45 to 64 Years": "641667"
                            }, {
                                "Year": "2011",
                                "Under 5 Years": "5204483",
                                "5 to 13 Years": "85640",
                                "14 to 17 Years": "42153",
                                "18 to 24 Years": "74257",
                                "25 to 44 Years": "183159",
                                "45 to 64 Years": "50277"
                            }, {
                                "Year": "2012",
                                "Under 5 Years": "4159130",
                                "5 to 13 Years": "828669",
                                "14 to 17 Years": "362642",
                                "18 to 24 Years": "601943",
                                "25 to 44 Years": "1804762",
                                "45 to 64 Years": "1523681"
                            }, {
                                "Year": "2013",
                                "Under 5 Years": "2402070",
                                "5 to 13 Years": "343207",
                                "14 to 17 Years": "157204",
                                "18 to 24 Years": "264160",
                                "25 to 44 Years": "754420",
                                "45 to 64 Years": "727124"
                            }, {
                                "Year": "2014",
                                "Under 5 Years": "2704659",
                                "5 to 13 Years": "4499890",
                                "14 to 17 Years": "2159981",
                                "18 to 24 Years": "3853788",
                                "25 to 44 Years": "10604510",
                                "45 to 64 Years": "8819342"
                            }

                        ]
                    
                        var ageNames = d3.keys(data[0]).filter(function(key) {
                            return key !== "Year";
                        });
                       
                        console.log(ageNames);

                        data.forEach(function(d) {
                            d.ages = ageNames.map(function(name) {
                                console.log( {
                                    name: name,
                                    value: d[name]
                                })
                                return {
                                    name: name,
                                    value: d[name]
                                };
                            });
                        });


                        x0.domain(data.map(function(d) {
                            return d.Year;
                        }));


                        x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
                        y.domain([0, d3.max(data, function(d) {
                            return d3.max(d.ages, function(d) {
                                return d.value;
                            });
                        })]);

                        svg.selectAll(".state")
                            .data(data)
                            .enter().append("rect")
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("width", 12 * 7 * groupSpacing)
                            .attr("height", height)
                            .attr("class", "g")
                            .attr("transform", function(d, i) {
                                return "translate(" + x0(d.Year) + ",0)";
                            }).style("fill", function(d, i) {
                                if (i % 2 == 0)
                                    return "#fff";
                                else
                                    return "#f8f8f8";
                            });


                        svg.append("g")
                            .attr("class", "x axis")
                            .attr("transform", "translate(0," + height + ")")
                            .call(xAxis)

                        svg.append("g")
                            .attr("class", "y axis")
                            .call(yAxis)
                            .append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("y", this.yaxisPos)
                            .attr("dy", ".71em")
                            .style("text-anchor", "end")
                            .text(this.yaxisName);


                        var state = svg.selectAll(".state")
                            .data(data)
                            .enter().append("g")
                            .attr("class", "g")
                            .attr("transform", function(d) {
                                return "translate(" + x0(d.Year) + ",0)";
                            });

                        console.log(state);

                        state.selectAll()
                            .data(function(d) {
                                // console.log(d.ages)
                                return d.ages;
                            })
                            .enter().append("rect")
                            .attr("width", x1.rangeBand() / groupSpacing)
                            .attr("x", function(d) {
                                return x1(d.name);
                            })
                            .attr("y", function(d) {
                                return y(d.value);
                            })
                            .attr("height", function(d) {
                                return height - y(d.value);
                            })
                            .style("fill", function(d) {
                                return color(d.name);
                            })

                        // svg.append("rect")
                        //     .attr("x", 0)
                        //     .attr("y", 0)
                        //     .attr("width", 12 * 7 * groupSpacing)
                        //     .attr("height", height)
                        //     .attr("class", "g")

                        var w= 1260+ margin.left + margin.right;
                        var xx = d3.scale.ordinal()
                        .rangeRoundBands([0, w],0);
                     
                      
                        xx.domain(data.map(function(d) {
                            return d.Year;
                        }));


                        var lineFunction = d3.svg.line()
                             .x(function(d) { return xx(d.x);})
                             .y(function(d) { return y(d.y); })
                             .interpolate("step");  

                        var lineGraph = svg.append("path")
                            .attr("d", lineFunction(lineData))
                            .style("stroke-dasharray", ("7, 7"))
                            .attr("stroke", "green")
                            .attr("stroke-width", 2)                             
                            .attr("fill", "none");

                         var lineGraph2 = svg.append("path")
                            .attr("d", lineFunction(lineData2))
                            .style("stroke-dasharray", ("7, 7"))
                            .attr("stroke", "green")
                            .attr("stroke-width", 2)                             
                            .attr("fill", "none");


                    
                };
            }
        },
        link: function(scope, elem, attrs) {
            var ourGraph = new scope.GroupbarChart(scope.datajson, scope.yaxisName, scope.yaxisPos);
            //d3 related Variable initialisation
            ourGraph.workOnElement('#' + elem[0].id); // Work on particular element
            ourGraph.generateGraph(); // generate the actual bar graph
        }
    }
});