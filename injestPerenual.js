const axios = require('axios');
const fs = require('fs');

async function getPlansListByPage(page=1) {
    try {
        const url = `https://perenual.com/api/species-list?key=sk-xR4w6562f3eb602473131&page=${page}`
        // console.log(url)
        const response = await axios.get(url); // Replace with the actual API endpoint
        return response.data.data; // Assuming the data is in the 'data' property of the response
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        throw error;
    }
}

function writeDataToFile(data) {
    try {
        const jsonContent = JSON.stringify(data, null, 2);
        fs.writeFileSync('output.json', jsonContent);
        console.log('Data has been written to output.json');
      } catch (error) {
        console.error('Error writing data to file:', error.message);
        throw error;
    }
}

async function injestData() {
    try {
        // Fetch data from the API
        let plants = []
        for(let i = 1; i < 1000; i++) {
            try {
                const apiData = await getPlansListByPage(i);
                plants.push(...apiData)

            } catch(e) {
                break
            }
            // console.log(plants)
        }
        // Write data to a JSON file
        writeDataToFile(plants);
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
}

injestData()