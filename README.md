# Project Exam 2 - Thomas Persbråten

## Getting started

To install the project on your local computer pull the repo with github and open with github desktop.
Open the project in visual studio code.
Open the terminal and go to directory social-media "cd social-media" and run "npm i" to install all packages.

## Packages used for this project

- React v18.2.0 - npx create-react-app .
- React router v6.6.2 - npm install react-router-dom
- React hook form v7.42.1 - npm install react-hook-form
- React icons v.4.7.1 - npm install react-icons --save
- Yup form v0.32.11 - npm install yup @hookform/resolvers
- Bootstrap 5.2.3 - npm install react-bootstrap bootstrap
- Axios v1.2.2 - npm install axios
- Momentjs v2.29.4 - npm install moment --save
- Sass v1.57.1 - npm install sass

## Working with the API

### The API does not allow to sort profiles by the Count property or do query on title\profile name.

No workaround. I had in my design an element on the right side to show the most popular profiles by followers and most popular posts.
Also there is no way of searching for profiles\posts by title or name, which also eliminated one of my pages.

### The API does not let the developer know how many posts\profiles are available.

Workaround: The fetching is limited to 15 posts\profiles at a time, and there is a pagination that uses the offset API function.

### The api does not track if the user has "reacted" to a post or not, which means they can essentially keep reacting without limits.

Workaround: When reacting the post is stored into localstorage. If the post already is in localstorage, the function returns "You have reacted" else it allows for reacting.

# Pages

## Welcome

This page welcomes the user and suggest that they may login or register an account.
If the user tries to access any other routes without being logged in, they will be redirected to this page.

## Create Account

This page is for users to create an account.
The form uses yup form handling/validation and an image validator for banner and avatar inputs.
On succesfull account creation, the user is redirected to the login screen.

If the user has an account they can click the login button to go to the login page.

## Login

This form uses an email and password input with yup form handling/validation.
When login is succesfull the user is redirected to the home page, path "/".

If the user does not have an account they can click the sign up button to go to the create account page.

## Home

A list of 15 posts are displayed on the home page using the PostsCard component.
The paginations at the top and bottom allows the user to access the 15 next posts with the "offset" function in the API.
One can access the profile by clicking the profile name at the top of the post, or access the post detail by clicking on the title, body, tag, image or comment icon. You can react to any post from the home page.

## List-profiles

A list of 15 profiles are displayed on the page.
The paginations at the top and bottom allows the user to access the 15 next profiles with the "offset" function in the API.
The avatar, name and the number of posts, followers and following is showed. Clicking the avatar or name sends the user to the profile details.

## Profile detail

Avatar picture and banner is shown at the top. They can be clicked to view in a larger modal. clicking outside the modal exits the modal.
You can follow and unfollow the users.
Clicking the posts, followers or following link shows their posts,who is following this profile or who they are following.

If the profile is the users, they can change avatar or banner inside the modal.
They can also logout with the logout button on the top.

## Post detail

The post card is displayed, but the comment section is enabled to allow the users to comment or view and reply to other
comments.

If the post is the users post, They can edit or delete the post using the buttons on top.

## Create post

The create post form does not use Yup form since the only required input is the title, so if the user tries to submit the form without anything typed in the title the function returns.
The form uses imagevalidation for the post image, and the tags can be added only if the tag has atleast one length and the tag is not already used.
All tags can be removed by clicking the tags "x" button.

After the creation of the post is succesfull the user is redirected to the post detail of the post.
