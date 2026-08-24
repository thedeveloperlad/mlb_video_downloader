import express from "express";
import cors from "cors";
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import bodyParser from 'body-parser';
// import path from 'path';

const require = createRequire(import.meta.url);
const __dirname = fileURLToPath(import.meta.url);
// import records from "./routes/record.js";

const cheerio = require('cheerio');
const axios = require('axios');

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// app.use("/record", records);

//vars


// Example Express route
app.post('/api/submit-form', (req, res) => {
    const { name, email } = req.body; // Access the data from req.body

    // Process the data (e.g., save to database)
    console.log('Received form data:', { name, email });

      // Send a response back to the client
    res.json({ message: 'Form submitted successfully!', data: { name, email } });
});

app.get('/api/hello', (req, res) => {
    // res.json({ message: 'Hello from Express!' });
    res.json({ message: 'Hello from Express!' });
});

function isHTML(str) {
  var a = document.createElement('div');
  a.innerHTML = str;

  for (var c = a.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true; 
  }

  return false;
}

function validateQueryParameters(url)
{
  if (!url) {
      return res.status(400).send('Please provide a URL in the query parameters.');
  }
}

async function getMetadataParameters(url)
{
    var videoInformation = new Object();

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Now you can use Cheerio to extract data
        // For example, to get the title of the page:
        const pageTitle = $('title').text();
        console.log('Page Title:', pageTitle);

        // Or to find all links:
        /*$('a').each((index, element) => {
            
            const linkHref = $(element).attr('href');
            const linkText = $(element).text();
            console.log(`Link ${index + 1}: ${linkText} - ${linkHref}`);
        });*/

        // You can also extract data from specific elements based on their class or ID
        // const specificElementText = $('.some-class').text();
        const ogvideoTitle = $('meta[property="og:title"]').attr('content');
        console.log('OG video title:', ogvideoTitle);

        const ogvideoMp4Source = $('meta[property="og:video"]').attr('content');
        console.log('OG video source:', ogvideoMp4Source);

        videoInformation.name = ogvideoTitle;
        videoInformation.source  = ogvideoMp4Source;

        // videoInformation = [{name: ogvideoTitle, source: ogvideoMp4Source}];

        //videoData.json({name: ogvideoTitle, source: ogvideoMp4Source});

        /* const ogTitle = $('meta[property="og:title"]').attr('content');
        console.log('OG Title:', ogTitle); */

    } catch (error) {
        console.error('Error scraping URL:', error);
    }

    console.log("getMetadataParameters.videoInformation= " + videoInformation);
    // var jsonString = JSON.stringify(videoInformation);
    return videoInformation;
}

/* <meta property="og:video" content="https://mlb-cuts-diamond.mlb.com/FORGE/2025/2025-10/25/bd928d98-f63b1acd-368c3d6a-csvm-diamondgcp-asset_1280x720_59_4000K.mp4">*/
app.post('/api/checkURLvideo', async (request, response) => {

    const receivedData = request.body; // Access the data sent from the client
    console.log('HTML request-Received data:', receivedData.name);
    // Process the received data (e.g., save to a database, perform calculations)
    /*const processedData = {
        originalData: await getMetadataParameters(receivedData.name)
    }*/

    const originalData = await getMetadataParameters(receivedData.name)

    // console.log("post.data= " + videoData);
    console.log("originalData=====originalData====originalData")
    console.log(originalData)
    response.json(originalData);
    //response.status(201).json({ message: 'Form submitted successfully!', data: originalData });
    //response.status(201).json({ message: 'Form submitted successfully!', data: processedData });
    // Send a response back to the client
    //response.status(201).json({ message: 'Data received successfully!', data: receivedData });
});

app.get('/api/datatest', (req, res) => {
        // res.json({ message: 'Hello from Express!' });
    //console.log(response);
    //res.json({ message: 'Messi' });
    /*const data = "hello";
    const data2 =  "world";

    res.json({test: {data, data2}});*/

});

// start the Express server
// Example: http://localhost:5050/api/hello
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});