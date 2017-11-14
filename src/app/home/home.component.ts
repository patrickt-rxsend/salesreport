import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/data.service';

export class Options {
    startDate: Date;
    startDateString: String;
    endDate: Date;
    endDateString: String;
    name: String;
    pin: String;
    totalRange: number;
    interval: number;
    trendThreshold: number;
    trendCutoff: String;
    totRefThreshold: number;
    totRefCutoff: String;
    errorMessage: String;
}

export class Users {
    person: Object;
    returnPins: Function;
    returnAsObj: Function;
    returnNameSelection: Function;
}

export class Verification {
    pinNumbers: Object;
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
    advancedOptions = {
        'hideAdv': true,
        'showAdv': false
    }
    resultsGrid = 'resultsGrid';

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

    options: Options = {
        startDate: this.dateFunc.subDate(new Date(), 30),
        startDateString: null,
        endDate: new Date(),
        endDateString: null,
        name: '',
        pin: '',
        totalRange: 120,
        interval: 30,
        trendThreshold: 2,
        trendCutoff: "Above",
        totRefThreshold: 0,
        totRefCutoff: "Below",
        errorMessage: ''
    }

    users: Users = {
        person: {
            'Kevin': {
                name: 'Kevin',
                pin: '1214',
                zipcodes: { 94595:"Walnut Creek",94596:"Walnut Creek",94598:"Walnut Creek",93277:"Visalia",93291:"Visalia",93292:"Visalia",94587:"Union City",95380:"Turlock",95382:"Turlock",95202:"Stockton",95203:"Stockton",95204:"Stockton",95205:"Stockton",95206:"Stockton",95207:"Stockton",95209:"Stockton",95210:"Stockton",95212:"Stockton",95215:"Stockton",95219:"Stockton",94583:"San Ramon",94806:"San Pablo",94401:"Sam Mateo",94402:"Sam Mateo",94403:"Sam Mateo",94404:"Sam Mateo",94497:"Sam Mateo",94577:"San Leandro",94578:"San Leandro",94579:"San Leandro",95110:"San Jose",95111:"San Jose",95112:"San Jose",95113:"San Jose",95116:"San Jose",95117:"San Jose",95118:"San Jose",95119:"San Jose",95120:"San Jose",95121:"San Jose",95122:"San Jose",95123:"San Jose",95124:"San Jose",95125:"San Jose",95126:"San Jose",95127:"San Jose",95128:"San Jose",95129:"San Jose",95130:"San Jose",95131:"San Jose",95132:"San Jose",95133:"San Jose",95134:"San Jose",95135:"San Jose",95136:"San Jose",95138:"San Jose",95139:"San Jose",95148:"San Jose",94102:"San Francisco",94103:"San Francisco",94104:"San Francisco",94105:"San Francisco",94107:"San Francisco",94108:"San Francisco",94109:"San Francisco",94110:"San Francisco",94111:"San Francisco",94112:"San Francisco",94114:"San Francisco",94115:"San Francisco",94116:"San Francisco",94117:"San Francisco",94118:"San Francisco",94121:"San Francisco",94122:"San Francisco",94123:"San Francisco",94124:"San Francisco",94127:"San Francisco",94128:"San Francisco",94129:"San Francisco",94130:"San Francisco",94131:"San Francisco",94132:"San Francisco",94133:"San Francisco",94134:"San Francisco",94070:"San Carlos",93901:"Salinas",93905:"Salinas",93906:"Salinas",93908:"Salinas",95814:"Sacramento",95815:"Sacramento",95816:"Sacramento",95817:"Sacramento",95818:"Sacramento",95819:"Sacramento",95820:"Sacramento",95821:"Sacramento",95822:"Sacramento",95823:"Sacramento",95824:"Sacramento",95825:"Sacramento",95826:"Sacramento",95827:"Sacramento",95828:"Sacramento",95829:"Sacramento",95830:"Sacramento",95831:"Sacramento",95832:"Sacramento",95833:"Sacramento",95834:"Sacramento",95835:"Sacramento",95836:"Sacramento",95837:"Sacramento",95838:"Sacramento",95841:"Sacramento",95842:"Sacramento",95864:"Sacramento",95661:"Roseville",95678:"Roseville",95747:"Roseville",95677:"Rocklin",95765:"Rocklin",94061:"Redwood City",94063:"Redwood City",94065:"Redwood City",95630:"Folsom",95671:"Folsom",95763:"Folsom",94702:"Berkeley",94703:"Berkeley",94704:"Berkeley",94705:"Berkeley",94709:"Berkeley",94710:"Berkeley",95003:"Aptos",96001:"Redding",96002:"Redding",96003:"Redding",96080:"Red Bluff",94566:"Pleasanton",94588:"Pleasanton",94301:"Palo Alto",94304:"Palo Alto",94306:"Palo Alto",95966:"Oroville",94601:"Oakland",94602:"Oakland",94603:"Oakland",94605:"Oakland",94606:"Oakland",94607:"Oakland",94609:"Oakland",94610:"Oakland",94612:"Oakland",94619:"Oakland",94621:"Oakland",94945:"Novato",94947:"Novato",94949:"Novato",94040:"Mountain View",94041:"Mountain View",94043:"Mountain View",95350:"Modesto",95351:"Modesto",95354:"Modesto",95355:"Modesto",95356:"Modesto",95357:"Modesto",95358:"Modesto",95348:"Merced",95032:"Los Gatos",95033:"Los Gatos",94550:"Livermore",94541:"Hayward",94542:"Hayward",94544:"Hayward",94545:"Hayward",93230:"Hanford",95945:"Grass Valley",95949:"Grass Valley",95020:"Gilroy",93701:"Fresno",93702:"Fresno",93703:"Fresno",93705:"Fresno",93710:"Fresno",93711:"Fresno",93720:"Fresno",93721:"Fresno",93722:"Fresno",93726:"Fresno",93727:"Fresno",93728:"Fresno",94536:"Fremont",94538:"Fremont",94539:"Fremont",94555:"Fremont",94518:"Concord",94519:"Concord",94520:"Concord",94521:"Concord",93301:"Bakersfield",93304:"Bakersfield",93306:"Bakersfield",93307:"Bakersfield",93308:"Bakersfield",93309:"Bakersfield",93311:"Bakersfield",93313:"Bakersfield",94509:"Antioch",95991:"Yuba City",95992:"Yuba City",95993:"Yuba City",14602:"OAKLAND",91710:"CHINO",94062:"REDWOOD CITY",94143:"SAN FRANCISCO",94305:"PALO ALTO",94560:"NEWARK",94608:"OAKLAND",94706:"ALBANY",94801:"RICHMOND",95010:"CAPITOLA",95336:"MANTECA",95370:"SONORA",95376:"TRACY",95444:"GRATON",95608:"CARMICHAEL",95734:"TRUCKEE",945413911:"HAYWARD",946012228:"OAKLAND",946074220:"OAKLAND",946093522:"OAKLAND" }
            },
            'Rudy': {
                name: 'Rudy',
                pin: '3174',
                zipcodes: { 92804: "Anaheim", 92307: "Apple Valley", 92821: "Brea", 91710: "Chino Hills", 91723: "Covina", 91765: "Diamond Bar", 91740: "Glendora", 91746: "Hacienda Heights", 92543: "Hemet", 90017: "L.A.", 90712: "Lakewood", 90608: "Long Beach", 90720: "Los Alamitos", 90262: "Lynwood", 90640: "Montbello", 92562: "Murrieta", 92262: "Palm Sprigs", 90660: "Pico Rivera", 91767: "Pomona", 91730: "Rancho Cucamonga", 92374: "Redlands", 92506: "Riverside", 92592: "Temecula", 91786: "Upland", 92395: "Victorville", 91790: "West Covina", 90602: "Whittier", 92835: "Fullerton", 92618: "Irvine", 92663: "Newport Beach", 90255: "Huntington Park", 90723: "Paramount", 90241: "Downey", 92553: "Moreno Valley" }
            },
            'Phil': {
                name: 'Phil',
                pin: '7400',
                zipcodes: {}
            },
            'Kimberly' : {
                name: 'Kimberly',
                pin: '9820',
                zipcodes: {91101:"Pasadena",91006:"Arcadia",91007:"Arcadia",91775:"San Gabriel",91776:"San Gabriel",91754:"Monterey Park",91755:"Monterey Park",90501:"Torrance",90502:"Torrance",90503:"Torrance",90504:"Torrance",90505:"Torrance",91201:"Glendale",91202:"Glendale",91203:"Glendale",91204:"Glendale",91205:"Glendale",91206:"Glendale",91207:"Glendale",91208:"Glendale",91801:"Alhambra",91803:"Alhambra",91360:"Thousand Oaks",91301:"Agoura Hills",91376:"Agoura Hills",91377:"Agoura Hills",91302:"Calabasas",93010:"Camarillo",93012:"Camarillo",93030:"Oxnard",93033:"Oxnard",93035:"Oxnard",93001:"Ventura",93002:"Ventura",93003:"Ventura",93004:"Ventura",93005:"Ventura",93006:"Ventura",93007:"Ventura",93009:"Ventura",93101:"Santa Barbara",93103:"Santa Barbara",93105:"Santa Barbara",93109:"Santa Barbara",93110:"Santa Barbara",93111:"Santa Barbara",93448:"Pismo Beach",93449:"Pismo Beach",93454:"Santa Maria",93455:"Santa Maria",93456:"Santa Maria",93457:"Santa Maria",93458:"Santa Maria",93401:"San Luis Obispo",93402:"San Luis Obispo",93403:"San Luis Obispo",93405:"San Luis Obispo",93406:"San Luis Obispo",93407:"San Luis Obispo",93408:"San Luis Obispo",93409:"San Luis Obispo",93410:"San Luis Obispo",93412:"San Luis Obispo",93436:"Lompoc",93437:"Lompoc",93465:"Templeton"}
            }
        },
        returnPins: function () {
            return this.returnAsObj('pin');
        },
        returnAsObj: function (option) {
            var obj = {};
            var i;
            for (i in this.person) {
                obj[i] = this.person[i][option]
            }
            return obj;
        },
        returnNameSelection: function () {
            var nameSelection = [];
            var i;
            for (i in this.person) {
                nameSelection.push({ id: i.toString(), option: i.toString() })
            }
            return nameSelection;
        }
    }


    verification: Verification = {
        pinNumbers: this.users.returnAsObj('pin')
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
        nameSelection: this.users.returnNameSelection(),
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


    reportResults: ReportResults = {
        results: [[]]
    }


    verifyUser() {
        var name = this.options.name.toString();
        debugger;
        if (this.verification.pinNumbers[name] === this.options.pin) {
            this.options.errorMessage = '';
            this.resultsPane['showPane'] = true;
            this.resultsPane['hiddenPane'] = false;
            return true;
        } else {
            this.resultsPane['showPane'] = false;
            this.resultsPane['hiddenPane'] = true;
            this.options.errorMessage = "Incorrect Pin Number";
            return false;
        }
    }

    export() {
        if (this.verifyUser()) {
            var csvContent = "data:text/csv;charset=utf-8,";
            var data = this.reportResults.results.slice(0);//Clones the array
            //Turns the last name into an abbreviation
            for (var i = 1; i < data.length; i++) {
                var lastNameIndex = data[i][0].lastIndexOf(" ");
                data[i][0] = data[i][0].slice(0, lastNameIndex + 2) + ".";
            }
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
    }

    showAdvanced() {
            this.advancedOptions['showAdv'] = true;
            this.advancedOptions['hideAdv'] = false;
    }

    getResults() {
        if (this.verifyUser()) {
            this.reportResults.results = [[]];

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
                "endDate": this.options.endDate,
                "startDate": this.options.startDate
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
                        if (options.name === "Phil" || userZip[doctor["zipcode"]])
                            return true;
                    }
                }
                return false;
            }

            //Refactor code later
            var userZips = this.users.returnAsObj('zipcodes');
            debugger;
            var userZip;
            userZip = userZips[this.options.name.toString()];

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
            var linearRegression = function (x, y) {
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
            var options = this.options;
            var selections = this.selections;
            var referral = this.filterOptions.referral;
            var trendArr = this.reportResults.results;
            d3.text(settings.fileName, function (data) {
                // debugger;

                //To switch later if needed
                // var startDate = settings.startDate;
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
    }



    constructor(private dataService: DataService) {


    }

    ngOnInit() {
        this.projectName = this.dataService.getProjectName();

    }

}