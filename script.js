// 1. Inicializar el mapa
// Coordenadas iniciales (ej: Cutral Có/Plaza Huincul, Neuquén, Argentina) y nivel de zoom
// Usando la ubicación actual: Plaza Huincul
const initialCoords = [-38.93782890057557, -69.22026749578369]; // Latitud, Longitud
const initialZoom = 15;

// Creamos la instancia del mapa en el div con id="map"
const map = L.map('map').setView(initialCoords, initialZoom);

// 2. Definir las capas base (Tiles) y la capa de superposición (Overlay)

// --- Capas Base ---

// Capa de OpenStreetMap
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, // OSM tiene buen detalle hasta zoom 19
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
    maxZoom: 20, // ESRI también suele tener buen detalle
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community' // Atribución actualizada/simplificada
});

// --- Capa de Superposición (Overlay) ---

// Capa WMS de GeoServer Local (¡Recordar limitación de IP!)
const wmsLayer = L.tileLayer.wms("http://10.226.0.110:8080/geoserver/gwc/service/wms", {
    layers: 'COBERTURACCOPH:COMERCIAL', // La capa específica en tu GeoServer
    format: 'image/png',
    transparent: true, // Esencial para overlays
    maxZoom: 20,       // Ajusta si es necesario según tu capa WMS
    attribution: '<a href="https://copelco.coop">COPELCO LTDA</a>' // Atribución de tus datos
});


// 3. Añadir la capa base por defecto al mapa
// Empezamos mostrando OpenStreetMap
osmLayer.addTo(map);

// 4. Crear los objetos de capas para el control
// Objeto para las capas base (solo se puede seleccionar una a la vez - radio buttons)
const baseLayers = {
    "OpenStreetMap": osmLayer,
    "Google Satélite (Ver Advertencia)": googleSatLayer,
    "ESRI World Imagery": esriWorldImagery
};

// Objeto para las capas de superposición (se pueden activar/desactivar varias - checkboxes)
const overlayLayers = {
    "Cobertura Comercial (WMS)": wmsLayer // Tu capa WMS ahora es un overlay
};

// 5. Añadir el control de capas al mapa
// Pasamos ambos objetos al control: primero las bases, luego las superposiciones.
L.control.layers(baseLayers, overlayLayers).addTo(map);

// Opcional: Añadir una escala gráfica
L.control.scale({ imperial: false }).addTo(map); // Muestra escala métrica

// --- FIN DEL SCRIPT ---