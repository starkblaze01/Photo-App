<div align="center">

# Photos-App

_To upload multiple photographs at once and view it in a grid_

</div>

---
This web app is developed using React, Firebase, and Ant-Design.

<br/>

### Features:
- UI have two capabilities - Upload images and View images.
  - Upload Images:
    - User is able to upload an image (JPEG/PNG) from their desktop via the app.
    - Upload support drag-and-drop to upload.
    - Users are able to upload multiple files simultaneously either by selecting multiple of them in the upload dialog or by dragging and dropping multiple of them onto the web app.
    - While uploads are in progress, the UI will show the progress percentage.
    - Whenever an upload fails/succeeds, the UI indicates it to the user clearly.
    - The Upload API creates two renditions of the image - one with a shorter edge of 240px and another with shorter edge of 720px while mainting the aspect ratio of the original Image.
  - View Images:
    - On page load, the UI shows the latest 30 uploaded images, with infinite scrolling (loading more as you scroll). The images are displayed in the descending order of upload time.
    - The UI lists the set of images in a grid grouped by upload date. The UI indicates clear separation between groups of images (each group have date of upload as it's own title and image count, On infinite scrolling the image count changes accordingly).
    - There's fullscreen image preview mode. When a user clicks on an image in the grid, it will open a full-screen preview of the selected image along with the image name and upload date info. The preview has left and right navigation buttons to show the previous and next image.


### List of features that are implemented without any prebuilt components:
- Image upload
- Drag-n-drop upload
- Infinite scrolling
- Image grid view
- Image full screen preview view

## For development:
- Clone the repository.
- Create a [firebase](https://console.firebase.google.com/u/0/) acount and create a new project.
- In the firebase console go to the settings of the newly created project and set the following SDK parameter in [`firebase.js`](https://github.com/starkblaze01/Photo-App/blob/main/client/src/utils/firebase.js) file:
  - `apiKey`: `YOUR_API_KEY`,
  - `authDomain`: `YOUR_AUTH_DOMAIN` ,
  - `databaseURL`: `YOUR_DATABASE_URL`,
  - `projectId`: `YOUR_PROJECT_ID`,
  - `storageBucket`: `YOUR_STORAGE_BUCKET`,
  - `messagingSenderId`: `YOUR_MESSAGING_SERVER_ID`,
  - `appId`: `YOUR_API_ID`,
  - `measurementId`: `YOUR_MEASUREMENT_ID`
- Inside the client folder run command `npm start` to start the project.


#### Note:
This project is made to show how to implement a few features without using any prebuilt components. There's no delete option for an image. Not much of the task but it's easier for me to delete all image at once from Firebase console or maybe I was too lazy to implement one this time(still trying to figure out this part :p).

Check out more awesome projects [here](https://github.com/starkblaze01?tab=repositories).
