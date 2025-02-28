const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Home Assistant API configuration
const HOME_ASSISTANT_URL = "http://homeassistant.local:8123/api/states";
const HOME_ASSISTANT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiNjVhMDRlOWQ2NDM0MjgyYTZiMmFhNDdlMGU3YmNkYiIsImlhdCI6MTc0MDc1NjcyNSwiZXhwIjoyMDU2MTE2NzI1fQ.2YThbrrY27DSjC4iWpjKGG8oCSmHF-Wx-C3uCPvVRmQ";

// API endpoint to fetch and process data from Home Assistant
app.get("/api/zones", async (req, res) => {
    try {
        const response = await axios.get(HOME_ASSISTANT_URL, {
            headers: {
                "Authorization": `Bearer ${HOME_ASSISTANT_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        const allEntities = response.data;

        // Filter entities that match "Zone_*"
        const zoneData = allEntities
            .filter(entity => entity.attributes?.friendly_name?.startsWith("Zone_"))
            .reduce((acc, entity) => {
                const zoneNumber = entity.attributes.friendly_name.replace("Zone_", "");
                acc[zoneNumber] = entity.state === "on" ? 1 : 0;
                return acc;
            }, {});

        res.json(zoneData);
    } catch (error) {
        console.error("Error fetching data from Home Assistant:", error.message);
        res.status(500).json({ error: "Failed to fetch data from Home Assistant" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
