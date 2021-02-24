# Exo back
NodeJS REST API to text justify

# Installation
- Install node packages `npm install` or `yarn install`
- `cp .env.example .env`
- Set the PORT and TOKEN_SECRET
- To generate TOKEN_SECRET use node and type `require('crypto').randomBytes(48).toString('hex')`
- Start tests `yarn test`
- Launch the project `yarn start`

# Deploy on Heroku
- Login with heroku `heroku login`
- `git commit -am "deploy"`
- `git push heroku master`

## Routes
- /api/token
- /api/justify

## Word Justify Limitation
The API is using sqlite for storing the token of the user and know when he exceeds word limit of 80 000 words.
Each 24 hours he will have his word counter reset to zero
