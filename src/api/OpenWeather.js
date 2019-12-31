export async function getWeather(latitude, longitude) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ae98796db1335a7ae7c9d6a7797f5eb3&units=metric`,
    );
    const {data, status} = {
      data: await response.json(),
      status: response.status,
    };
    if (status !== 200) {
      return false;
    }

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
