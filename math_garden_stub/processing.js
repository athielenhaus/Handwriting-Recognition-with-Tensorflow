var model

async function loadModel() {
    model = await tf.loadGraphModel('TFJS/model.json');
  }

function predictImage() {
    // console.log('processing...');

    // read image from canvas
    let image = cv.imread(canvas)

    // convert image from RGB to grayscale (image variable is both input and output, i.e. updated)
    cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY, 0);

    // increase contrast - pixels within threshold will be converted to white
    cv.threshold(image, image, 175, 255, cv.THRESH_BINARY);

    // get contours
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

    // Get bounding rectangle of the first contour
    let cnt = contours.get(0)
    let rect = cv.boundingRect(cnt);

    // Crop the image using the bounding rectangle
    image = image.roi(rect);

    var height = image.rows;
    var width = image.cols;

    // Determine new dimensions based on longest edge
    var newHeight, newWidth;
    if (height > width) {
        height = 20;
        const scaleFactor = image.rows / height;
        width = Math.round(image.cols/scaleFactor)
    } else {
        width = 20;
        const scaleFactor = image.cols / width;
        height = Math.round(image.rows/scaleFactor)
    }

    // Resize the image
    cv.resize(image, image, new cv.Size(width, height), 0, 0, cv.INTER_AREA);


    // Determine padding
    const LEFT = Math.ceil(4 + (20 - width)/2);
    const RIGHT = Math.floor(4 + (20 - width)/2);
    const TOP = Math.ceil(4 + (20 - height)/2);
    const BOTTOM = Math.floor(4 + (20 - height)/2);

    // Add padding to create 28x28 image
    const finalImage = new cv.Mat();
    const black = new cv.Scalar(0, 0, 0, 0);
    cv.copyMakeBorder(image, image, TOP, BOTTOM, LEFT, RIGHT, cv.BORDER_CONSTANT, black);

    // Center of mass
    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    cnt = contours.get(0)
    let Moments = cv.moments(cnt, false);

    const cx = Moments.m10 / Moments.m00;
    const cy = Moments.m01 / Moments.m00;
    // console.log(`m00: ${Moments.m00}, cx: ${cx}, cy: ${cy}`);

    // Determine shift
    const X_SHIFT = Math.round((image.cols/2) - cx);
    const Y_SHIFT = Math.round((image.rows/2) - cy);

    // Create translation matrix
    const M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, X_SHIFT, 0, 1, Y_SHIFT]);

    // Perform the shift
    newSize = new cv.Size(image.cols, image.rows)
    cv.warpAffine(image, image, M, newSize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, black);

    // Normalize
    let pixelValues = image.data
    // console.log(`pixelValues: ${pixelValues}`);

    pixelValues = Float32Array.from(pixelValues) // convert to floats

    function normalize(num) {
        return num / 255
    }

    pixelValues = pixelValues.map(normalize)
    // console.log(`scaled: ${pixelValues}`);

    const X = tf.tensor([pixelValues])
    // console.log(`Shape of tensor: ${X.shape}`);
    // console.log(`Type of tensor: ${X.dtype}`);

    const result = model.predict(X)
    result.print()
    
    // console.log(tf.memory())

    // Testing Only
    // const outputCanvas = document.createElement('canvas')
    // cv.imshow(outputCanvas, image);
    // document.body.appendChild(outputCanvas)  // this appends output canvas to the html file

    // Cleanup
    image.delete(); contours.delete(); hierarchy.delete(); M.delete();
    X.dispose(); result.dispose();

    

}