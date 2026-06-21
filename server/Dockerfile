# base image
FROM python:3.12-slim

# working directory
WORKDIR /app

# Environment variables
ENV PYTHON_VERSION="" \
    FRONTEND_ORIGINS=""
    
# copy
COPY . /app

# run
RUN pip install --no-cache-dir -r requirements.txt

# port
EXPOSE 8000 

#cmd
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]