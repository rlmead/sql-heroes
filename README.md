# SQL Heroes
Project for Awesome Inc Web Development Bootcamp Week 7

## React Pseudocode
**model**

track in state:
* current user
* current view

**controller**

axios call to custom php api
* get
    * see php db select functions below
* post
    * see php db insert/update functions below

...does there need to be a different function defined in react corresponding to each different query? or can a single react function take inputs to send php the name of the query it wants to run, and any arguments it needs?

**view**

* component: login/create account (default)
    * input: username
    * button: log in
    * button: create account
        * input: about me
        * input: biography
* footer (sticky; display on all pages except login)
    * button: go to my profile page
    * button: go to user list
    * button: log out
* profile page (arguments: string userName; bool isCurrentUser)
    * profile picture
        * if current user's profile: edit button
    * name
        * if current user's profile: edit button
    * about me
        * if current user's profile: edit button
    * biography
        * if current user's profile: edit button
    * relationships list (with links to user's profiles)
        * friends: lavender outline
        * enemies: yellow background
    * button(s):
        * if current user's profile: delete account
        * else
            * lavender "friend" button (disabled if user is already current user's friend)
            * yellow "enemy" button (disabled if user is already current user's enemy)
            * gray "i don't know this person" button (disabled if relationship to current user is currently undefined)
* user list
    * one list item for each user other than current user, ordered alphabetically by name
        * image thumbnail, name, about-me, relationship status
* error
    * apologetic message
        * detect common errors to change message wording (user doesn't exist, etc)
    * button: return to login page

### PHP/SQL Pseudocode
**db connection**

**data wrangling**
* function(s) to translate sql output to json

**functions to run db queries (& arguments)**

<!-- rework to account for all tables affected -->

* select
    * get profile (name)
        * 
    * get hero: name, image, about-me 
* insert
    * add user (name, about me, biography, abilities)
* update
    * change user image (url)
    * change user name (name)
    * change user about-me (text)
    * change user biography (text) 
* delete
    * remove user (name)
        * remove all relationships with this hero

* select
    * get relationship type (currentUser, *)
* insert
    * add new relationship (user1, user2, type)
* update
    * change relationship type (user1, user2)
* delete
    * remove relationship (user1, user2)
