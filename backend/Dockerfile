# Use an official Python runtime as a parent image
FROM python:3.6-alpine

# Create /app and set the working directory to /app
RUN mkdir /app
WORKDIR /app

# Install any needed packages specified in requirements.txt
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app

# Make port 80 available to the world outside this container
#EXPOSE 80

# Run app.py when the container launches
#CMD ["gunicorn", "-w 3", "-b :80", "app:app"]
