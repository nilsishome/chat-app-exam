# Chat Application exam project - Nils & Magnus

## How to run the Project

# Requirements

```sh
Docker
Node.js

2 browser options (Chrome, firefox for example)
```

```sh
Database manager (heidisql example) - If you want to manage the database for the app (not required)
```

# Install dependencies

```sh
npm install
```

#.env

```
create a .env file in src directory and add following content.

POSTGRES_HOST="localhost"
POSTGRES_PORT=5432
POSTGRES_USER="myuser"
POSTGRES_PASSWORD="mypassword"
POSTGRES_NAME="mydb"

DATABASE_URL=${POSTGRES_HOST}://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_NAME}
```

# Running the application

```sh
Make sure that docker is up an running on your computer before using -
npm run dev

after the application should be running locally on your computer. 
```

# In the application

```
Create a account using the register form when entering the website

When creating 1 account on one browser and one on another they will get the id's 1 & 2 and continue in that order when creating more accounts.

Login on both browsers using the accounts you've created.

In bottom left of the application create a chat with the other account-ID from which you are using.

See how the conversation is being created and try chatting to yourself between your accounts on the 2 diffrent browsers.

When you feel done, enter the settings tab from the cogwheel icon next to your profile to delete your accounts (if you feel so). 
```
