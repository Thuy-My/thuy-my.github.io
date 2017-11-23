

let chart = dc.barChart("#test"), counter = dc.numberDisplay('\#counter');

d3.csv("/story/data/data-crashes.csv", function(flights) {

    flights.forEach(function(d) {
        d.Fatalities = +d.Fatalities;
        d.Engines = +d.Engines;
    });

    console.log(flights[0]);

    let flight = crossfilter(flights),
        all = flight.groupAll,
        date = flight.dimension(function(d) {
            return d.Date;
        }),
        dates = date.group(),//d3.time.day),
        fatality = flight.dimension(function(d) {
            return d.Fatalities;
        }),
        fatalities = fatality.group(), // ?
        phase = flight.dimension(function(d) {
            return d.FlightPhase;
        }),
        phases = phase.group();

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