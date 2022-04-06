Storefront - Backend Project
To use the application , here are the .env Variables that were used :
SECRET = 'thisIsNotAGoodSecret'
PORT = 3000
POSTGRES_DB = store
POSTGRES_TEST_DB = store_test
POSTGRES_PORT = 5432
POSTGRES_USER = postgres
POSTGRES_HOST = localhost
POSTGRES_PASSWORD = postgres
ENV = dev
SALT_ROUNDS = 12
PASSWORD_PEPPER = 'udacity331'
JWT_SECRET = asecretusedforjwtsignatureandverification

(1)Change these .env variables to suite your workspace.
(2)databases names that must exist are : 'store' and 'store_test'
(3)end points are provided in the REQUIREMENTS.md
(4)creating a new user (or logging in) will give back a token in HTTP HEADER
(5)save the Token in headers so the app will be able to read it
(6)token header value is "token":tokenValue (eg. key:"token" , value:"aaaaaa.aaaaa.aaaaa")
(7)data sent for user creation or login , product creation , and order creation must be in req.body as JSON;
(8)application is running on port:3000 , localhost:3000 (if the PORT variable was not changed)
(9)DATABASE port default at "5432"

scripts :
npm run build : to compile
npm run start : to compile and nodemon the js file
npm run clean : to remove the build folder
npm run test : to migrate up test database then compile then run tests then migrate back down
npm run migrate-up : to run the UP migrations on main database
npm run migrate-down: to run the DOWN migrations on main database
npm run lint : to run Eslint
npm run format : to run prettier