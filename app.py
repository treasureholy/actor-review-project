from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.f2p1v7u.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta
import requests
from bs4 import BeautifulSoup

@app.route('/')
def home():
    return render_template('index.html')
@app.route('/iframe/home')
def iframe_home():
    return render_template('iframe/home.html')
@app.route('/iframe/review')
def iframe_review():
    return render_template('iframe/review.html')
@app.route('/iframe/slide')
def iframe_slide():
    return render_template('iframe/slide.html')
@app.route("/save_review", methods=["POST"])
def save_review():
    imageUrl = request.json.get("imageUrl")
    movie = request.json.get("movie")
    comment = request.json.get("comment")
    star = request.json.get("star")
    review_data = {
        "movie": movie,
        "comment": comment,
        "star": star,
        "imageUrl": imageUrl,
    }
    # 리뷰 데이터 저장
    db.reviews.insert_one(review_data)
    return "Success"
@app.route("/get_reviews")
def get_reviews():
    # 모든 리뷰 데이터 가져오기
    review_data = list(db.reviews.find({}, {"_id": 0}))
    return jsonify(review_data)
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)