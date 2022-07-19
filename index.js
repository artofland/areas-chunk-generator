const fs = require('fs');

// Read minetest config file and get `mapgen_limit` value
const config = fs.readFileSync('../minetest-server/minetest.conf', 'utf8');
const mapgenLimit = config.match(/mapgen_limit\s*=\s*(\d+)/);

if (!mapgenLimit) {
    console.error('Could not find parameter mapgen_limit in minetest.conf');
    process.exit(1);
}

// Generate chunks in a map of size `mapgen_limit` * `mapgen_limit`
const areas = [];
const min = -mapgenLimit[1];
const max = mapgenLimit[1];

for (let x = min; x < max; x += 65) {
    for (let z = min; z < max; z += 65) {
        areas.push({
            "name": `Zone-${x}-${z}`,
            "owner": "Ayrton",
            "pos1": {
                "x": x,
                "y": -256,
                "z": z
            },
            "pos2": {
                "x": x + 64,
                "y": 256,
                "z": z + 64
            }
        });
    }
}

fs.writeFileSync('../minetest-server/data/worlds/world/areas.dat', JSON.stringify(areas));
