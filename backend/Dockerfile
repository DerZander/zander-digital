FROM python:3.11-slim

WORKDIR /backend

ENV PYTHONPATH=/backend

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]
