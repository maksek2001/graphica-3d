class Surfaces { }
    Surfaces.prototype.cube = (x = 0, y = 0, z = 0, size = 7, color = '#7B68EE') => {
    return new Subject([
    new Point (x - size, y - size, z - size),
    new Point (x - size, y - size, z + size),
    new Point (x + size, y - size, z + size),
    new Point (x + size, y - size, z - size),
    new Point (x - size, y + size, z - size),
    new Point (x - size, y + size, z + size),
    new Point (x + size, y + size, z + size),
    new Point (x + size, y + size, z - size),
], [
    new Edge(0, 1), new Edge(1, 2), new Edge(2, 3), new Edge(3, 0),
    new Edge(0, 4), new Edge(4, 5), new Edge(5, 6), new Edge(6, 7),
    new Edge(7, 4), new Edge(1, 5), new Edge(2, 6), new Edge(3, 7)
], [
    new Polygon([0, 1, 2, 3], color),
    new Polygon([0, 4, 7, 3], color),
    new Polygon([0, 4, 5, 1], color),
    new Polygon([1, 2, 6, 5], color),
    new Polygon([2, 3, 7, 6], color),
    new Polygon([4, 5, 6, 7], color)
]);
}



