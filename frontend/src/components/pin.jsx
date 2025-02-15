import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png", // Ensure this image exists in the public folder
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Pin = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>
        <b>{item.name}</b>
        <br />
        {item.address}
      </Popup>
    </Marker>
  );
};

export default Pin;
