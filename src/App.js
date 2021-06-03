import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "";

async function getCityTemperature(cityName) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return { temperature: data.main.temp, city: data.name };
}

const mockTemps = [
  { temperature: "20", city: "London" },
  { temperature: "30", city: "Havana" },
];

function App() {
  const [temperatureList, setTemperatureList] = useState(mockTemps);
  const [cityInput, setCityInput] = useState("");

  async function addItemToList(cityName) {
    const newItem = await getCityTemperature(cityName);
    const newList = [...temperatureList, newItem];
    setTemperatureList(newList);
  }

  return (
    <div className="App">
      <Header />
      <Input cityInput={cityInput} setCityInput={setCityInput} />
      <AddToListButton addItemToList={addItemToList} cityInput={cityInput} />
      <List list={temperatureList} />
    </div>
  );
}

function Header() {
  return <h1>Teleportation Weather App</h1>;
}

function List({ list }) {
  return list.map((item) => <ListItem listItem={item} />);
}

function ListItem({ listItem }) {
  const { temperature, city } = listItem;

  return (
    <article>
      <p>{city}:</p>
      <p>{temperature}</p>
    </article>
  );
}

function AddToListButton({ addItemToList, cityInput }) {
  return <button onClick={() => addItemToList(cityInput)}>Add To List</button>;
}

function Input({ cityInput, setCityInput }) {
  return (
    <input
      value={cityInput}
      onChange={(event) => setCityInput(event.target.value)}
    />
  );
}

export default App;
