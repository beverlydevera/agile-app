# agile-app

An application developed using Vue.js, Laravel and MySQL

## Setting up for the first time
#### Prerequisites
Make sure to have the following installed on the local machine before cloning.
| Requirement | Recommended |
| ------ | ------ |
| nodejs | v.14.17.3 |
| npm | v.6.14.13 |
| php | v.8.0.10 |
| composer | v2.1.6 |

You can check the version by running the following in your terminal:
```
node -v
npm -v
php -v
```
Needed resources can be downloaded from:
https://nodejs.org/en/
https://getcomposer.org/download/

## Project setup
Clone Project Repository. In the terminal, run the following:
```
git clone https://github.com/beverlydevera/agile-app
```
Go to the cloned project directory:
```
cd agile-app
```

### BACKEND SETUP
**Step 1.** Create a database schema (in your mysql workbench or tableplus)
```
CREATE database agileapp_db;
```
**Step 2.** In your terminal, go to your backend folder
```
cd backend
```
**Step 3.** Install the needed php artisan modules using composer
```
composer install
```
**Step 4.** Run the migrations to create the agile table
```
php artisan migrate
```
**Step 5.** Run the Laravel project to host the backend API to be utilized by the frontend
```
php artisan serve
```

### FRONTEND SETUP
**Step 1.** In another terminal window, go to the frontend folder
```
cd frontend
```
**Step 2.** Run the following command to install the needed modules.
```
npm install
```
**Step 3.** Once all the modules have been downloaded and installed, create and run the localhost server by running the following command:
```
npm run serve
```
**Step 4.** After all the installations, you can go to the localhost server where the app is running.

_http://localhost:3000/_

## Testing the application
To run the tests for the frontend application, go to the frontend folder and then run the following code:
```
npm run test:unit
```
