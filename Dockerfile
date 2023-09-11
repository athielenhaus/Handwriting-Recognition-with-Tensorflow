# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /TensorFlowWebApp

# Copy the current directory contents into the container at /app
COPY . /TensorFlowWebApp

# Install required packages
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Run your application
CMD ["python", "your_app.py"]
