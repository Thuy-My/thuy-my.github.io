let fluctuationChart = dc.barChart("#fluctuation-chart");

d3.csv("/story/data/data-crashes.csv", function(flights) {

    flights.forEach(function(d) {
        d.Fatalities = +d.Fatalities;
        d.Engines = +d.Engines;
    });

    console.log(flights[0]);

    /* Creating crossfilter dimensions and groups */

    let flight = crossfilter(flights);
    let all = flight.groupAll;

    let date = flight.dimension(function(d) {
        return d.Date;
    });
    let dates = date.group();//d3.time.day),

    let fatality = flight.dimension(function(d) {
        return d.Fatalities;
    });
    let fatalities = fatality.group(); // ?

    let phase = flight.dimension(function(d) {
        return d.FlightPhase;
    });
    let phases = phase.group();

    let charts = [
        
        barChart()
            .dimension(date)
            .group(dates)
            .round(d3.time.day.round)
            .x(d3.time.scale()
                .domain([new Date(2008, 01, 02), new Date(2017, 11, 07)])
                .rangeRound([0, 10 * 50]))
                .filter([]),
    
        barChart() 
            .dimension(fatality)
            .group(fatalities)
            .x(d3.scale.linear()
                .domain([0, 200])   // More than 200?
                .rangeRound([0, 10 * 20])),
    
        barChart()
            .dimension(phase)
            .group(phases)
            .x(d3.scale.linear()
                .domain(flights.map(function(d) {return d.FlightPhase}))
                .rangeRound([0, 10 * 15]))
    ];

}); 