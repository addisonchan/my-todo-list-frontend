# my-todo-list-frontend

This is the repo for the react static web part of the My Todo App. The repo for the backend is [here](https://github.com/addisonchan/my-todo-list-backend), and the spec of the API called by this frontend is [here](https://github.com/addisonchan/my-todo-list-service-pact)

## Overall Tech Design

This is the diagram of the overall tech design.

![Tech Design Diagram](https://github.com/addisonchan/my-todo-list-service-pact/raw/main/my_todo_app_tech_design.jpg)  

The source of the diagram is [here](https://github.com/addisonchan/my-todo-list-service-pact?tab=readme-ov-file#overall-tech-design).

## Prerequisites

To set up the front end app at a machine, the follow(s) must be needed first:

- Install [NodeJS](https://nodejs.org/en) (Recommended version is 18)
- Run the [Todo App Backend](https://github.com/addisonchan/my-todo-list-backend)

## Setup

Here are the steps to set up the front after the prerequsistes above are fulfilled.

**1. Install all the node modules**  
Run `npm install --force`

**2. Build the app**  
Run `npm run build`

**3. Serve the app**  
Run `npm run preview`  
Or `npm run preview --host` if we want the site exposed to other machines

**4. Access the frontend web page**  
The url of the web page is shown at the command prompt after running the above command, e.g.:  
![npm run preview screenshot](./screenshots/vite_preview.png)  

## Features and Screenshots

When you access the frontend url, you will see the web page as:  
![home with items](./screenshots/home_with_items.png)  

If you start the app from scratch or without any todo item, you will see this:  
![home without items](./screenshots/home_without_item.png)  

The red "Delete" button let you delete any todo item. You can add more todo by inputting the todo text on the top text field and click the "Add":  
![add item](./screenshots/add_todo.png)  

You can also mark "Done" or revert it to "Undone" by the Mark Done/Undone at the left:  
![mark_done](./screenshots/mark_done.png)  

If you want to edit the text of any todo item, click edit and update the text as:  
![edit item](./screenshots/edit_todo.png)  

Last, if there is any error due to calling the backend, the page will show something as:  
![home with error](./screenshots/home_error.png)  
You will then need to try to reload once the backend is up and running again.

## Development Environment

To enable frondend development can be done without being blocked by the backend implementation, a API spec is set up first. The details of the API spec can be found in [this repo](https://github.com/addisonchan/my-todo-list-service-pact)

During the frontend development, the developer can point their dev local machine to a mock API service at Swagger. However, there is a **rate limiting constraint at Swagger**. Thus, don't call the mock service repeatedly in very few seconds.

The API url for development is in [this dotenv file](./.env.development), while the production dotenv file is [another file](./.env.production).

There are some commands for development:

- Run frontend by pointing to the Swagger mock service:
`npm run dev`
- Unit Test:
`npm run test`
- Lint Check:
`npm run lint`
