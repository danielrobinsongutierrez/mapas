// 1. Inicializar el mapa
// Coordenadas iniciales (ej: centro de Argentina) y nivel de zoom
const initialCoords = [-38.93782890057557, -69.22026749578369]; // Latitud, Longitud Cutral Co
const initialZoom = 15;

// Creamos la instancia del mapa en el div con id="map"
const map = L.map('map').setView(initialCoords, initialZoom);

// 2. Definir las capas base (Tiles)

const wmsLayer= L.tileLayer.wms("http://10.226.0.110:8080/geoserver/gwc/service/wms", {
        maxZoom: 20,
	layers: 'COBERTURACCOPH:COMERCIAL',
        format: 'image/png',
        transparent: true,
	attribution: '<a href="https://copelco.coop">COPELCO LTDA</a>'
    });


// Capa de OpenStreetMap
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// --- ADVERTENCIA IMPORTANTE SOBRE GOOGLE MAPS ---
// Usar las tiles de Google Maps directamente de esta manera puede infringir
// sus Términos de Servicio (ToS). Google prefiere que uses su API de Google Maps.
// Esta capa se incluye solo con fines demostrativos y podría dejar de funcionar
// o tener restricciones. Para producción, considera usar la API oficial de Google
// o alternativas como ESRI World Imagery.
// --------------------------------------------------
const googleSatLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '&copy; Google'
});

// Alternativa Satelital recomendada (ESRI)
const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


// 3. Añadir la capa base por defecto al mapa
// Empezamos mostrando OpenStreetMap
osmLayer.addTo(map);

// 4. Crear el objeto de capas base para el control
const baseLayers = {
	"CopelcoMap": wmsLayer,
	"OpenStreetMap": osmLayer,
	"Google Satélite (Ver Advertencia)": googleSatLayer,
	"ESRI World Imagery": esriWorldImagery // Alternativa recomendada
};

// 5. Añadir el control de capas al mapa
L.control.layers(baseLayers).addTo(map);

// Opcional: Añadir una escala gráfica
L.control.scale({ imperial: false }).addTo(map); // Muestra escala métrica
