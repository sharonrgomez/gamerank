/* RESTFUL ROUTES - provides mapping between HTTP methods (GET, POST, PUT, DELETE, PATCH) and CRUD (CREATE READ UPDATE DESTROY)

NAME           URL           HTTP VERB              DESC.
==========================================================================================
Index       /dogs               GET         displays a list of all dogs in db
New         /dogs/new           GET         displays form to add a new dog to db
Create      /dogs               POST        submits form, adds dog to db and redirects user
Show        /dogs/:id           GET         show info about 1 specific dog
Edit        /dogs/:id/Edit      GET         display form to edit 1 specific preexisting dog
Update      /dogs/:id           PUT         update specific dog, redirect user
Destroy     /dogs/:id           DELETE      delete a specific dog, then redirect

*/
