# gamerank
A web app where people can share their opinions on their favorite video games

<img width="1512" alt="Screenshot 2024-04-15 at 12 39 45 PM (2)" src="https://github.com/sharonrgomez/gamerank/assets/22580495/0b3fd01a-475d-40b4-a76f-60c5e442fd56">

## Live Demo

[https://mygamerank.herokuapp.com/](https://mygamerank.herokuapp.com/)

## Features

* Authentication:
  
  * User can signup and login with username and password
  
* Authorization:

  * User cannot manage posts without being authenticated

  * User cannot edit or delete posts and comments created by other users

* Edit game posts:

  * Create, edit and delete posts and comments (if authorized)

* Flash messages responding to users' interaction with the app (if they are authenticated & if they are authorized to do certain actions)

* Responsive web design

* Utilizes RESTful Routing 

## This app was made with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap 4](https://getbootstrap.com/)
* [masonry-layout](https://masonry.desandro.com/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [momentjs](https://momentjs.com/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local/)
* [express-session](https://github.com/expressjs/session#express-session/)
* [method-override](https://github.com/expressjs/method-override#method-override/)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash/)
