import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import ast
from sklearn.feature_extraction.text import CountVectorizer
import nltk
from nltk.stem.porter import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity

movies = pd.read_csv('tmdb_5000_movies.csv')
credit = pd.read_csv('tmdb_5000_credits.csv')

movies = movies.merge(credit, on='title')



docs = []
for i in range(len(movies)):
  t = f"{movies.iloc[i]['id']} - {movies.iloc[i]['original_title']} - {movies.iloc[i]['genres']} - {movies.iloc[i]['overview']} - {movies.iloc[i]['vote_average']}"
  docs.append(t)

print(docs[420])
print(type(docs[420]))