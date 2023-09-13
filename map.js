(function (name, data) {
   if (typeof onTileMapLoaded === "undefined") {
      if (typeof TileMaps === "undefined") TileMaps = {};
      TileMaps[name] = data;
   } else {
      onTileMapLoaded(name, data);
   }
   if (typeof module === "object" && module && module.exports) {
      module.exports = data;
   }
})("map", {
   compressionlevel: -1,
   height: 10,
   infinite: false,
   layers: [
      {
         data: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 5, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 5, 29, 30, 31, 32, 33, 34,
            35, 36, 37, 38, 39, 40, 41, 42, 5, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 53, 54, 55, 56, 5, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
            67, 68, 69, 70, 5, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
            83, 84, 5, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
            98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
            112, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
            124, 125, 126, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135,
            136, 137, 138, 139, 140, 137,
         ],
         height: 10,
         id: 1,
         name: "Rutelag 1",
         opacity: 1,
         type: "tilelayer",
         visible: true,
         width: 15,
         x: 0,
         y: 0,
      },
      {
         data: [
            98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98, 98, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 98, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98,
            98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98, 98, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 98, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            98, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98, 98, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98,
            98, 98, 98, 98, 98, 98,
         ],
         height: 10,
         id: 4,
         name: "FloorCollisions",
         opacity: 1,
         type: "tilelayer",
         visible: false,
         width: 15,
         x: 0,
         y: 0,
      },
   ],
   nextlayerid: 5,
   nextobjectid: 8,
   orientation: "orthogonal",
   renderorder: "right-down",
   tiledversion: "1.10.2",
   tileheight: 32,
   tilesets: [
      {
         firstgid: 1,
         source: "background.tsx",
      },
   ],
   tilewidth: 32,
   type: "map",
   version: "1.10",
   width: 15,
});
