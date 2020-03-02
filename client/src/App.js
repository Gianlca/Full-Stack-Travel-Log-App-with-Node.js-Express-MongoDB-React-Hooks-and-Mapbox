import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { listLogEntries } from "./API";
import LogEntryForm from './LogEntryForm';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

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
              height={SIZE}
              viewBox="0 0 24 24"
              style={{
                cursor: "pointer",
                fill: "#d00",
                stroke: "none",
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
              }}
              onClick={() =>
                setshowPopup({
                  [entry._id]: true
                })
              }
            >
              <path d={ICON} />
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
                {entry.image ? (
                  <img src={entry.image} alt={entry.title} />
                ) : null}
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
              height={SIZE}
              viewBox="0 0 24 24"
              style={{
                cursor: "pointer",
                fill: "#d00",
                stroke: "none",
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
              }}
            >
              <path d={ICON} />
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
