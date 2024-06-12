import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarRateIcon from "@mui/icons-material/StarRate";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

function App() {
  const [mapboxGL, setMapboxGL] = useState(null);
  const [zoom, setZoom] = useState(8);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    import("mapbox-gl").then((mapboxgl) => {
      setMapboxGL(mapboxgl);
    });
  }, []);

  if (!mapboxGL) {
    return <div>Loading map...</div>;
  }

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
        <Marker longitude={80.635} latitude={7.2936} anchor="bottom">
          <RoomIcon style={{ color: "red", fontSize: `${zoom * 4}px` }} />
          <div>Location</div>
        </Marker>
        {showPopup && (
          <Popup
            longitude={80.635}
            latitude={7.2936}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setShowPopup(false)}
          >
            <div className="flex flex-col justify-around w-64 h-64">
              <label className="p-1 mx-3 text-xs text-red-600 border-2 border-b-red-400">
                Place
              </label>
              <p className="mx-4">
                Temple of the Sacred Tooth Relic (Sri Dalada Maligawa)
              </p>
              <label className="p-1 mx-3 text-xs text-red-600 border-2 border-b-red-400">
                Review
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
                Created by <b>pasindu</b>
              </span>
              <span className="mx-4 text-xs">2 hour ago</span>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
