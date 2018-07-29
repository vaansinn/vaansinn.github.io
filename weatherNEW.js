(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
	
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "CITY",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "CITY ID",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "TEMP",
            dataType: tableau.dataTypeEnum.float
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
        $.getJSON("http://api.openweathermap.org/data/2.5/group?id=2656490,2657060,2965768,2965535,2964405,2965140,2965929&units=metric&APPID=60249f983ea74e9da3b047c16d88e855", function(resp) {
            var list = resp.list,
                tableData = [];
			var city = resp.city;
            // Iterate over the JSON object
            for (var i = 0, len = list.length; i < len; i++) {
                tableData.push({
					"CITY ID": list[i].id,
					"CITY": list[i].name,
					"TEMP": list[i].main.temp
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
