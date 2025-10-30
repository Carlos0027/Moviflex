import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Mapa() {
  const position = [4.711, -74.072]; // Bogotá

  return (
    <div className="mapa-container" style={{ height: "400px", width: "100%" }}>
      <MapContainer center={position} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>📍 Ejemplo de viaje disponible en Bogotá</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
