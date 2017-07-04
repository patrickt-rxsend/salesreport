import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/data.service';

export class Options {
    startDate: Date;
    endDate: Date;
    name: String;
    totalRange: number;
    interval: number;
    trendThreshold: number;
    trendCutoff: String;
    totRefThreshold: number;
    totRefCutoff: String
}

export class SortOptions {
    sortOne: String;
    sortOneOrder: String;
    sortTwo: String;
    sortTwoOrder: String;
    value: Object;
}

export class DateFunc {
    dateRangeString: Function;
    diffDays: Function;
    subDate: Function;
    addDate: Function;
    dateToString: Function;
}

export class UserParams {
    name: String;
    zipCodes: Object;
}

export class UserFunc {
    zipToString: Function;
}

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})
// var testData;
export class HomeComponent implements OnInit {

    projectName: string;
    options: Options = {
        startDate: new Date(),
        endDate: new Date(),
        name: '',
        totalRange: 120,
        interval: 30,
        trendThreshold: 2,
        trendCutoff: "Above",
        totRefThreshold: 0,
        totRefCutoff: "Below"
    }
    sortOptions: SortOptions = {
        sortOne: "Trend",
        sortOneOrder: "Ascending",
        sortTwo: "Total Referrals",
        sortTwoOrder: "Descending",
        value: {
            "Doctor": 0,
            "City": 1,
            "Zipcode": 2,
            "Trend": 3,
            "Total Referrals": 4
        }
    }
    kevin: UserParams = {
        name: "Kevin",
        zipCodes: { 94595: "True", 94596: "True", 94598: "True", 93277: "True", 93291: "True", 93292: "True", 94587: "True", 95380: "True", 95382: "True", 95202: "True", 95203: "True", 95204: "True", 95205: "True", 95206: "True", 95207: "True", 95209: "True", 95210: "True", 95212: "True", 95215: "True", 95219: "True", 94583: "True", 94806: "True", 94401: "True", 94402: "True", 94403: "True", 94404: "True", 94497: "True", 94577: "True", 94578: "True", 94579: "True", 95110: "True", 95111: "True", 95112: "True", 95113: "True", 95116: "True", 95117: "True", 95118: "True", 95119: "True", 95120: "True", 95121: "True", 95122: "True", 95123: "True", 95124: "True", 95125: "True", 95126: "True", 95127: "True", 95128: "True", 95129: "True", 95130: "True", 95131: "True", 95132: "True", 95133: "True", 95134: "True", 95135: "True", 95136: "True", 95138: "True", 95139: "True", 95148: "True", 94102: "True", 94103: "True", 94104: "True", 94105: "True", 94107: "True", 94108: "True", 94109: "True", 94110: "True", 94111: "True", 94112: "True", 94114: "True", 94115: "True", 94116: "True", 94117: "True", 94118: "True", 94121: "True", 94122: "True", 94123: "True", 94124: "True", 94127: "True", 94128: "True", 94129: "True", 94130: "True", 94131: "True", 94132: "True", 94133: "True", 94134: "True", 94070: "True", 93901: "True", 93905: "True", 93906: "True", 93908: "True", 95814: "True", 95815: "True", 95816: "True", 95817: "True", 95818: "True", 95819: "True", 95820: "True", 95821: "True", 95822: "True", 95823: "True", 95824: "True", 95825: "True", 95826: "True", 95827: "True", 95828: "True", 95829: "True", 95830: "True", 95831: "True", 95832: "True", 95833: "True", 95834: "True", 95835: "True", 95836: "True", 95837: "True", 95838: "True", 95841: "True", 95842: "True", 95864: "True", 95661: "True", 95678: "True", 95747: "True", 95677: "True", 95765: "True", 94061: "True", 94063: "True", 94065: "True", 95630: "True", 95671: "True", 95763: "True", 94702: "True", 94703: "True", 94704: "True", 94705: "True", 94709: "True", 94710: "True", 95003: "True", 96001: "True", 96002: "True", 96003: "True", 96080: "True", 94566: "True", 94588: "True", 94301: "True", 94304: "True", 94306: "True", 95966: "True", 94601: "True", 94602: "True", 94603: "True", 94605: "True", 94606: "True", 94607: "True", 94609: "True", 94610: "True", 94612: "True", 94619: "True", 94621: "True", 94945: "True", 94947: "True", 94949: "True", 94040: "True", 94041: "True", 94043: "True", 95350: "True", 95351: "True", 95354: "True", 95355: "True", 95356: "True", 95357: "True", 95358: "True", 95348: "True", 95032: "True", 95033: "True", 94550: "True", 94541: "True", 94542: "True", 94544: "True", 94545: "True", 93230: "True", 95945: "True", 95949: "True", 95020: "True", 93701: "True", 93702: "True", 93703: "True", 93705: "True", 93710: "True", 93711: "True", 93720: "True", 93721: "True", 93722: "True", 93726: "True", 93727: "True", 93728: "True", 94536: "True", 94538: "True", 94539: "True", 94555: "True", 94518: "True", 94519: "True", 94520: "True", 94521: "True", 93301: "True", 93304: "True", 93306: "True", 93307: "True", 93308: "True", 93309: "True", 93311: "True", 93313: "True", 94509: "True", 95991: "True", 95992: "True", 95993: "True" }
    }

    userFunc: UserFunc = {
        zipToString: function (a) {
            a = a.charAt(0).toLowerCase() + a.slice(1);

            var str = "Test";
            // debugger;
            for (var i in a.zipCodes) {
                str = i.toString() + ",";
                console.log(i);
            }
            return a;
        }
    }
    dateFunc: DateFunc = {
        dateRangeString: function (dateRanges) {
            var strArr = [];
            //    debugger;
            var i;
            for (i = 0; i < dateRanges.length - 1; i++) {
                strArr.push(this.dateToString(dateRanges[i]) + " to " + this.dateToString(dateRanges[i + 1]));
            }
            //    debugger;
            return strArr;
        },
        //Param1: Date Variable
        //Param2: Date Variable
        diffDays: function (day1, day2) {
            var oneDay = 24 * 60 * 60 * 1000;
            return Math.round(Math.abs((day1.getTime() - day2.getTime()) / (oneDay)));
        },
        subDate: function (date, days) {
            // debugger;
            var tempDate = new Date(date);
            return new Date(tempDate.setDate(tempDate.getDate() - days));
        },
        addDate: function (date, days) {
            var tempDate = new Date(date);
            return new Date(tempDate.setDate(tempDate.getDate() + days));
        },
        dateToString: function (x) {
            return x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + (x.getDate());
        }
    }

    clicked(event) {
        var settings = {
            "fileName": "../../data/newReport.csv",
            // "totalRange": this.dateFunc.diffDays(this.options.endDate, this.options.startDate),
            "totalRange": this.options.totalRange,
            "interval": this.options.interval,
            "endDate": this.options.endDate
        }

        // var twoSort = function (a, b) {
        //     debugger;
        //     var colOne;
        //     var colTwo;
        //     if (a[3] !== "Trend") {
        //         if (a[3] < b[3]) return -1;
        //         else if (a[3] > b[3]) return 1;
        //         else if (a[4] > b[4]) return -1;
        //         else if (a[4] < b[4]) return 1;
        //         else return 0;
        //     }
        // }
        var sortOptions = this.sortOptions;
        var twoSort = function (a, b) {
            // debugger;
            var sortOne = sortOptions.value[sortOptions.sortOne.toString()];
            var sortTwo = sortOptions.value[sortOptions.sortTwo.toString()];
            if (a[sortOne] !== sortOptions.sortOne) {
                if (sortAsc(a[sortOne], b[sortOne], sortOptions.sortOneOrder) !== 0) {
                    return sortAsc(a[sortOne], b[sortOne], sortOptions.sortOneOrder);
                } else {
                    return sortAsc(a[sortTwo], b[sortTwo], sortOptions.sortTwoOrder);
                }
            }
        }
        var sortAsc = function (a, b, order) {
            // debugger;
            if (order === "Ascending") {
                if (a < b) return -1;
                else if (a > b) return 1;
                else return 0;
            } else {
                if (b < a) return -1;
                else if (b > a) return 1;
                else return 0;
            }
        }

        //Refactor code later
        var kevinZip = { 94595: "True", 94596: "True", 94598: "True", 93277: "True", 93291: "True", 93292: "True", 94587: "True", 95380: "True", 95382: "True", 95202: "True", 95203: "True", 95204: "True", 95205: "True", 95206: "True", 95207: "True", 95209: "True", 95210: "True", 95212: "True", 95215: "True", 95219: "True", 94583: "True", 94806: "True", 94401: "True", 94402: "True", 94403: "True", 94404: "True", 94497: "True", 94577: "True", 94578: "True", 94579: "True", 95110: "True", 95111: "True", 95112: "True", 95113: "True", 95116: "True", 95117: "True", 95118: "True", 95119: "True", 95120: "True", 95121: "True", 95122: "True", 95123: "True", 95124: "True", 95125: "True", 95126: "True", 95127: "True", 95128: "True", 95129: "True", 95130: "True", 95131: "True", 95132: "True", 95133: "True", 95134: "True", 95135: "True", 95136: "True", 95138: "True", 95139: "True", 95148: "True", 94102: "True", 94103: "True", 94104: "True", 94105: "True", 94107: "True", 94108: "True", 94109: "True", 94110: "True", 94111: "True", 94112: "True", 94114: "True", 94115: "True", 94116: "True", 94117: "True", 94118: "True", 94121: "True", 94122: "True", 94123: "True", 94124: "True", 94127: "True", 94128: "True", 94129: "True", 94130: "True", 94131: "True", 94132: "True", 94133: "True", 94134: "True", 94070: "True", 93901: "True", 93905: "True", 93906: "True", 93908: "True", 95814: "True", 95815: "True", 95816: "True", 95817: "True", 95818: "True", 95819: "True", 95820: "True", 95821: "True", 95822: "True", 95823: "True", 95824: "True", 95825: "True", 95826: "True", 95827: "True", 95828: "True", 95829: "True", 95830: "True", 95831: "True", 95832: "True", 95833: "True", 95834: "True", 95835: "True", 95836: "True", 95837: "True", 95838: "True", 95841: "True", 95842: "True", 95864: "True", 95661: "True", 95678: "True", 95747: "True", 95677: "True", 95765: "True", 94061: "True", 94063: "True", 94065: "True", 95630: "True", 95671: "True", 95763: "True", 94702: "True", 94703: "True", 94704: "True", 94705: "True", 94709: "True", 94710: "True", 95003: "True", 96001: "True", 96002: "True", 96003: "True", 96080: "True", 94566: "True", 94588: "True", 94301: "True", 94304: "True", 94306: "True", 95966: "True", 94601: "True", 94602: "True", 94603: "True", 94605: "True", 94606: "True", 94607: "True", 94609: "True", 94610: "True", 94612: "True", 94619: "True", 94621: "True", 94945: "True", 94947: "True", 94949: "True", 94040: "True", 94041: "True", 94043: "True", 95350: "True", 95351: "True", 95354: "True", 95355: "True", 95356: "True", 95357: "True", 95358: "True", 95348: "True", 95032: "True", 95033: "True", 94550: "True", 94541: "True", 94542: "True", 94544: "True", 94545: "True", 93230: "True", 95945: "True", 95949: "True", 95020: "True", 93701: "True", 93702: "True", 93703: "True", 93705: "True", 93710: "True", 93711: "True", 93720: "True", 93721: "True", 93722: "True", 93726: "True", 93727: "True", 93728: "True", 94536: "True", 94538: "True", 94539: "True", 94555: "True", 94518: "True", 94519: "True", 94520: "True", 94521: "True", 93301: "True", 93304: "True", 93306: "True", 93307: "True", 93308: "True", 93309: "True", 93311: "True", 93313: "True", 94509: "True", 95991: "True", 95992: "True", 95993: "True" };
        var roseZip = {};
        var raShaudZip = {};
        var userZip;
        if (this.options.name === "Kevin") {
            userZip = kevinZip;
        } else if (this.options.name === "Rose") {
            userZip = roseZip;
        } else if (this.options.name === "RaShaud") {
            userZip = raShaudZip;
        }

        var d3 = require('d3');

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
        // makes it so dateFunc can be read inside the file
        var dateFunc = this.dateFunc;
        var kevin = this.kevin;
        var options = this.options;
        d3.text(settings.fileName, function (data) {
            // debugger;
            var startDate = dateFunc.subDate(settings.endDate, settings.totalRange);
            var doctors = {};
            var i;
            var parsedCSV = d3.csvParseRows(data);

            var newRange = getDateRanges(startDate, settings.totalRange, settings.interval, dateFunc.addDate);
            var newRangeStr = dateFunc.dateRangeString(newRange);
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
                    var intDiff = dateFunc.diffDays(new Date(refDate), startDate);

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
                // debugger;
                /**
                 * Filters out results based on trend value
                 */
                if ((doctor["Trend"] <= options.trendThreshold && options.trendCutoff === "Above") || (doctor["Trend"] >= options.trendThreshold && options.trendCutoff === "Below")) {
                    if ((doctor["Total Referrals"] <= options.totRefThreshold && options.totRefCutoff === "Above") || (doctor["Total Referrals"] >= options.totRefThreshold && options.totRefCutoff === "Below")) {
                        trendArr.push([i, doctor["city"], doctor["zipcode"], doctor["trend"], doctor["Total Referrals"]]);
                        for (i in newRangeStr) {
                            trendArr[trendArr.length - 1].push(doctor[newRangeStr[i]]);
                        }
                    }
                }
            }
            //    console.log(doctors);
            console.log(trendArr);
            // debugger;
            trendArr = trendArr.sort(twoSort);
            d3.select("p").selectAll("*").remove();
            var container = d3.select("p")
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

    constructor(private dataService: DataService) {


    }

    ngOnInit() {
        this.projectName = this.dataService.getProjectName();

    }

}