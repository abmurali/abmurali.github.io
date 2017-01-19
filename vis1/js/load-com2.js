function load2() {

		var listOfLocalities = [];
		var localities = {};
		var localitiesPEC = {};
		var localitiesTEG = {};
		var localitiesTEC = {};

		Papa.parse('data/total_primary_energy_production.csv', {    //Total Primary Energy Production
		
			download: true,
			header: true,
			dynamicTyping: true,
			complete: function(results) 
			{
				parse1 (results,localities,listOfLocalities) 
				
				Papa.parse('data/total_primary_energy_consumption.csv', {	//Total Primary Energy Consumption
		
							download: true,
							header: true,
							dynamicTyping: true,
							complete: function(results) 
							{
								var localitiesPEC = {};		
								parse1 (results,localitiesPEC,listOfLocalities)
								
								Papa.parse('data/total_electricity_generation.csv', {	//Total Electricity Generation
		
								download: true,
								header: true,
								dynamicTyping: true,
								complete: function(results) 
								{
									var localitiesTEG = {};
									parse1 (results,localitiesTEG,listOfLocalities) 
									
									Papa.parse('data/total_electricity_consumption.csv', {		//Total Electricity Consumption
							
												download: true,
												header: true,
												dynamicTyping: true,
												complete: function(results) 
												{
													var localitiesTEC = {};		
													parse1 (results,localitiesTEC,listOfLocalities)

													Papa.parse('data/renewable_electricity_generation.csv', {		//Renewable Electricity Production
							
													download: true,
													header: true,
													dynamicTyping: true,
													complete: function(results) 
													{
														var localitiesREP = {};	
														parse1 (results,localitiesREP,listOfLocalities)

														Papa.parse('data/renewable_electricity_consumption.csv', {		//Renewable Electricity Consumption
							
														download: true,
														header: true,
														dynamicTyping: true,
														complete: function(results) 
														{
															var localitiesREC = {};
															parse1 (results,localitiesREC,listOfLocalities)

															Papa.parse('data/renewable_biofuel_production.csv', {		//Renewable Biofuel Production
							
															download: true,
															header: true,
															dynamicTyping: true,
															complete: function(results) 
															{
																var localitiesRBP = {};
																parse1 (results,localitiesRBP,listOfLocalities)

																Papa.parse('data/renewable_biofuel_consumption.csv', {		//Renewable Biofuel Consumption
							
																download: true,
																header: true,
																dynamicTyping: true,
																complete: function(results) 
																{
																	var localitiesRBC = {};	
																	parse1 (results,localitiesRBC,listOfLocalities)

																	Papa.parse('data/petroleum_production.csv', {		//Petroleum Production
							
																	download: true,
																	header: true,
																	dynamicTyping: true,
																	complete: function(results) 
																	{
																		var localitiesPP = {};	
																		parse1 (results,localitiesPP,listOfLocalities)

																		Papa.parse('data/petroleum_consumption.csv', {		//Petroleum Consumption
							
																		download: true,
																		header: true,
																		dynamicTyping: true,
																		complete: function(results) 
																		{
																			var localitiesPC = {};
																			parse1 (results,localitiesPC,listOfLocalities)

																			Papa.parse('data/coal_production.csv', {		//Coal Production
							
																			download: true,
																			header: true,
																			dynamicTyping: true,
																			complete: function(results) 
																			{
																				var localitiesCP = {};	
																				parse1 (results,localitiesCP,listOfLocalities)

																				Papa.parse('data/coal_consumption.csv', {		//Coal Consumption
							
																				download: true,
																				header: true,
																				dynamicTyping: true,
																				complete: function(results) 
																				{
																					var localitiesCC = {};	
																					parse1 (results,localitiesCC,listOfLocalities)

																					Papa.parse('data/co2_emissions_per_capita.csv', {		//CO2 Emissions
							
																					download: true,
																					header: true,
																					dynamicTyping: true,
																					complete: function(results) 
																					{
																						var localitiesCOE = {};	
																						parse1 (results,localitiesCOE,listOfLocalities)
													
				
				

					// make bar chart
				drawlineChart2(localities,'United States',"Total primary energy (in quadrillion BTU)");


				
				d3.select('#radio2')
				.on('change',function() {
				d3.select("#main2").selectAll('g').remove();	

				var selection = document.getElementById('radio2');
				var value = selection.options[selection.selectedIndex].value;
				console.log("value "+ value);

				if(value=="Bar") {
						console.log("drawing bar chart");
						drawBarChart2(localities,'United States',"Total primary energy (in quadrillion BTU)");

						// populate selection list
						d3.select('#selectionWidget2').selectAll('option').data(listOfLocalities).enter().append('option')
							.html(function(d) { return d; })
							.attr('value', function(d) { return d; })

						d3.select("#selectionWidget2")
							.on('change', function() {

								// clear the contents of the chart
								d3.select("#main2").selectAll('g').remove();

								// figure out the newly selected locality
								var selection = document.getElementById('selectionWidget2');
								var localityName = selection.options[selection.selectedIndex].value;

								console.log('new locality: ' + localityName);

								drawBarChart2(localities,localityName,"Total primary energy (in quadrillion BTU)");


								d3.select('#energywidget2')
								.on('change', function() {

									// clear the contents of the chart
									d3.select("#main2").selectAll('g').remove();

									// re-draw bar chart for the new locality and energy type
									var selection = document.getElementById('energywidget2');
									var value = selection.options[selection.selectedIndex].value;
									console.log("Energy Type: "+ value);

									if (value == "Total Primary Energy Production") {
										console.log("drawing Production chart");
										drawBarChart2(localities,localityName,"Total primary energy (in quadrillion BTU)");
										}

									else if (value == "Total Primary Energy Consumption") {
										console.log("drawing Consumption chart");
										drawBarChart2(localitiesPEC,localityName,"Total primary energy (in quadrillion BTU)");
										}

									else if (value == "Total Electricity Generation") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesTEG,localityName,"Total electricity (billion Kilowatt-hours)");
										}

									else if (value == "Total Electricity Consumption") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesTEC,localityName,"Total electricity (billion Kilowatt-hours)");
										}

									else if (value == "Renewable Electricity Production") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesREP,localityName,"Renewable electricity (billion Kilowatt-hours)");
										}

									else if (value == "Renewable Electricity Consumption") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesREC,localityName,"Renewable electricity (billion Kilowatt-hours)");
										}

									else if (value == "Renewable Biofuels Production") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesRBP,localityName,"Renewable biofuels (thousand barrels per day)");
										}

									else if (value == "Renewable Biofuels Consumption") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesRBC,localityName,"Renewable biofuels (thousand barrels per day)");
										}

									else if (value == "Petroleum Production") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesPP,localityName,"Petroleum (thousand barrels per day)");
										}

									else if (value == "Petroleum Consumption") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesPC,localityName,"Petroleum (thousand barrels per day)");
										}

									else if (value == "Coal Production") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesCP,localityName,"Coal (million short tons)");
										}

									else if (value == "Coal Consumption") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesCC,localityName,"Coal (million short tons)");
										}

									else if (value == "CO2 Emissions") {
										console.log("drawing Production chart");
										drawBarChart2(localitiesCOE,localityName,"CO2 emissions (metric tons per capita)");
										}

									})
								})
								}

						else if(value=="Line") 
						{
						console.log("drawing Line chart");
						drawlineChart2(localities,'United States',"Total primary energy (in quadrillion BTU)");

						// populate selection list
						d3.select('#selectionWidget2').selectAll('option').data(listOfLocalities).enter().append('option')
							.html(function(d) { return d; })
							.attr('value', function(d) { return d; })

						d3.select("#selectionWidget2")
							.on('change', function() {

								// clear the contents of the chart
								d3.select("#main2").selectAll('g').remove();

								// figure out the newly selected locality
								var selection = document.getElementById('selectionWidget2');
								var localityName = selection.options[selection.selectedIndex].value;

								console.log('new locality: ' + localityName);

								drawlineChart2(localities,localityName,"Total primary energy (in quadrillion BTU)");


								d3.select('#energywidget2')
								.on('change', function() {

									// clear the contents of the chart
									d3.select("#main2").selectAll('g').remove();

									// re-draw bar chart for the new locality and energy type
									var selection = document.getElementById('energywidget2');
									var value = selection.options[selection.selectedIndex].value;
									console.log("Energy Type: "+ value);

									if (value == "Total Primary Energy Production") {
										console.log("drawing Production chart");
										drawlineChart2(localities,localityName,"Total primary energy (in quadrillion BTU)");
										}

									else if (value == "Total Primary Energy Consumption") {
										console.log("drawing Consumption chart");
										drawlineChart2(localitiesPEC,localityName,"Total primary energy (in quadrillion BTU)");
										}

									else if (value == "Total Electricity Generation") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesTEG,localityName,"Total electricity (billion Kilowatt-hours)");
										}

									else if (value == "Total Electricity Consumption") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesTEC,localityName,"Total electricity (billion Kilowatt-hours)");
										}

									else if (value == "Renewable Electricity Production") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesREP,localityName,"Renewable electricity (billion Kilowatt-hours)");
										}

									else if (value == "Renewable Electricity Consumption") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesREC,localityName,"Renewable electricity (billion Kilowatt-hours)");
										}

									else if (value == "Renewable Biofuels Production") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesRBP,localityName,"Renewable biofuels (thousand barrels per day)");
										}

									else if (value == "Renewable Biofuels Consumption") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesRBC,localityName,"Renewable biofuels (thousand barrels per day)");
										}

									else if (value == "Petroleum Production") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesPP,localityName,"Petroleum (thousand barrels per day)");
										}

									else if (value == "Petroleum Consumption") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesPC,localityName,"Petroleum (thousand barrels per day)");
										}

									else if (value == "Coal Production") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesCP,localityName,"Coal (million short tons)");
										}

									else if (value == "Coal Consumption") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesCC,localityName,"Coal (million short tons)");
										}

									else if (value == "CO2 Emissions") {
										console.log("drawing Production chart");
										drawlineChart2(localitiesCOE,localityName,"CO2 emissions (metric tons per capita)");
										}

									})
								})
						}

					})
			}
		});
			}
		});
			}
		});
			}
		});
			}		
		});
			}
		});
			}
		});
			}
		});
			}
		});
			}
		});
			}
		});
			}
		});	
			}
	});
}



function parse1 (results,localities,listOfLocalities) {
	// loop through all the rows in file
				for (var row=0; row < results.data.length; row++)
				{
					var record = results.data[row];
					
					// make an object to store data for the current locality
					var locality = {
						name: record.Locality,
						energyProduction: []
					}

					// loop through all years, from 1980 to 2012
					for (var year=1980; year<=2012; year++) 
					{
						var value = record[year];

						// deal with missing data points
						if (value === '--') {
							value = 0;
						}
						else if (value === 'NA') {
							value = 0;
						}
						else if (value === '(s)') {
							value = 0;
						}
						else if (value === 'W') {
							value = 0;
						}

						// add record of current energy production
						locality.energyProduction.push( value );
					}

					// add the current locality to an index
					localities[ locality.name] = locality;
					listOfLocalities.push( locality.name );
				}
		return results,locality, listOfLocalities;
}


					
