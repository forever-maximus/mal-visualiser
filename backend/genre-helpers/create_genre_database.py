# Assumptions: 
# The anime dataset used to create the genre database exists in same directory as this file.
import csv
import sqlite3

filtered_data = []
# Read data from csv file
with open('anime.csv', 'r', encoding='utf-8') as dataset:
    content = csv.reader(dataset)
    for row in content:
        filtered_data.append((row[1], row[2]))

# Remove header row - only want the actual data
filtered_data.pop(0)

# Create SQLite database and insert all values into table
conn = sqlite3.connect('../genre.db')
c = conn.cursor()
c.execute('DROP TABLE IF EXISTS genres')
c.execute('CREATE TABLE genres(name text, genre_list text)')
c.executemany('INSERT INTO genres VALUES (?,?)', filtered_data)
conn.commit()
conn.close()
