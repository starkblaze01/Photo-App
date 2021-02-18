<div align="center">

# Photos-App

_To upload multiple photographs at once and view it in a grid_

</div>

---

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
    - The UI lists the set of images in a grid grouped by upload date. The UI indicates clear separation between groups of images (each group should probably have its own title and maybe image count).
    - There's fullscreen image preview mode. When a user clicks on an image in the grid, it will open a full-screen preview of the selected image along with the image name and upload date info. The preview has left and right navigation buttons to show the previous and next image.


### List of features that are implemented without any prebuilt components:
- Image upload
- Drag-n-drop upload
- Infinite scrolling
- Image grid view
- Image full screen preview view

## For development:
