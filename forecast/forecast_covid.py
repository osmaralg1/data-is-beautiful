import numpy as np

from data_loading.data_loading import load_data
from data_loading.forecasting_with_machine_learning import *
import tensorflow as tf

data_file = '../src/variables/assets/data.json'
population_file = 'population.csv'
country_data, country = load_data(data_file, population_file)

#country_data = country_data[np.isfinite(country_data)]
country_data = country_data.flatten()
split_time = int(len(country_data) * 0.8)
time = np.asarray(list(range(0, len(country_data))))
series = country_data.astype(int)
time_train = time[:split_time]
x_train = series[:split_time]
time_valid = time[split_time:]
x_valid = series[split_time:]

print(len(x_train), len(x_valid))

"""### Linear Model"""

keras.backend.clear_session()
tf.random.set_seed(42)
np.random.seed(42)

window_size = 7
train_set = window_dataset(x_train, window_size)
valid_set = window_dataset(x_valid, window_size)

model = keras.models.Sequential([
    keras.layers.Dense(2, activation="relu", input_shape=[window_size]),
    keras.layers.Dense(2, activation="relu"),
    keras.layers.Dense(1)
])

optimizer = keras.optimizers.SGD(lr=1e-5, momentum=0.9)
model.compile(loss=keras.losses.Huber(),
              optimizer=optimizer,
              metrics=["mae"])

early_stopping = keras.callbacks.EarlyStopping(patience=10)
model.fit(train_set, epochs=10, validation_data=valid_set, callbacks=[early_stopping])

lin_forecast = model_forecast(model, series[split_time - window_size - 1:-2], window_size)[:, 0]

lin_forecast.shape

plt.figure(figsize=(10, 6))
plot_series(time_train, x_train)
plot_series(time_valid, x_valid)
plot_series(time_valid, lin_forecast)

print("error: " , keras.metrics.mean_absolute_error(x_valid, lin_forecast).numpy())
plt.show()
print("finished")