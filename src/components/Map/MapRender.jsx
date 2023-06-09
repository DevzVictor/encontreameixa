import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { stores } from "../../mocks/mocks";
import mapPin from "../../assets/icons/_MAP-PIN.svg";
import yellowPino from "../../assets/icons/yellow-pino.svg";
import whiteArrow from "../../assets/icons/white-arrow.svg";
import "./Style.css";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import MyLocation from "components/MyLocation/MyLocation";

// Função para animar o mapa até a localização(lat, lon) do endereço digitado no input
function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  const lat = selectPosition?.geometry.location.lat;
  const lng = selectPosition?.geometry.location.lng;
  useEffect(() => {
    if (selectPosition) {
      map.flyTo([lat, lng], 16, {
        animate: true,
        duration: 3,
        easeLinearity: 0.1,
        zoom: 18,
      });
    }
  }, [selectPosition]);

  return selectPosition === null ? null : (
    <Marker position={[lat, lng]}>
    </Marker>
  );
}

function MapRender({ userLocation, selectPosition }) {
  // PONTO CENTRAL DO MAPA QUANDO ACESSAR O SITE
  const [center, setCenter] = useState({
    lat: -16.7369911,
    lng: -49.22484009999999,
  });

  // ICONS PARA LOJA
  const storeIcon = new L.Icon({
    iconUrl: mapPin,
    iconSize: [40, 40],
  });

  // ICONS PARA USERS
  const userIcon = L.icon({
    iconUrl: yellowPino,
    iconSize: [40, 40],
  });
  L.Marker.prototype.options.icon = userIcon;

  const redirectGoogleMaps = (destino) => {
    window.open("https://maps.google.com/maps?q=" + destino, "_blank")
  };

  return (
    <div className="map-container">
      <MapContainer
        markerZoomAnimation={true}
        attributionControl={false}
        center={center}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyLocation position={userLocation} />
        {stores.map((store, index) => (
          <Marker
            key={index}
            position={[store.latitude, store.longitude]}
            icon={storeIcon}
          >
            <Popup className="leaflet-popup" closeButton={false}>
              <div className="leaflet-popup-content-wrapper">
                <div className="leaflet-popup-content">
                  <div className="popup-text">
                    <h3>{store.Parceiro}</h3>
                    <span>{store.CEP}</span>
                  </div>
                  <button className="popup-button" target="blank" onClick={() => {
                      redirectGoogleMaps([store.Parceiro, store.Rua, store.Bairro, store.Cidade, store.Estado])
                    }}>
                    <div className="button-text">
                      <h4>{store.Parceiro}</h4>
                      <span>{[store.Rua,", ", store.Bairro,", ", store.Cidade,", ", store.Estado]}</span>
                      <p>COMO CHEGAR</p>
                    </div>
                    <div className="button-img">
                      <img src={whiteArrow} alt="Seta" />
                    </div>
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <ResetCenterView selectPosition={selectPosition} />
      </MapContainer>
    </div>
  );
}

export default MapRender;
