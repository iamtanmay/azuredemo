module.exports = async function (context, req) {
    //Get yesterday's date
    const d = new Date();
    let today = d.getDate() - 1;
    var dd = String(d.getDate()).padStart(2, '0');
    var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = d.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;
    context.log('Debug - ' + today);

    //Retrieve data
    var urlstring = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/" + today + ".csv"

    context.log('Retrieving report from: ' + urlstring);

    var storedText;

    fetch(urlstring).then(function(response) {
        response.text().then(function(text) {
        storedText = text;
        done();
        });
    });

    //Parse data into Dictionary for retrieval
    /**var dataarray = (storedText.split("\n"));
    var country_dictionary = {}

    //Skip first row - Column names
    for (var i = 1; i < dataarray.length; i++) {
        var string_row = dataarray[i];
        //Skip first 4 characters
        string_row = string_row.substring(3);
        //Split into relevant Covid fields
        var covid_data = (string_row.split(","));
        var country_name = covid_data[0];
        var confirmed = covid_data[4];
        var deaths = covid_data[5];
        country_dictionary[country_name] = confirmed + ", " + deaths;
    }**/

    //Return information for country
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = "For country " + name + " Covid confirmed, deaths ";// + country_dictionary[name];
    //const responseMessage = name
    //    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.log('Debug - ' + responseMessage);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}