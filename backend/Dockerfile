# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app/src

# Copy app
COPY ./src /app/src

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5001

# Run Flask
ENV FLASK_APP=app
ENV FLASK_ENV=development
ENV PYTHONPATH=/app/src
CMD ["bash", "-c", "flask run --host=0.0.0.0 --port=5001 --reload"]
