RESTFUL ROUTES

name      url           action      description
=======================================================================
INDEX     /games        GET         displays a list of all games
NEW       /games/new    GET         displays form to create new game
CREATE    /games        POST        takes data from form and adds to db
SHOW      /games/:id    GET         shows info about one game
