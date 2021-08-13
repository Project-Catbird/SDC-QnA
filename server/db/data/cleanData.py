import pandas as pd
import csv

def clean(file):
  df = pd.read_csv(f'{file}.csv')
  df['date_written'] = pd.to_datetime(df['date_written'], unit='ms')
  df.to_csv(f'{file}_cleaned.csv', index = False, quotechar='"', quoting=csv.QUOTE_NONNUMERIC)

clean('questions')
clean('answers')