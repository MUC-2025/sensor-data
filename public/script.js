const grid = document.getElementById("grid");
let tiles = [];

// Create 3x3 grid tiles
for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    grid.appendChild(tile);
    tiles.push(tile);

    // Add press interaction
    tile.addEventListener("mousedown", () => handleTilePress(i));
    tile.addEventListener("touchstart", (event) => {
        event.preventDefault(); // Prevents ghost click
        handleTilePress(i);
    });

    tile.addEventListener("mouseup", () => handleTileRelease(i));
    tile.addEventListener("mouseleave", () => handleTileRelease(i));
    tile.addEventListener("touchend", () => handleTileRelease(i));
    tile.addEventListener("touchcancel", () => handleTileRelease(i));
}

// Correct Zone-to-Grid Mapping
const zoneToGridMap = {
    "7": 0, "8": 1, "9": 2,
    "4": 3, "5": 4, "6": 5,
    "1": 6, "2": 7, "3": 8
};

// Key Mapping
const keyMapping = {
    'q': 0, 'w': 1, 'e': 2,
    'a': 3, 's': 4, 'd': 5,
    'z': 6, 'x': 7, 'c': 8
};

let activeKeys = new Set();
let activeZones = new Set();
let activeTouches = new Set();

// Fetch Zone data and update tiles
function fetchZoneData() {
    fetch("http://localhost:3000/api/zones")
        .then(response => response.json())
        .then(data => {
            console.log("Zone data received:", data);
            activeZones.clear();
            Object.entries(data).forEach(([zone, value]) => {
                if (zoneToGridMap[zone] !== undefined && value === 1) {
                    activeZones.add(zoneToGridMap[zone]);
                }
            });
            updateTiles();
        })
        .catch(error => {
            console.error("Error fetching Zone data:", error);
        });
}

// Update tiles based on active zones, keys, and touch
function updateTiles() {
    tiles.forEach((tile, index) => {
        if (activeZones.has(index) || activeKeys.has(index) || activeTouches.has(index)) {
            tile.classList.add("yellow");
        } else {
            tile.classList.remove("yellow");
        }
    });
}

// Listen for keydown
document.addEventListener("keydown", (event) => {
    if (keyMapping[event.key] !== undefined) {
        activeKeys.add(keyMapping[event.key]);
        updateTiles();
    }
});

// Listen for keyup
document.addEventListener("keyup", (event) => {
    if (keyMapping[event.key] !== undefined) {
        activeKeys.delete(keyMapping[event.key]);
        updateTiles();
    }
});

// Handle tile press interaction
function handleTilePress(index) {
    activeTouches.add(index);
    updateTiles();
}

// Handle tile release interaction
function handleTileRelease(index) {
    activeTouches.delete(index);
    updateTiles();
}

// Fetch zone data every 0.1 second to update UI
setInterval(fetchZoneData, 100);