mapboxgl.accessToken = 'pk.eyJ1IjoiZWRhbWJsZSIsImEiOiJjazUzbHUzNXkwOXp2M2ZtY3gwbGh3NjV5In0.GFNZuuMJ93_eY9kJPIlB1w';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    center: [40,45], 
    zoom: 3,
});

// function rotateCamera(timestamp) {
//     map.rotateTo((timestamp/1000) % 360, {duration: 0});
//     requestAnimationFrame(rotateCamera);
// }

map.on("load", () => {
    //rotateCamera(0);
    map.addLayer({
        id: "all",
        type:"fill",
        paint: {
            "fill-color" : "rgba(180, 80, 80, 0.0)"
        },
        source: {
            type: "geojson",
            data: "land.geojson"
        }
    });

})

map.on("click", "all", (e) => {
    alert("Land: " + e.features[0].properties.ADMIN 
    + ", Gjennomsnittstemperatur: " 
    + e.features[0].properties.AT 
    + ", Økning gjennomsnittstemperatur i 2050 med fortsatt høyt utslipp: " 
    + e.features[0].properties.AT_50)
    //rotateCamera(0)
})

map.addControl(new mapboxgl.NavigationControl());

const inpNavn = document.querySelector("#inpNavn");
const inpMelding = document.querySelector("#inpMelding");
const btn = document.querySelector("#btn");
const divMeldinger = document.querySelector("#divMeldinger");

const db = firebase.firestore();
const chat = db.collection("chat");


chat.onSnapshot(snap => {
    for(const melding of snap.docChanges()) {
        if(melding.type === "added") {
            divMeldinger.innerHTML += `
            <div>${melding.doc.data().fra} : </div>
            <div>${melding.doc.data().tekst}</div>
            `;
        }
    }
})

btn.onclick = () => {
    chat.add({
        fra: inpNavn.value,
        tekst: inpMelding.value
    })
}


