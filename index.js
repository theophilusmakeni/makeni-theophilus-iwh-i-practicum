require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const HUBSPOT_ACCESS_TOKEN = process.env.PRIVATE_APP_ACCESS_TOKEN;
const CUSTOM_OBJECT_TYPE = process.env.CUSTOM_OBJECT_TYPE; // e.g. 2-XXXXXXX

const headers = {
  Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

// ─── HOMEPAGE: GET all custom object records ───────────────────────────────
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`,
      {
        headers,
        params: {
          properties: 'name,publisher,price',
          limit: 100,
        },
      }
    );

    const records = response.data.results;
    res.render('homepage', {
      title: 'Video Games | Integrating With HubSpot I Practicum',
      records,
    });
  } catch (err) {
    console.error('Error fetching records:', err.response?.data || err.message);
    res.status(500).send('Error fetching records from HubSpot.');
  }
});

// ─── FORM PAGE: GET ─────────────────────────────────────────────────────────
app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
  });
});

// ─── FORM SUBMIT: POST ───────────────────────────────────────────────────────
app.post('/update-cobj', async (req, res) => {
  const { name, publisher, price } = req.body;

  try {
    await axios.post(
      `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`,
      {
        properties: {
          name,
          publisher,
          price,
        },
      },
      { headers }
    );

    res.redirect('/');
  } catch (err) {
    console.error('Error creating record:', err.response?.data || err.message);
    res.status(500).send('Error creating record in HubSpot.');
  }
});

// ─── START SERVER ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
