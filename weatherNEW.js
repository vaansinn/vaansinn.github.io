(function() {
	var cityID = [2965768,2965535,2964405,2965140,2965929,7778677,2964179,2961123,2963397,2965654,2962941,2964540,2962304,2961086,2960963,2962840,2964528,2961423,2962308,2962568];
    // Create the connector object
    var myConnector = tableau.makeConnector();
	
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "CITY",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "TEMP",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "PRES",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "HUM",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "RISE",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "SET",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "LONG",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "LAT",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "ICON",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "DESCR",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "WeatherFeed",
            alias: "On the Day Weather",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://api.openweathermap.org/data/2.5/group?id=" + cityID + "&units=metric&APPID=60249f983ea74e9da3b047c16d88e855", function(resp) {
            var list = resp.list,
                tableData = [];
			var city = resp.city;
            // Iterate over the JSON object
            for (var i = 0, len = list.length; i < len; i++) {
                tableData.push({
					"CITY": list[i].name,
					"TEMP": list[i].main.temp,
					"PRES": list[i].main.pressure,
					"HUM": list[i].main.humidity,
					"RISE": list[i].sys.sunrise,
					"SET": list[i].sys.sunset,
					"LONG": list[i].coord.lon,
					"LAT": list[i].coord.lat,
					"ICON": list[i].weather[0].icon,
					"DESCR": list[i].weather[0].description
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Ireland Weather Data"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
