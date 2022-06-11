Surfaces.prototype.spherearbuz = (count = 40, R = 7, point = new Point(0, 0, 0), color = 'F0F0F0', animation1, animation2, animation3) => {
    let points = [];
    let edges = [];
    let polygons = [];
    const PI = Math.PI;
    let delta = 2 * PI / count;

    // Точки
    for (let i = 0; i <= PI; i += delta) {
        for (let j = 0; j < 2 * PI; j += delta) {
            const x = point.x + R * Math.sin(i) * Math.cos(j);
            const y = point.y + R * Math.sin(i) * Math.sin(j);
            const z = point.z + R * Math.cos(i);
            points.push(new Point(x, y, z));
        }
    }
    // Рёбра
    for (let i = 0; i < points.length; i++) {
        //вдоль
        if ((i + 1) < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1))
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(i, i + 1 - count));
        }
        //поперёк
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count))
        }
    }

    // Полигоны    for (let i = 0; i < points.length; i++) {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            if (i % 2 !== 1) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], '00FF00'))
            } else {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], '000000'))
            }
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], '000000'))
        }
    }
    return new Subject(
        points, edges, polygons, animation1, animation2, animation3
    );

}