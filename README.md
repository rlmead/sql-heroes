# SQL Heroes Pseudocode
Project for Awesome Inc Web Development Bootcamp Week 7

## React
**model**

track in state:
* current user
* current view

**controller**

axios call to custom php api
input: db function, get/post, data/arguments
* get
    * call db select functions defined below
    * include necessary arguments
* post
    * call db update/insert(/delete?) functions defined below
    * include necessary arguments

**view**<br>
components:
* LOGIN/CREAT ACCOUNT (default)
    * input: username
    * button: log in
    * button: create account
        * input: about me
        * input: biography
* FOOTER (sticky; display on all pages except login)
    * button with profile picture: go to my profile page
    * button: go to all heroes
    * button: log out
* PROFILE PAGE (arguments: string userName; bool isCurrentUser)
    * profile picture
        * if current hero's profile: edit button
    * name
        * if current hero's profile: edit button
    * about me
        * if current hero's profile: edit button
    * biography
        * if current hero's profile: edit button
    * relationships list (with links to heroes' profiles)
        * friends: lavender background
        * enemies: yellow background
    * button(s):
        * if current hero's profile: delete account
        * else
            * lavender "friend" button (disabled if hero is already current hero's friend)
            * yellow "enemy" button (disabled if hero is already current hero's enemy)
            * gray "i don't know this person" button (disabled if relationship to current hero is undefined)
* ALL HEROES
    * one list item for each hero other than current hero, ordered alphabetically by name
        * image thumbnail, name, about-me, relationship status
* ERROR
    * apologetic message
        * detect common errors to change message wording (hero doesn't exist, etc)
    * button: return to login page

### front-end/back-end interface
* LOGIN/CREATE ACCOUNT
    * button: login
        * when clicked, run hero_exists
        * if hero exists, load profile page
    * button: create account
        * when clicked, run hero_exists
        * if hero doesn't exist, show about-me/biography/abilities input, and
            * new-hero button: when clicked, run add_hero, then load profile page
* FOOTER
    * image
        * when loaded, run get_hero_image
            * if returned data is null, load a default picture
        * when clicked, run get_profile (current hero)
    * button: see all heroes
        * when clicked, open all heroes page
    * button: log out
        * when clicked, load login page & set user state to null
* PROFILE PAGE
    * when loaded:
        * run get_profile
        * run get_hero_relationships
    * if current hero's profile page:
        * button to edit profile: run update_hero
        * button to delete profile: run delete_hero
    * else:
        * button to add friend: run hero_has_relationship
            * if false, run add_relationship
            * if true, run update_relationship
        * button to add enemy: run hero_has_relationship
            * if false, run add_relationship
            * if true, run update_relationship
        * button "i don't know this person": run delete_relationship
* ALL HEROES
    * when loaded, run get_all_heroes

### PHP/SQL Pseudocode
**db connection**

**input wrangling**
use superglobals to:
* determine which function to run
* ensure that user has the correct permissions to run the given operation

**output wrangling**
translate sql db output to json

**functions to run db queries (& arguments)**
```
hero_exists
    table: heroes
    input: hero name
    effect: return boolean (true if hero name exists in heroes table)

get_hero_image
    table: heroes
    input: hero name
    effect: return image url or null

get_hero_info
    table: heroes
    input: hero name
    effect: return hero name, about_me, biography

get_hero_relationships
    tables: heroes, relationship_types, relationships
    input: hero name
    effect: return other heroes' names & relationship types (where relationship is defined)

get_hero_abilities
    tables: heroes, abilities, ability_hero
    input: hero name
    effect: return abilities

get_profile
    subqueries: get_hero_image, get_hero_info, get_hero_relationships, get_hero_abilities
    input: hero name
    effect: return output from subqueries

add_hero
    table: heroes 
    input: hero name, about_me, biography
    effect: add new hero to heroes table

get_other_heroes
    table: heroes
    input: hero name
    effect: list of hero names that are not the given hero

get_other_heroes_info
    subqueries: get_other_heroes, get_hero_image, get_hero_info
    input: hero name
    effect: return hero info for heroes other than the given hero

update_hero
    table: heroes
    input: field, value
    effect: the given field with the given value

delete_hero
    table: heroes
    input: hero name
    effect: delete the given hero from the heroes table

hero_has_relationship
    tables: heroes, relationships
    input: hero name 1 & hero name 2
    effect: return boolean (true if hero 1 has defined relationship with hero 2 in relationships table)

add_relationship
    tables: heroes, relationships
    input: hero name 1, hero name 2, relationship type id
    result: add new relationship to the relationships table

update_relationship
    tables: heroes, relationships
    input: hero name 1, hero name 2, relationship type id
    result: update relationship in the relationships table

delete_relationship
    tables: heroes, relationships
    input: hero name 1, hero name 2
    result: delete relationship with the given hero 