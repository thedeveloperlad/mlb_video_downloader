const express = require('express');
    const axios = require('axios');
    const cheerio = require('cheerio');
    const app = express();
    const port = 3000;

    app.get('/get-meta', async (req, res) => {
        const url = req.query.url; // Get the URL from the query parameter

        if (!url) {
            return res.status(400).send('Please provide a URL in the query parameter.');
        }

        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);

            const metaTags = {};

            // Extract standard meta tags (name and content)
            $('meta[name]').each((i, element) => {
                const name = $(element).attr('name');
                const content = $(element).attr('content');
                if (name && content) {
                    metaTags[name] = content;
                }
            });

            // Extract Open Graph meta tags (property and content)
            $('meta[property^="og:"]').each((i, element) => {
                const property = $(element).attr('property');
                const content = $(element).attr('content');
                if (property && content) {
                    metaTags[property] = content;
                }
            });

            // Extract title tag
            const title = $('title').text();
            if (title) {
                metaTags.title = title;
            }

            res.json(metaTags);

        } catch (error) {
            console.error('Error fetching or parsing HTML:', error);
            res.status(500).send('Error fetching or parsing HTML.');
        }
    });

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });


import * as fs from 'fs';

const buffer = fs.readFileSync('document.html');

const $ = cheerio.loadBuffer(buffer);

console.log($('title').text());

 return (
    <div>
      <form onSubmit={checkURL}>
        <input type="text" id="myInput" style={inputStyle}  placeholder="Insert link" value={inputValue}  onChange={handleChange} />
        <Button type="submit">Create Post</Button>
      </form>
      {/*postId && <p>Created Post ID: {postId}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>*/}
    </div>
  );