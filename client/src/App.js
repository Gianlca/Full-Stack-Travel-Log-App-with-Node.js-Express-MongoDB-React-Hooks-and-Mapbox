import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { listLogEntries } from "./API";
import LogEntryForm from './LogEntryForm';
const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setshowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 8.3405,
    longitude: 115.092,
    zoom: 3
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);    
  }

  useEffect(() => {
    getEntries()
  }, []);

  const showAddMarkerPopup = event => {
    const [longitude, latitude] = event.lngLat;  
    setAddEntryLocation ({
      longitude,
      latitude
    })
  }
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/gianluca12/ck6tk0puu1d2t1ip1ncwb33rb"
      mapboxApiAccessToken="pk.eyJ1IjoiZ2lhbmx1Y2ExMiIsImEiOiJjazZ0amE0Y3kwMjUzM21wdWxjMW5heHRlIn0.kmWgPcSp-ja52XNLRSAcDQ"
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map(entry => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${6 * viewport.zoom}px`}
              height={`${6 * viewport.zoom}px`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f8c102"
              onClick={() =>
                setshowPopup({
                  [entry._id]: true
                })
              }
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              id={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setshowPopup({})}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited on: {new Date(entry.visitAtDate).toLocaleString()}
                </small>
                {entry.image ? <img src={entry.image} alt={entry.title}/> : null}
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${6 * viewport.zoom}px`}
              height={`${6 * viewport.zoom}px`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f8c102"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
