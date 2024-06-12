import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarRateIcon from "@mui/icons-material/StarRate";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import axios from "axios";
//import { format } from "timego.js";

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [mapboxGL, setMapboxGL] = useState(null);
  const [zoom, setZoom] = useState(8);

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
        //console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    getPins();
  }, []);

  if (!mapboxGL) {
    return <div>Loading map...</div>;
  }

  const handleMapClick = (id) => {
    setCurrentPlaceId(id);
  };

  return (
    <div className="App">
      <Map
        mapLib={mapboxGL}
        initialViewState={{
          longitude: 80.583140512122,
          latitude: 7.491833015213317,
          zoom: zoom,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken="pk.eyJ1IjoicGFzaW5kdTEyMyIsImEiOiJjbHhhZnpzaDYyaW40MmpzNGR0NmM1azB1In0.wuRFvheBBMDqDj79dQHaHQ"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onZoom={(e) => setZoom(e.viewState.zoom)}
      >
        {pins.map((p) => (
          <React.Fragment key={p._id}>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
              <RoomIcon
                style={{
                  color: "red",
                  fontSize: `${zoom * 4}px`,
                  cursor: "pointer",
                }}
                onClick={() => handleMapClick(p._id)}
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
                    <StarRateIcon className="text-yellow-600" />
                    <StarRateIcon className="text-yellow-600" />
                    <StarRateIcon className="text-yellow-600" />
                    <StarRateIcon className="text-yellow-600" />
                    <StarRateIcon className="text-yellow-600" />
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
      </Map>
    </div>
  );
}

export default App;
