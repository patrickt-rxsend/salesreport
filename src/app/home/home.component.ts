import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/data.service';

export class Options {
    startDate: Date;
    endDate: Date;
    endDateString: String;
    name: String;
    totalRange: number;
    interval: number;
    trendThreshold: number;
    trendCutoff: String;
    totRefThreshold: number;
    totRefCutoff: String
}
export class Selections {
    addToSelection: Function;
    removeFromSelection: Function;
    removeAllSelection: Function;
    nameSelection: Array<Object>;
    orderSelection: Array<Object>;
    setDefaultOrderSelection: Function;
    referralSelection: Array<Object>;
}

export class SortOptions {
    sortOne: String;
    sortOneOrder: String;
    sortTwo: String;
    sortTwoOrder: String;
    value: Object;
    setDefaultValue: Function;
    addValue: Function;
}
export class FilterOptions {
    referral: String;
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

export class ReportResults {
    results: Array<Array<string>>;
}

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
// var testData;
export class HomeComponent implements OnInit {

    projectName: string;
    resultsPane = {
        'hidePane': true,
        'showPane': false
    }
    resultsGrid = 'resultsGrid';

    options: Options = {
        startDate: new Date(),
        endDate: new Date(),
        endDateString: null,
        name: '',
        totalRange: 120,
        interval: 30,
        trendThreshold: 2,
        trendCutoff: "Above",
        totRefThreshold: 0,
        totRefCutoff: "Below"
    }

    selections: Selections = {
        addToSelection: function (selection, val) {
            // debugger;
            // DEFINITELY NEED TO FIX THIS
            var i;
            // debugger;
            for (i in this[selection]) {
                if (this[selection][i]["id"] === val.toString()) {
                    return;
                }
            }
            this[selection].push({ id: val.toString(), option: val.toString() });
        },
        removeFromSelection: function () { },
        removeAllSelection: function (selection) {
            this[selection].length = 0;
        },
        nameSelection: [
            { id: 'Kevin', option: 'Kevin' },
            { id: 'Rose', option: 'Rose' },
            { id: 'RaShaud', option: 'RaShaud' },
        ],
        orderSelection: [
            { id: 'Doctor', option: 'Doctor' },
            { id: 'City', option: 'City' },
            { id: 'Zipcode', option: 'Zipcode' },
            { id: 'Trend', option: 'Trend' },
            { id: 'Total Referrals', option: 'Total Referrals' },
        ],
        setDefaultOrderSelection: function () {
            this.orderSelection = [
                { id: 'Doctor', option: 'Doctor' },
                { id: 'City', option: 'City' },
                { id: 'Zipcode', option: 'Zipcode' },
                { id: 'Trend', option: 'Trend' },
                { id: 'Total Referrals', option: 'Total Referrals' },
            ]
        },
        referralSelection: [
            { id: 'All', option: 'All' }
        ]
    }
    sortOptions: SortOptions = {
        sortOne: "Trend",
        sortOneOrder: "Ascending",
        sortTwo: "Total Referrals",
        sortTwoOrder: "Descending",
        addValue: function (newVal, selections) {
            //This is kind of hacked in. May need to refactor in order to improve performance.
            // debugger;
            if (!this.value[newVal.toString()]) {
                selections.addToSelection('orderSelection', newVal);
                this.value[newVal.toString()] = selections.orderSelection.length - 1;
            }
        },
        setDefaultValue: function () {
            this.value = {
                "Doctor": 0,
                "City": 1,
                "Zipcode": 2,
                "Trend": 3,
                "Total Referrals": 4
            }
        },
        value: {
            "Doctor": 0,
            "City": 1,
            "Zipcode": 2,
            "Trend": 3,
            "Total Referrals": 4
        }
    }
    filterOptions: FilterOptions = {
        referral: 'All'
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

    reportResults: ReportResults = {
        results: [[]]
    }

    export() {
        var csvContent = "data:text/csv;charset=utf-8,";
        var data = this.reportResults.results;
        var dataString;
        data.forEach(function (infoArray, index) {

            dataString = infoArray.join(",");
            csvContent += index < data.length ? dataString + "\n" : dataString;

        });
        var opt = this.options;
        var fileName = opt.name.toString() + "_" + this.dateFunc.dateToString(opt.endDate) + "_Past" + opt.totalRange + "_Interval" + opt.interval + ".csv";
        
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName);
        document.body.appendChild(link); // Required for FF

        link.click(); 
    }

    getResults() {
        this.reportResults.results = [[]];
        this.resultsPane['hiddenPane'] = false;
        this.resultsPane['showPane'] = true;
        //Resets values to default
        this.selections.setDefaultOrderSelection();
        this.sortOptions.setDefaultValue();
        if (this.options.endDateString !== null) {
            this.options.endDate = new Date(this.options.endDateString.toString());
        }
        var settings = {
            "fileName": "../../data/newReport.csv",
            // "totalRange": this.dateFunc.diffDays(this.options.endDate, this.options.startDate),
            "totalRange": this.options.totalRange,
            "interval": this.options.interval,
            "endDate": this.options.endDate
        }
        var referralList = {};
        // debugger;


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

        /**
         * Sorts by comparing two different elements.
         * If rhte first sort option is equal, then the second option is considered instead
         */
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

        /**
         * Sorting function
        **/
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
        var filter = function (doctor) {
            if ((doctor["trend"] <= options.trendThreshold && options.trendCutoff === "Above") || (doctor["trend"] >= options.trendThreshold && options.trendCutoff === "Below")) {
                if ((doctor["Total Referrals"] <= options.totRefThreshold && options.totRefCutoff === "Above") || (doctor["Total Referrals"] >= options.totRefThreshold && options.totRefCutoff === "Below")) {
                    if (userZip[doctor["zipcode"]])
                        return true;
                }
            }
            return false;
        }

        //Refactor code later
        var kevinZip = { 94595: "True", 94596: "True", 94598: "True", 93277: "True", 93291: "True", 93292: "True", 94587: "True", 95380: "True", 95382: "True", 95202: "True", 95203: "True", 95204: "True", 95205: "True", 95206: "True", 95207: "True", 95209: "True", 95210: "True", 95212: "True", 95215: "True", 95219: "True", 94583: "True", 94806: "True", 94401: "True", 94402: "True", 94403: "True", 94404: "True", 94497: "True", 94577: "True", 94578: "True", 94579: "True", 95110: "True", 95111: "True", 95112: "True", 95113: "True", 95116: "True", 95117: "True", 95118: "True", 95119: "True", 95120: "True", 95121: "True", 95122: "True", 95123: "True", 95124: "True", 95125: "True", 95126: "True", 95127: "True", 95128: "True", 95129: "True", 95130: "True", 95131: "True", 95132: "True", 95133: "True", 95134: "True", 95135: "True", 95136: "True", 95138: "True", 95139: "True", 95148: "True", 94102: "True", 94103: "True", 94104: "True", 94105: "True", 94107: "True", 94108: "True", 94109: "True", 94110: "True", 94111: "True", 94112: "True", 94114: "True", 94115: "True", 94116: "True", 94117: "True", 94118: "True", 94121: "True", 94122: "True", 94123: "True", 94124: "True", 94127: "True", 94128: "True", 94129: "True", 94130: "True", 94131: "True", 94132: "True", 94133: "True", 94134: "True", 94070: "True", 93901: "True", 93905: "True", 93906: "True", 93908: "True", 95814: "True", 95815: "True", 95816: "True", 95817: "True", 95818: "True", 95819: "True", 95820: "True", 95821: "True", 95822: "True", 95823: "True", 95824: "True", 95825: "True", 95826: "True", 95827: "True", 95828: "True", 95829: "True", 95830: "True", 95831: "True", 95832: "True", 95833: "True", 95834: "True", 95835: "True", 95836: "True", 95837: "True", 95838: "True", 95841: "True", 95842: "True", 95864: "True", 95661: "True", 95678: "True", 95747: "True", 95677: "True", 95765: "True", 94061: "True", 94063: "True", 94065: "True", 95630: "True", 95671: "True", 95763: "True", 94702: "True", 94703: "True", 94704: "True", 94705: "True", 94709: "True", 94710: "True", 95003: "True", 96001: "True", 96002: "True", 96003: "True", 96080: "True", 94566: "True", 94588: "True", 94301: "True", 94304: "True", 94306: "True", 95966: "True", 94601: "True", 94602: "True", 94603: "True", 94605: "True", 94606: "True", 94607: "True", 94609: "True", 94610: "True", 94612: "True", 94619: "True", 94621: "True", 94945: "True", 94947: "True", 94949: "True", 94040: "True", 94041: "True", 94043: "True", 95350: "True", 95351: "True", 95354: "True", 95355: "True", 95356: "True", 95357: "True", 95358: "True", 95348: "True", 95032: "True", 95033: "True", 94550: "True", 94541: "True", 94542: "True", 94544: "True", 94545: "True", 93230: "True", 95945: "True", 95949: "True", 95020: "True", 93701: "True", 93702: "True", 93703: "True", 93705: "True", 93710: "True", 93711: "True", 93720: "True", 93721: "True", 93722: "True", 93726: "True", 93727: "True", 93728: "True", 94536: "True", 94538: "True", 94539: "True", 94555: "True", 94518: "True", 94519: "True", 94520: "True", 94521: "True", 93301: "True", 93304: "True", 93306: "True", 93307: "True", 93308: "True", 93309: "True", 93311: "True", 93313: "True", 94509: "True", 95991: "True", 95992: "True", 95993: "True" };
        var raShaudZip = { 92506: "True", 92377: "True", 92262: "True", 92395: "True", 92307: "True", 92562: "True", 92563: "True", 92592: "True", 92543: "True", 92103: "True", 92117: "True", 92120: "True", 92123: "True", 91910: "True", 92024: "True", 92064: "True", 92663: "True", 92618: "True", 90723: "True", 91740: "True", 91723: "True", 91790: "True", 90255: "True", 91356: "True", 91360: "True", 91361: "True", 91801: "True", 91105: "True", 90505: "True", 90015: "True", 90045: "True", 90720: "True", 90712: "True", 90301: "True", 90813: "True" };
        var roseZip = { 92801: "True", 92804: "True", 91007: "True", 91760: "True", 90211: "True", 90621: "True", 90620: "True", 90703: "True", 90701: "True", 91723: "True", 90240: "True", 90241: "True", 90242: "True", 91731: "True", 91733: "True", 92840: "True", 90631: "True", 90638: "True", 90712: "True", 90808: "True", 90720: "True", 90027: "True", 90057: "True", 90020: "True", 90017: "True", 90048: "True", 90095: "True", 90015: "True", 90033: "True", 90262: "True", 90640: "True", 91754: "True", 90650: "True", 90660: "True", 91770: "True", 90404: "True", 90601: "True", 90602: "True", 90603: "True", 90605: "True", 90606: "True" };
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
        var selections = this.selections;
        var referral = this.filterOptions.referral;
        var trendArr = this.reportResults.results;
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
                var refType = drArr[4].toString();
                // Referral code goes here
                // debugger;
                if (refDate <= settings.endDate && refDate >= startDate) {
                    //Add to the doctor's object
                    // debugger;
                    //Only adds if referral either equals to 'All', or the current refType from data is equal to referral
                    if (referral === 'All' || referral === refType) {
                        if (!doctors[drName]) {
                            doctors[drName] = {};
                            doctors[drName]["city"] = drArr[1];
                            doctors[drName]["zipcode"] = drArr[2];
                            for (i in newRangeStr) {
                                doctors[drName][newRangeStr[i]] = 0;
                            }
                            doctors[drName]["trend"] = 0;
                            referralList[refType] = true;
                        }
                        //Adds counts to correct date range
                        var intDiff = dateFunc.diffDays(new Date(refDate), startDate);

                        var rangeEst = Math.floor(intDiff / settings.interval);
                        var drRange = doctors[drName][newRangeStr[rangeEst]];
                        doctors[drName][newRangeStr[rangeEst]] = doctors[drName][newRangeStr[rangeEst]] + parseInt(drArr[5]);
                    }
                }
            }

            console.log(referralList);
            for (i in referralList) {
                selections.addToSelection("referralSelection", i.toString());
            }

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
                doctor["Total Referrals"] = count;
                lr = linearRegression(y, x);
                doctor["trend"] = lr["slope"];
            }
            // var trendArr = [[]];// = [["Doctor", "City", "Zipcode", "Trend", "Total Referrals"]];
            var i;
            //Adds to the first column
            for (i in newRangeStr) {
                // trendArr[0].push(newRangeStr[i]);
                sortOptions.addValue(newRangeStr[i], selections);
            }
            //Adds additional stuff to order selection for user
            for (i in selections.orderSelection) {
                // debugger;
                trendArr[0].push(selections.orderSelection[i]['option'].toString());
            }

            for (i in doctors) {
                var doctor = doctors[i];
                // debugger;
                /**
                 * Filters out results based on trend value
                 */
                if (filter(doctor)) {
                    // debugger;
                    trendArr.push([i, doctor["city"], doctor["zipcode"], doctor["trend"], doctor["Total Referrals"]]);
                    for (i in newRangeStr) {
                        trendArr[trendArr.length - 1].push(doctor[newRangeStr[i]]);
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
                .data(function (d) {
                    // debugger;
                    return d;
                }).enter()
                .append("td")
                .text(function (d) {
                    // debugger;
                    return d;
                });
        });
    }



    constructor(private dataService: DataService) {


    }

    ngOnInit() {
        this.projectName = this.dataService.getProjectName();

    }

}