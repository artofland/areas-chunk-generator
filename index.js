let areas = [];
min = -400;
max = 400;

for(var x = min; x < max; x+=65)
{
    for(var z = min; z < max; z+=65)
    {
            areas.push({
                "name": `Zone-${x}-${z}`,
                "owner": "Ayrton",
                "pos1": {
                    "x": x,
                    "y": -256,
                    "z": z
                },
                "pos2": {
                    "x": x+64,
                    "y": 256,
                    "z": z+64
                }
            })
    }
}
const fs = require('fs');
fs.writeFileSync('../minetest-server/data/worlds/world/areas.dat', JSON.stringify(areas));

console.log(areas);