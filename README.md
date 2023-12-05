# Project: Brew Verse (MERN App) - Bewery Review System

## Overview

BrewVerse is a full-stack MERN (MongoDB, Express.js, React, Node.js) application to search Brewery by City using Brewery APIs
(https://www.openbrewerydb.org/documentation) and add reviews.
## Functional Features

BrewVerse has following functional features:

- **User Authentication**: sign-up for new users and login for existing users.
- **Review Management**: User can add reviews (rating and description) and read reviews posted by other users, managing reviews by storing directly in mongodb
- **Brewey Display**: Brewery Details are displayed in a carousel format.
- **Responsive Design**: Enjoy a seamless user experience across various devices with a responsive and intuitive design.
- **Search and Filter**: Users can search for breweris based on by_city, by_name, and by_type
- **Quick API Integration**: Connects to external APIs, such as the OpenBreweryDB, for comprehensive brewery data.
- **Real-time Updates**: Experience real-time updates and additions to the brewery database for the latest information.

## Non-Functional Features

In addition to its functional features, BrewVerse prioritizes non-functional requirements for reliability, security, and performance:

- **Performance**: The application load breweries and reviews quickly
- **Reliability**: Ensure the system functions well and recovers gracefully from issues.
- **Usability**: The user interface is intuitive and easy to navigate
- **Scalability**: Scalability ensures the application's performance remains stable under increased load.


## Technology Stack
#### Backend
- Typescript
- Node.js
- Express.js
- MongoDB

#### Frontend
- TypeScript
- React
- Redux
- Material UI

## Screenshots

Here are some screenshots showcasing the platform:

- **Screenshot 1**: 
![Alt text](/screenshots/ss1.png?raw=true "Optional Title")
![Alt text](/screenshots/ss2.png?raw=true "Optional Title")
![Alt text](/screenshots/ss3.png?raw=true "Optional Title")
![Alt text](/screenshots/ss4.png?raw=true "Optional Title")
![Alt text](/screenshots/ss5.png?raw=true "Optional Title")
![Alt text](/screenshots/ss6.png?raw=true "Optional Title")
## Getting Started

1. Clone the Repository:

```bash
git clone https://github.com/KaurManjot0432/BrewVerse.git
cd BrewVerse
```

2. Build and Run Docker Compose:

```bash
docker-compose up --build
```
- This command will build the Docker images and start the containers defined in the docker-compose.yml file.

3. Access the Application:
- Once the Docker containers are up and running, you can access the BrewVerse application in your browser at http://localhost:3000.

4. Stop the Containers:
- To stop the containers, use the following command in the terminal:

```bash
docker-compose down
```
