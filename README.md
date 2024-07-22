remember to cd to 
```
cd client/
```
when you want to run react server

[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15369267)
# DBS Practical

## Setup

1. Clone this repository

2. Create a .env file with the following content

    ```
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_DATABASE=
    DB_CONNECTION_LIMIT=1
    PORT=3000
    
    JWT_SECRET_KEY=your-secret-key
    JWT_EXPIRES_IN=1d
    JWT_ALGORITHM=HS256
    ```

3. Update the .env content with your database credentials accordingly.

4. Install dependencies by running `npm install`

5. Start the app by running `npm start`. Alternatively to use hot reload, start the app by running `npm run dev`.

6. You should see `App listening on port 3000`

8. (Optional) install the plugins recommended in `.vscode/extensions.json`

## Instructions

Open the page, `http://localhost:3000`, replace the port number accordingly if you app is not listening to port 3000

