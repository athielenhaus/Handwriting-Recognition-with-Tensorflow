![Math Jungle Screenshot](images/mj_screenshot.png)

# Math Jungle - recognizing handwritten digits on a website with Tensorflow
 
This project was created as part of a Udemy course.

__Project Objectives:__
- use Tensorflow to create a neural network model to recognize numbers from images of handwritten numbers
- apply this model on a website to recognize numbers written by the website user with a cursor.

Check out the final website [here](https://athielenhaus.github.io/Handwriting-Recognition-with-Tensorflow/)!

__Primary tools used:__
- for Model Development: Python, Tensorflow and Keras
- for Website Development and Model Deployment: Javascript, HTML, CSS, Tensorflow.js
- for Image Preprocessing: OpenCV

## Model Development:
For this project, the well-known [MNIST dataset of handwritten digits](https://en.wikipedia.org/wiki/MNIST_database) was used. The dataset includes a training set of 60,000 images and test set of 10,000 images. The data is provided in CSV format.

The steps taken included:  
- Scale images and one-hot encode target values
- Split training data into training and validation (validation set size = 10,000)
- Neural Network Setup including definition of layers, activation functions and hyperparameters
- Define batch size and train model
- Evaluate accuracy and test prediction with sample image

__Model Architecture__  
The model architecture involves the following:  
- Input layer: size 784, corresponding to the size of the images (28 x 28)
- 2 hidden dense layers with relu activation and a dropout layer (20%) in between. The first hidden layer has a size of 512 neurons and the second a size of 64. 
- Output layer: dense layer with softmax activation and a size corresponding to the number of classes (10).

The architecture is visualized in the diagram below:  
<img src="images/model.png" alt="Tensorflow Model" style="width:270px;"/>

__Model Evaluation__  
The model achieved a high accuracy on the test set, > 0.98. Therefore, no additional time was invested in further tuning the model.  
<img src="images/prediction.png" alt="Model Prediction" style="width:400px;"/>

## Website Development, Image Processing with OpenCV and Model Deployment:
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

## Next Steps
One could add a layer of complexity to the game by increasing the number of possible digits. For example, the user could be asked a math question such as "45 + 23" and would write "68" as a response. In this scenario, the image preprocessing would have to include an additional step where the contours of more than 1 object must be detected and each object would subsequently have to be wrapped, cropped, centered, padded and scaled separately. 
