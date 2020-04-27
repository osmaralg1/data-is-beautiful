import numpy as np 
import json
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from datetime import datetime


def load_data(data_file, population_file, countries=None):

    with open(data_file) as f:
        data = json.load(f)
    df = pd.read_csv(population_file)
    if countries is None:
        countries = list(filter(lambda x: x["confirmed"] > 1000, data))
        countries = list(set(map(lambda x: x["country"], countries)))

    flag = 1
    dashes = '*.-;+_<>'
    dash_styles = [""]
    import random
    for country in countries:
        dash_styles.append(str(random.choice(dashes)) + str(random.choice(dashes)))

    for country in countries:
        print(country)

        country_data = list(filter(lambda x: x["country"] == country and x["confirmed"] > 20000, data))
        value = list(map(lambda x: x["deltaConfirmed"], country_data))
        date = list(map(lambda x: x["lastUpdate"], country_data))
        date_string = list(map(lambda x: datetime.fromtimestamp(x["lastUpdate"]/1000), country_data))
        date_array = np.asarray(date) / 1000
        vals, inverse, count = np.unique(date_array, return_inverse=True,
                                      return_counts=True)

        value_copy = np.zeros(len(vals))
        value_copy[:] =  0 #np.nan
        j = 0
        for j in range(0, len(value)):
            if j < len(vals):
                value_copy[inverse[j]] = value[j]

        values = np.zeros(200)
        values[:] = 0 # np.nan
        values[0:len(vals)] = value_copy

        population = df.loc[df['country'] == country]
        pop = population.iat[0, 1].replace(',', '')
        print(float(pop))
        values = values / float(pop) * 100000 #
        try:
            if flag == 1:
                flag = 0
                confirmed = np.copy(values)
            else:
                confirmed = np.vstack([confirmed, values])
        except:
            print("error")

    return confirmed, countries


