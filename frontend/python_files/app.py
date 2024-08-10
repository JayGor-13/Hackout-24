from flask import Flask, request, render_template
import pickle
from PIL import Image
import numpy as np
import os
from keras.preprocessing import image
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return "No file part"
    
    f = request.files['file']
    print(f)
    
    if f.filename == '':
        return "No selected file"

    try:
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath, 'uploads', f.filename)
        f.save(file_path)

        img = image.load_img(file_path)
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)

        model = pickle.load(open("./model/model.bin", "rb"))
        preds = model.predict(x)
        predicted_class = np.argmax(preds, axis=1)[0]
        if predicted_class == 0:
            message = "The image is of a Galaxy"
        elif predicted_class == 1:
            message = "The image is of a Star"
        else:
            message = "Could not determine the category" 
        return render_template("index.html", message=message)
    
    except Exception as e:
        return f"Error processing the image: {str(e)}"

if __name__ == "__main__":
    app.run(debug=True)