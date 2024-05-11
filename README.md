# Name
medium-test-javier-toussent-fis

## Description
This app is a TO-DO that loads tasks stored in the Firebase real-time database. Allows you to list, add, modify and delete tasks. It has a very simple and useful alert system.
note: Users within Cuba must turn on a VPN for the app to access Firebase.

## Screenshot
[./public/images/screenshot_2024-05-11_155721.png](https://drive.google.com/file/d/1XqURv5Fk19gQj_drGyEp8M6CqrQLt5Jh/view?usp=drive_link)

## Main Features
- Get tasks from Firebase's Realtime Database
- Add task
- Edit task
- Delete task
- Done task (soon)
- Show alerts

## Used technology
- Next.js
- React.js
- Firebase
- TypeScript
- MaterialUI

## Installation
1. [Clona este repositorio.](https://github.com/JavierTF/medium-test.git)
2. Install the dependencies `npm install`.
3. Start the application `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Test
1. npx jest

## Project's structure
note: Some files and the real jsx and tsx extensions were ignored (it has been declared .jsx for every file here)

components
├── CustomPaper.jsx
├── CustomSnackbar.jsx
├── DynamicButton.jsx
├── StringButton.jsx
├── StringTypography.jsx
lib
├── fetchTask.js
├── firebaseSingleton.js
public
├── images
│   ├── about.jpg
│   ├── screenshot_2024-05-11_155721.png
src
├── app
│   ├── page.jsx
├── contexts
│   ├── taskContext.jsx
├── interfaces
│   ├── interfaces.ts
├── pages
│   ├── color
│       ├── page.jsx
test
├── utils.test.js
utils
├── utils.js
Dockerfile

## Author
Sr. Fullstack Javier Toussent Fis