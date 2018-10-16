# React Simple Blog

## Instructions

First, clone the repo, then run `npm install` in the folder of the project.

You have the packages `react-router-dom`, `axios`, `reactstrap` and `bootstrap` installed, so you don't have to worry about adding them manually.

You should have `json-server` installed as global package (i.e. `npm i -g json-server`).

Before starting this project server, make sure to run `json-server --watch ./db.json`, then after that run `npm start`, because both of them uses port 3000, so now React will use next port (i.e 3001), but the `json-server` still uses port 3000.

## Requirements

- You should be able to do all CRUD (Create, Read, Update, Delete) operations on all resources.

- Use `Axios` or `fetch` API for the Ajax requests.

- Never use jQuery!

- Never use document.getElementById (or querySelector), or addEventListener.

- Don't use id attribute, unless there's some dependency specifies that (not applies to this project).

- You may use separate files and reuse and import them in others, for example

      // helper.js
      export class ExactClassName { ... }

      // any.js
      import { ExactClassName } from './helper';

      // OR
      // helper.js
      export default class ExactClassName { ... }

      // any.js
      import AnyNameYouChoose from './helper';


- Don't modify `public/index.html` file, only modify src/MainPage.jsx, src/dashboard/*.jsx.

- React router will do the routes, so you don't have to worry about them

- It's better to use ReactStrap components (check their [Website](https://reactstrap.github.io)).

- When you load data for the first time, you may do it inside the `componentDidMount()` (see Users CRUD component).

- The main page should has all posts with the writer (name not ID), with all comments on them, with their writer (name again).

- Choose the design you like.

- It should be responsive.

- On the main page you should be able to write new posts, and edit/delete existing ones.

- When clicking on a Category it should display only the posts with that category, otherwise will show all posts when you click All Categories.