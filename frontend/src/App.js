import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarRateIcon from "@mui/icons-material/StarRate";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import axios from "axios";
//import { format } from "timego.js";

function App() {
  const currentUser = "Pasindu";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [mapboxGL, setMapboxGL] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 7.491833015213317,
    longitude: 80.583140512122,
    zoom: 6,
  });

  useEffect(() => {
    import("mapbox-gl").then((mapboxgl) => {
      setMapboxGL(mapboxgl);
    });
  }, []);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/pins");
        setPins(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    getPins();
  }, []);

  if (!mapboxGL) {
    return <div>Loading map...</div>;
  }

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: long,
    }));
  };

  const handleAddClick = (e) => {
    const { lat, lng } = e.lngLat;
    setNewPlace({
      lat,
      long: lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axios.post("http://localhost:5000/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <Map
        mapLib={mapboxGL}
        {...viewport}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken="pk.eyJ1IjoicGFzaW5kdTEyMyIsImEiOiJjbHhhZnpzaDYyaW40MmpzNGR0NmM1azB1In0.wuRFvheBBMDqDj79dQHaHQ"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={(evt) => setViewport(evt.viewState)}
        onDblClick={handleAddClick}
        transitionDuration="200"
      >
        {pins.map((p) => (
          <React.Fragment key={p._id}>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
              <RoomIcon
                style={{
                  color: p.username === currentUser ? "tomato" : "blue",
                  fontSize: viewport.zoom * 7,
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
              <div>Location</div>
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="flex flex-col justify-around w-64 h-64">
                  <label className="p-1 mx-3 text-xs text-red-600 border-2 border-b-red-400">
                    {p.title}
                  </label>
                  <p className="mx-4">{p.title}</p>
                  <label className="p-1 mx-3 text-xs text-red-600 border-2 border-b-red-400">
                    {p.desc}
                  </label>
                  <p className="mx-4 text-sm">Beautiful place. I like it.</p>
                  <label className="p-1 mx-3 text-xs text-red-600 border-2 border-b-red-400">
                    Rating
                  </label>
                  <div className="mx-4">
                    {Array(p.rating)
                      .fill()
                      .map((_, index) => (
                        <StarRateIcon key={index} className="text-yellow-600" />
                      ))}
                  </div>
                  <label className="p-1 mx-3 text-xs text-red-600 border-2 border-b-red-400">
                    Information
                  </label>
                  <span className="mx-4 text-xs">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="mx-4 text-xs">2 hour ago</span>
                </div>
              </Popup>
            )}
          </React.Fragment>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div className="flex flex-col justify-around p-4 w-64 bg-white rounded-md shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a title"
                    className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold text-gray-700">
                    Review
                  </label>
                  <textarea
                    placeholder="Say something about this place"
                    className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-semibold text-gray-700">
                    Rating
                  </label>
                  <select
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
