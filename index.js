const { readFileSync, writeFileSync } = require('fs');

const CHUNK_LENGTH = 64;
const CHUNK_HEIGHT = 256; // Index of the highest block

// Read minetest config file and get `mapgen_limit` value
let config;

try {
    config = readFileSync('../minetest-server/minetest.conf', 'utf8');
}
catch (e) {
    console.error('Error: Could not read config file:', e.message);
    process.exit(1);
}

const mapgenLimit = config.match(/mapgen_limit\s*=\s*(\d+)/)?.[1];

if (!mapgenLimit) {
    console.error('Error: could not find parameter mapgen_limit in minetest.conf');
    process.exit(1);
}

if (mapgenLimit % CHUNK_LENGTH !== 0) {
    console.error(`Error: mapgen_limit (${mapgenLimit}) is not a multiple of ${CHUNK_LENGTH}`);
    process.exit(1);
}

// Generate chunks of `CHUNK_LENGTH` * `CHUNK_LENGTH` * (`CHUNK_HEIGHT` * 2 + 1) blocks
// in a map of size `mapgen_limit` * `mapgen_limit`
const areas = [];
const min = -mapgenLimit;
const max = mapgenLimit;

for (let x = min; x < max; x += CHUNK_LENGTH) {
    for (let z = min; z < max; z += CHUNK_LENGTH) {
        areas.push({
            'name': `Zone-${x}-${z}`,
            'owner': 'Ayrton',
            'pos1': {
                'x': x,
                'y': -CHUNK_HEIGHT,
                'z': z
            },
            'pos2': {
                'x': x + CHUNK_LENGTH - 1,
                'y': CHUNK_HEIGHT,
                'z': z + CHUNK_LENGTH - 1
            }
        });
    }
}

try {
    writeFileSync('../minetest-server/data/worlds/world/areas.dat', JSON.stringify(areas));
}
catch (e) {
    console.error('Error: Could not write file:', e.message);
    process.exit(1);
}

console.log(`Generated ${areas.length} areas of size ${CHUNK_LENGTH} x ${CHUNK_LENGTH} in a ${mapgenLimit} x ${mapgenLimit} map.`);