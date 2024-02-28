# 🥧 phaser-isometric-engine
![image](https://github.com/FelipeIzolan/phaser-isometric-engine/assets/80170121/39ff340d-14e1-4523-a55f-d64be22134b2)

## 🚀 Getting Started

```
git clone https://github.com/FelipeIzolan/phaser-isometric-engine.git
cd phaser-isometric-engine
npm i && npm start
```
- Configure the canvas in **main.ts**.
- Configure the static's field inside grid in **grid.ts** .
- Add **tiles** and **objects** sprites in **public/tiles** and **public/objects**.
- Load and create **tiles** and **objects** in **game.ts**.

## 📄 Documentation

**Grid**
```typescript
tile_id: number //<- Tile id counter.
object_id: number //<- Object id counter.

anims: Set<string> //<- Set of sprites that has animation.
offsets: Map<string, number> //<- Y-offset Map of objects-sprite.

loadTile(src: string, fw?: number, fh?: number) //<- Load the entire sprite or a frame of the sprite. (Tile)
loadObject(src: string, fw?: number, fh?: number) //<- Load the entire sprite or a frame of the sprite. (Object)

create() //<- Create the tiles on the grid.
createTileAnim(id: number, framerate?: number, repeat?: number, repeat_delay?: number) //<- Create an animation. (Tile)
createObjectAnim(id: number, framerate?: number, repeat?: number, repeat_delay?: number) //<- Create an animation. (Object)

getTile(x: number, y: number) //<- Get tile by x and y.
getTileByCartPos(x: number, y: number): Tile | null //<- Get tile by cartesian position.
getTileByIsoPos(x: number, y: number): Tile | null //<- Get tile by isometric position.

// Look engine/types.ts
setTile(x: number, y: number, tile: OptionalTileSetter) //<- Set tile.
setGrid(tiles: OptionalTileSetter[][]) //<- Set grid.
```

**Tile**
```typescript
x: number //<- Grid tile x.
y: number //<- Grid tile y.
z: number //<- Grid tile z.
object: number | null //<- Grid tile object.

worldX: number //<- Tile world position x.
worldY: number //<- Tile world position y.
depth: number //<- Tile depth.

setTile(id: number) //<- Set tile by id.
setObject(id: number) //<- Set object by id.
set(setter: OptionalTileSetter) //<- Set (or not) a tile and object.
```

## 📜 License

- [phaser-isometric-engine](https://github.com/FelipeIzolan/phaser-isometric-engine) - MIT
- [phaser](https://github.com/phaserjs/phaser) - MIT
- [vite](https://github.com/vitejs/vite) - MIT
- [tiny-blocks](https://dani-maccari.itch.io/tiny-blocks-isometric-pixel-assets)
