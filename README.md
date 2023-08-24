# TF-Handwriting-Recognition
 
This project is the result of a tutorial from a Udemy course ("Complete 2022 Data Science & Machine Learning Bootcamp" by Appbrewery).

The objectives of this project were to:
- use Tensorflow to create a neural network model to recognize numbers from images of handwritten numbers
- apply this model on a website to recognize numbers written by the website user with a cursor.

Primary tools used:
- for Model Development: Python, Tensorflow and Keras
- for Website Development and Model Deployment: Javascript, HTML, CSS, Tensorflow.js, OpenCV

## Model Creation:


## Website Development and Model Deployment:
This part of the project involved creating an online Math game in which the user must solve simple Math problems. The user must add up the two indicated numbers and write the response on a canvas using the mouse as "chalk". 

The steps include:
- translate model to tensorflow.js and import into website
- create a UI to display the math question and provide a canvas and submit button to get user input
- use OpenCV to create an image from the user input and preprocess it in the same manner as the other images in the training dataset, i.e.
  - apply grayscale
  - increase contrast
  - determine contours, wrap them in a rectangle and crop empty areas
  - determine the center of mass of the cropped image, center the image and add padding 
  - normalize / scale
- submit image to model to generate a prediction
- add gaming logic, i.e. compare prediction with correct answer, track score and add bells and whistles in the form of plant images

## Conclusion
This project was rewarding in a number of ways:
- Tensorflow 2.0. The tutorial from the Udemy course was somewhat outdated so that it employed TF 1.x code. As I had installed the most recent TF library, I decided to translate the old code provided by the tutorial into TF 2.x code. This allowed me to compare the two and clearly see how much simpler the TF 2.x library is.
- OpenCV: while I had worked with TF and images previously, this was the first time using OpenCV and doing extensive image preprocessing prior to submitting the images to a model
- JavaScript: this was my first time writing scripts in JavaScript and using the console for debugging. I found JS surprisingly simple to navigate using my Python knowledge.
