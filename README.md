# HubSpot Integrating With HubSpot I: Foundations Practicum

## Custom Object List View
[Video Games Custom Object List](https://app-na3.hubspot.com/contacts/343240709/objects/2-243770504/views/all/list)



## Setup

1. Clone this repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in your values:
   - `PRIVATE_APP_ACCESS_TOKEN` — from your HubSpot private app
   - `CUSTOM_OBJECT_TYPE` — your custom object type ID (e.g. `2-XXXXXXX`)
4. Run `node index.js`
5. Open [http://localhost:3000](http://localhost:3000)

## Custom Object: Video Games

Properties:
- `name` (string) — Name of the game
- `publisher` (string) — Publisher of the game
- `price` (number) — Price of the game

## Routes

| Route | Method | Description |
|---|---|---|
| `/` | GET | Homepage — displays all video game records in a table |
| `/update-cobj` | GET | Form to add a new video game record |
| `/update-cobj` | POST | Submits the form and creates a new CRM record |
