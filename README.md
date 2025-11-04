
# Deal_estate
DealEstate is a full-stack application designed to display real estate sale offers focused on authentication and authorization.
It consists of a React + Redux frontend and a NestJS backend connected to a MySQL database through TypeORM. User authentication and authorization are implemented with JWT, and the database is containerized using Docker.


## Tech Stack
🖥️ Frontend

React (TypeScript)
Redux Toolkit & RTK Query
React Router
Axios
CSS

⚙️ Backend
NestJS (TypeScript)
TypeORM
JWT Authentication
Validation Pipes & Guards
RESTful API

🗄️ Database
MySQL (in Docker container)


## Project Structure
`/client`         → React + Redux frontend

`/server`         → NestJS backend (TypeORM + JWT)



# Installation
1. Clone the repository
```
git clone https://github.com/gumanitar/deal_estate.git .

```

2. Install dependencies and set up environment variables

🖥️`Frontend`
```
cd client
npm install
cp .env.example .env
```
⚙️`Backend`
```
cd ../server
npm install
cp .env.example .env
```

3. Start the database container


```
docker compose up -d
```
💡 **Note:** Make sure you are in the **server** folder before running this command.

4. Run the application
⚙️`Backend`
```
npm run start:dev
```

🖥️`Frontend`
```
cd ../client
npm run dev
```

Then open the app in your browser:
👉 http://localhost:5173