import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";

// Default locations
const defaultCenter = [19.076, 72.8777]; // Mumbai
const orphanageLocation = [18.5204, 73.8567]; // Pune

function Map({ items }) {
  console.log("Map Items:", items); // Debugging: Check if items are correctly passed

  return (
    <div className="map-container">
      <MapContainer
        center={items.length ? [items[0].latitude, items[0].longitude] : defaultCenter}
        zoom={7}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Mumbai Marker */}
        <Marker position={defaultCenter}>
          <Popup>Store Location: Mumbai</Popup>
        </Marker>

        {/* Pune Marker */}
        <Marker position={orphanageLocation}>
          <Popup>Hope Orphanage, Pune</Popup>
        </Marker>

        {/* Dynamic Items */}
        {items.map((item, index) => (
          <Marker position={[item.latitude, item.longitude]} key={index}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
