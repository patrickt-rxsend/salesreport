import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/data.service';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})
// var testData;
export class HomeComponent implements OnInit {

    projectName: string;

    constructor(private dataService: DataService) {
        var settings = {
            "fileName": "../../data/past180days20170612.csv",
            "totalRange": 120,
            "interval": 30,
            "endDate": new Date("2017-06-12")
        }
        var d3 = require('d3');
        function subDate(date, days) {
            var tempDate = new Date(date);
            return new Date(tempDate.setDate(tempDate.getDate() - days));
        }
        function addDate(date, days) {
            var tempDate = new Date(date);
            return new Date(tempDate.setDate(tempDate.getDate() + days));
        }
        var dateToString = function (x) {
            return x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + (x.getDate());
        }

        var dateFunc = {};
        //Get Date ranges into an array based on initial date, amount of days to go back, and newinterval
        //if newinterval goes past the amount of days, it'll still have the full date range for that newinterval (it won't cut any newintervals short)
        var getDateRanges = function (initDate, amtDays, newinterval, funcDate) {
            if (!newinterval) {
                newinterval = settings.interval;
            } else {
                settings.interval = newinterval;
            }
            var dateRange = [];
            var counter = 1;
            dateRange.push(initDate);

            while (true) {
                dateRange.push(funcDate(initDate, newinterval * counter));
                counter++;
                if (counter * newinterval >= amtDays) {
                    dateRange.push(funcDate(initDate, newinterval * counter));
                    break;
                }
            }
            //    debugger;
            return dateRange;
        }

        //Turn the range of dates into a usable string for keys
        var dateRangeString = function (dateRanges) {
            var strArr = [];
            //    debugger;
            var i;
            for (i = 0; i < dateRanges.length - 1; i++) {
                strArr.push(dateToString(dateRanges[i]) + " to " + dateToString(dateRanges[i + 1]));
            }
            //    debugger;
            return strArr;
        }

        //Finds the difference between two dates
        //Param1: Date Variable
        //Param2: Date Variable
        var diffDays = function (day1, day2) {
            var oneDay = 24 * 60 * 60 * 1000;
            return Math.round(Math.abs((day1.getTime() - day2.getTime()) / (oneDay)));
        }

        //x is date range
        //y is value
        function linearRegression(x, y) {
            var lr = {};
            var n = y.length;
            var sum_x = 0;
            var sum_y = 0;
            var sum_xy = 0;
            var sum_xx = 0;
            var sum_yy = 0;

            for (var i = 0; i < y.length; i++) {

                sum_x += x[i];
                sum_y += y[i];
                sum_xy += (x[i] * y[i]);
                sum_xx += (x[i] * x[i]);
                sum_yy += (y[i] * y[i]);
            }
            // debugger;
            lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
            lr['intercept'] = (sum_y - lr['slope'] * sum_x) / n;
            lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);

            return lr;
        }
        /**
         * Begin reading file
         */
        d3.text(settings.fileName, function (data) {
            var startDate = subDate(settings.endDate, settings.totalRange);
            var doctors = {};
            var i;
            var parsedCSV = d3.csvParseRows(data);

            /*
             *  MOST DEFINITEL YNEEDS TO BE CLEANED UP
             **/
            var newRange = getDateRanges(startDate, settings.totalRange, settings.interval, addDate);
            var newRangeStr = dateRangeString(newRange);

            //test pieces
            //    middleDate = newRange[1];
            //    startDate = newRange[2];
            //    console.log(newRange);
            //    console.log(parsedCSV);

            // 0"Doctor"
            // 1"city"0
            // 2"Zipcode"
            // 3"Date_"
            // 4"Document_Folder"
            // 5"count()"

            //creates an object list of doctors with relevant information
            //Also puts the count for the date ranges
            for (i in parsedCSV) {


                var drArr = parsedCSV[i];
                var drName = drArr[0].toString();
                var refDate = new Date(drArr[3]);
                if (refDate <= settings.endDate && refDate >= startDate) {
                    //Add to the doctor's object
                    if (!doctors[drName]) {
                        doctors[drName] = {};
                        doctors[drName]["city"] = drArr[1];
                        doctors[drName]["zipcode"] = drArr[2];
                        for (i in newRangeStr) {
                            doctors[drName][newRangeStr[i]] = 0;
                        }
                        doctors[drName]["trend"] = 0;
                    }

                    //Adds counts to correct date range
                    var intDiff = diffDays(new Date(refDate), startDate);

                    var rangeEst = Math.floor(intDiff / settings.interval);
                    var drRange = doctors[drName][newRangeStr[rangeEst]];
                    doctors[drName][newRangeStr[rangeEst]] = doctors[drName][newRangeStr[rangeEst]] + parseInt(drArr[5]);
                }
            }

            console.log(doctors);

            //Finds trend value for each doctor-
            ///// <reference path="//" />

            for (i in doctors) {
                var doctor = doctors[i];
                var count = 0;
                var count2 = 1;
                var i;
                var x = [];
                var y = [];
                var lr;
                //   debugger;
                for (i in newRangeStr) {
                    count += doctor[newRangeStr[i]];
                    y.push(count2++);
                    x.push(parseInt(doctor[newRangeStr[i]]));
                }
                //   console.log("X: " + x + "||Y: " + y);
                doctor["Total Referrals"] = count;

                lr = linearRegression(y, x);

                doctor["trend"] = lr["slope"];

            }
            var trendArr = [["Doctor", "City", "Zipcode", "Trend", "Total Referrals"]];
            for (i in newRangeStr) {
                trendArr[trendArr.length - 1].push(newRangeStr[i]);
            }
            for (i in doctors) {
                var doctor = doctors[i];
                //    debugger;
                trendArr.push([i, doctor["city"], doctor["zipcode"], doctor["trend"], doctor["Total Referrals"]]);
                for (i in newRangeStr) {
                    trendArr[trendArr.length - 1].push(doctor[newRangeStr[i]]);
                }
            }
            //    console.log(doctors);
            console.log(trendArr);
            var container = d3.select("body")
                .append("table")
                .selectAll("tr")
                .data(trendArr).enter()
                .append("tr")

                .selectAll("td")
                .data(function (d) { return d; }).enter()
                .append("td")
                .text(function (d) { return d; });
        });

    }

    ngOnInit() {
        this.projectName = this.dataService.getProjectName();

    }

}