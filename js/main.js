window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.onload = function () {

    const WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
        P1: new Point(-10, 10, -30), // левый верхний угол
        P2: new Point(-10, -10, -30), // левый нижний угол
        P3: new Point(10, -10, -30), // правый нижний угол
        CENTER: new Point(0, 0, -30), // центр окошка
        CAMERA: new Point(0, 0, -50) // точка, из которой мы смотрим
    };
    const sur = new Surfaces();
    const ZOOM_OUT = 1.1;
    const ZOOM_IN = 0.9;
    const canvas = new Canvas({ width: 610, height: 610, WINDOW, callbacks: { wheel, mouseup, mouseleave, mousedown, mousemove, move } });
    const graph3D = new Graph3D({ WINDOW });
    const ui = new UI({
        callbacks: {
            //движение
            move,
            //составляющие фигуры
            printPoints,
            printEdges,
            printPolygons,
            printNumbers,
            //фон
            printStars,
            randomColor,
            printLight,
            printLines,
            printShadows,
            //Фигуры
            printSphere,
            printEllipsoid,
            printHyperbolicparaboloid,
            printHyperboliccylinder,
            printParaboliccylinder,
            printEllipticcylinder,
            printEllipticparaboloid,
            printCone,
            printBublick,
            printSinglecavityhyperboloid,
            printDoublecavityhyperboloid
        }
    });
    const MATH = new Math3D;
    let scene = [

        /*
        sur.spherearbuz(
            40, 5, new Point(0, 0, 0))
        //sur.spiral()  
        */

        /*sur.donut(
            40,
            5,
            new Point(0, 0, 0),
            '#FF4500'),
        */

        //sur.cube()
        //солнце
        /*
sur.sphere(
    40,
    12,
    new Point(0, 0, 0),
    '#FFFF00',
    { rotateOz: new Point(0, 0, 0) },
),

//меркрурий
sur.sphere(
    40,
    6,
    new Point(0, 0, -25),
    '#F0F0F0', { rotateOz: new Point(0, 0, -25) },
    //{ rotateOx: new Point(0, 0, 0) }, { rotateOy: new Point(0, 0, -25) }
),

//венера
sur.sphere(
    40,
    8,
    new Point(0, 0, -35),
    '#ff0000', { rotateOx: new Point(0, 0, 0) },
    // { rotateOx: new Point(0, 0, 0) }, { rotateOy: new Point(0, 0, -35) }
),
//земля
sur.sphere(
    40,
    3,
    new Point(0, 0, -45),
    '#1E90FF',
    { rotateOz: new Point(0, 0, -45) },
    { rotateOx: new Point(0, 0, 0) }
),
//луна
sur.sphere(
    40,
    1,
    new Point(8, 0, -48),
    '#eeeeee',
    { rotateOz: new Point(0, 0, -48) },
    { rotateOx: new Point(0, 0, 0) }
),
//марс
sur.sphere(
    40,
    2,
    new Point(0, 0, -55),
    '#FFDAB9',
    { rotateOz: new Point(0, 0, -55) },
    { rotateOx: new Point(0, 0, 0) }
),
//юпитер
sur.sphere(
    40,
    5,
    new Point(0, 0, -65),
    '#F0E68C',
    { rotateOz: new Point(0, 0, -65) },
    { rotateOx: new Point(0, 0, 0) }
),
//сатурн
sur.sphere(
    40,
    4.5,
    new Point(0, 0, -85),
    '#FFFACD',
    { rotateOz: new Point(0, 0, -85) },
    { rotateOx: new Point(0, 0, 0) }
),
//пояс сатурна
sur.bublick(
    40,
    6,
    new Point(0, 0, -85),
    '##8B4513',
    { rotateOz: new Point(0, 0, -85) },
    { rotateOx: new Point(0, 0, 0) }
),
//уран
sur.sphere(
    40,
    3.5,
    new Point(0, 0, -95),
    '#87CEEB',
    { rotateOz: new Point(0, 0, -95) },
    { rotateOx: new Point(0, 0, 0) }
),
//нептун
sur.sphere(
    40,
    3.5,
    new Point(0, 0, -105),
    '#4169E1',
    { rotateOz: new Point(0, 0, -105) },
    { rotateOx: new Point(0, 0, 0) }
)
sur.cone()
*/
    ];
    const LIGHT = [new Light(-10, 50, -50, 3000),
        //new Light(0, 0, 0, 200)
    ]; //источник света

    let canRotate = false;
    let canPrint = {
        //Составляющие фигуры
        points: false,
        edges: false,
        polygons: false,
        numbers: false,
        //Фон
        stars: false,
        color: false,
        light: false,
        lines: false,
        shadows: false,
        //Фигуры
        sphere: false,
        ellipsoid: false,
        hyperbolicparaboloid: false,
        hyperboliccylinder: false,
        paraboliccylinder: false,
        ellipticcylinder: false,
        ellipticparaboloid: false,
        cone: false,
        bublick: false,
        singlecavityhyperboloid: false,
        doublecavityhyperboloid: false
    }

    function wheel(event) {
        const delta = (event.wheelDelta > 0) ? ZOOM_IN : ZOOM_OUT;
        graph3D.zoomMatrix(delta);
        scene.forEach(subject => {
            subject.points.forEach(point => graph3D.transform(point));
            if (subject.animation1) {
                for (let key in subject.animation1) {
                    graph3D.transform(subject.animation1[key]);
                    if (subject.animation2) {
                        for (let key in subject.animation2) {
                            graph3D.transform(subject.animation2[key])
                        }
                    }
                }
            }
        });
    }

    function mouseup() {
        canRotate = false;
    }

    function mouseleave() {
        mouseup();
    }

    function mousedown() {
        canRotate = true;
    }

    function move(direction) {
        if (direction === 'up' || direction === 'down') {
            const delta = (direction === 'up') ? -0.1 : 0.1;
            graph3D.moveMatrix(delta, 0, 0);

        }
        if (direction === 'left' || direction === 'right') {
            const delta = (direction === 'right') ? -0.1 : 0.1;
            graph3D.moveMatrix(0, delta, 0);
        }
        graph3D.transform(WINDOW.CAMERA);
        graph3D.transform(WINDOW.CENTER);
        graph3D.transform(WINDOW.P1);
        graph3D.transform(WINDOW.P2);
        graph3D.transform(WINDOW.P3);
    }

    function mousemove(event) {
        if (canRotate) {
            if (event.movementX) { // крутить вокруг OY
                const alpha = -canvas.sx(event.movementX) / 10;
                graph3D.rotateOxMatrix(alpha);
                graph3D.transform(WINDOW.CAMERA);
                graph3D.transform(WINDOW.CENTER);
                graph3D.transform(WINDOW.P1);
                graph3D.transform(WINDOW.P2);
                graph3D.transform(WINDOW.P3);

            }
            if (event.movementY) { // крутить вокруг OX
                const alpha = canvas.sy(event.movementY) / 10;
                graph3D.rotateOyMatrix(alpha);
                graph3D.transform(WINDOW.CAMERA);
                graph3D.transform(WINDOW.CENTER);
                graph3D.transform(WINDOW.P1);
                graph3D.transform(WINDOW.P2);
                graph3D.transform(WINDOW.P3);
            }
        }
    }

    //Составляющие фигуры
    function printPoints(value) {
        canPrint.points = value;
    }

    function printEdges(value) {
        canPrint.edges = value;
    }

    function printPolygons(value) {
        canPrint.polygons = value;
    }

    function printNumbers(value) {
        canPrint.numbers = value;
    }
    //Фон
    function printStars(value) {
        canPrint.stars = value;
    }

    function randomColor(value) {
        canPrint.color = value;
    }

    function printLight(value) {
        canPrint.light = value;
    }
    function printLines(value) {
        canPrint.lines = value;
    }
    function printShadows(value) {
        canPrint.shadows = value;
    }

    //Фигуры
    function printSphere(value) {
        canPrint.sphere = value;
        printFigure();
    }

    function printEllipsoid(value) {
        canPrint.ellipsoid = value;
        printFigure();
    }

    function printHyperbolicparaboloid(value) {
        canPrint.hyperbolicparaboloid = value;
        printFigure();
    }

    function printHyperboliccylinder(value) {
        canPrint.hyperboliccylinder = value;
        printFigure();
    }

    function printParaboliccylinder(value) {
        canPrint.paraboliccylinder = value;
        printFigure();
    }

    function printEllipticcylinder(value) {
        canPrint.ellipticcylinder = value;
        printFigure();
    }

    function printEllipticparaboloid(value) {
        canPrint.ellipticparaboloid = value;
        printFigure();
    }

    function printCone(value) {
        canPrint.cone = value;
        printFigure();
    }

    function printBublick(value) {
        canPrint.bublick = value;
        printFigure();
    }

    function printSinglecavityhyperboloid(value) {
        canPrint.singlecavityhyperboloid = value;
        printFigure();
    }

    function printDoublecavityhyperboloid(value) {
        canPrint.doublecavityhyperboloid = value;
        printFigure();
    }

    //фон
    let colorcount = 0;
    let clearColor;
    let lightcount = 0;

    //Фон
    //Цвет фона
    function randomColorON() {
        if (canPrint.color) {
            if (colorcount <= 0) {
                clearColor = graph3D.getRandomColor();
                colorcount++;
            }
            canvas.clear(clearColor);
            colorcount++;
        } else {
            canvas.clear();
            colorcount = 0;
        }
    }

    function printLightON() {
        if (canPrint.light) {
            if (lightcount <= 0) {
                LIGHT.push(new Light(0, 0, 0, 200));
                lightcount++
            }
        } else {
            LIGHT.splice(1, 1);
            lightcount = 0;
        }
    }

    //Звёзды
    function starsON() {
        if (canPrint.stars) {
            canvas.draw_stars();
        }
    }

    function LinesON() {
        if (canPrint.lines) {
            canvas.sky();
        }
    }

    //Фигуры
    function printFigure() {
        scene = [];
        if (canPrint.sphere) {
            scene.push(
                sur.sphere(
                    40,
                    12,
                    new Point(0, 0, 0),
                    "FF0000"
                ));
        }
        if (canPrint.ellipsoid) {
            scene.push(sur.ellipsoid())
        }

        if (canPrint.hyperbolicparaboloid) {
            scene.push(sur.hyperbolicParaboloid())
        }

        if (canPrint.hyperboliccylinder) {
            scene.push(sur.hyperboliccylinder())
        }
        if (canPrint.paraboliccylinder) {
            scene.push(sur.paraboliccylinder())
        }

        if (canPrint.ellipticcylinder) {
            scene.push(sur.ellipticcylinder())
        }

        if (canPrint.ellipticparaboloid) {
            scene.push(sur.ellipticparaboloid())
        }
        if (canPrint.cone) {
            scene.push(sur.cone())
        }
        if (canPrint.bublick) {
            scene.push(sur.bublick())
        }
        if (canPrint.singlecavityhyperboloid) {
            scene.push(sur.singlecavityhyperboloid())
        }
        if (canPrint.doublecavityhyperboloid) {
            scene.push(sur.doublecavityhyperboloid())
        }
    }

    function printAllPolygons() {
        // нарисовать полигоны
        if (canPrint.polygons) {
            //набрать полигоны в кучу
            const polygons = [];
            // предаврительные расчёты
            scene.forEach(subject => {
                for (let k = 0; k < LIGHT.length; k++) {
                    //graph3D.calcGorner(subject, WINDOW.CAMERA);
                    graph3D.calcCenters(subject); // центры всех полигонов
                    graph3D.calcDistance(subject, WINDOW.CAMERA, 'distance');
                    graph3D.calcDistance(subject, LIGHT[k], 'lumen');
                }
            });
            // расчёт освещённости полигона и его проекции на экран
            scene.forEach(subject => {
                //алгоритм художника
                for (let k = 0; k < LIGHT.length; k++) {
                    //отрисовка полигонов
                    for (let i = 0; i < subject.polygons.length; i++) {
                        if (subject.polygons[i].visible) {
                            const polygon = subject.polygons[i];
                            const point1 = graph3D.getProection(subject.points[polygon.points[0]]);
                            const point2 = graph3D.getProection(subject.points[polygon.points[1]]);
                            const point3 = graph3D.getProection(subject.points[polygon.points[2]]);
                            const point4 = graph3D.getProection(subject.points[polygon.points[3]]);
                            let { r, g, b } = polygon.color;
                            let isShadow = false;
                            if (canPrint.shadows) {
                                const { isShadow, dark } = graph3D.calcShadow(polygon, subject, scene, LIGHT[k]);
                            } else {
                                let isShadow = false;
                            }
                            const lumen = (isShadow) ? dark : graph3D.calcIllumination(polygon.lumen, LIGHT[k].lumen)
                            r = Math.round(r * lumen);
                            g = Math.round(g * lumen);
                            b = Math.round(b * lumen);
                            polygons.push({
                                points: [point1, point2, point3, point4],
                                color: polygon.rgbToHex(r, g, b),
                                number: polygon.number,
                                distance: polygon.distance
                            });
                        }
                    }
                }
            });
            polygons.sort((a, b) => b.distance - a.distance);
            polygons.forEach(polygon => canvas.polygon(polygon.points, polygon.color, polygon.number, canPrint.numbers));
        }
    }

    function printSubject(subject) {
        // нарисовать рёбра
        if (canPrint.edges) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edge = subject.edges[i];
                const point1 = graph3D.getProection(subject.points[edge.p1]);
                const point2 = graph3D.getProection(subject.points[edge.p2]);
                canvas.linePolygon(point1.x, point1.y, point2.x, point2.y)
            }
        }

        //нарисовать точки
        if (canPrint.points) {
            for (let i = 0; i <= subject.points.length - 1; i++) {
                const points = graph3D.getProection(subject.points[i]);
                canvas.point(points.x, points.y);
            }
        }
    }

    canvas.createStars();
    canvas.generateLines();

    function render() {
        printLightON();
        randomColorON();
        LinesON();
        starsON();
        printAllPolygons();
        scene.forEach(subject => printSubject(subject));
        canvas.text(WINDOW.LEFT + 0.1, WINDOW.HEIGHT / 2 - 1, 'FPS :')
        canvas.text(WINDOW.LEFT + 2, WINDOW.HEIGHT / 2 - 1, FPSout);
        //canvas.line(0, 0, 0, WINDOW.HEIGHT / 2, '#FF0000', 4);
        canvas.render();
    }

    function animation() {
        //закрутим фигуру

        const alpha = Math.PI / 360;

        scene.forEach(subject => {

            if (subject.animation1) {

                for (let key in subject.animation1) {

                    let key1 = key;
                    const { x, y, z } = subject.animation1[key1];
                    const xn1 = 0 - x;
                    const yn1 = 0 - y;
                    const zn1 = 0 - z;

                    if (subject.animation2) {

                        for (let key in subject.animation2) {

                            let key2 = key;
                            const { x, y, z } = subject.animation2[key2];
                            const xn2 = 0 - x;
                            const yn2 = 0 - y;
                            const zn2 = 0 - z;

                            if (subject.animation3) {

                                let key3 = key;
                                const { x, y, z } = subject.animation2[key3];
                                const xn3 = 0 - x;
                                const yn3 = 0 - y;
                                const zn3 = 0 - z;

                                let resultrotatematrix = graph3D.multMatrixes(MATH[`${key1}Matrix`](alpha), MATH[`${key2}Matrix`](alpha / 2));
                                let resultrotatematrix2 = graph3D.multMatrixes(resultrotatematrix, MATH[`${key3}Matrix`](alpha / 4));
                                let resultmovematrix1 = graph3D.multMatrixes(MATH.moveMatrix(xn1, yn1, zn1), MATH.moveMatrix(xn2, yn2, zn2));
                                let resultmovematrix3 = graph3D.multMatrixes(resultmovematrix1, MATH.moveMatrix(xn3, yn3, zn3));
                                let resultmovematrix2 = graph3D.multMatrixes(MATH.moveMatrix(-xn1, -yn1, -zn1), MATH.moveMatrix(-xn2, -yn2, -zn2));
                                let resultmovematrix4 = graph3D.multMatrixes(resultmovematrix2, MATH.moveMatrix(-xn3, -yn3, -zn3));

                                let resultmatr1 = graph3D.multMatrixes(MATH.moveMatrix(xn1, yn1, zn1), MATH.moveMatrix(xn3, yn3, zn3));
                                let resultmatr2 = graph3D.multMatrixes(MATH.moveMatrix(-xn1, -yn1, -zn1), MATH.moveMatrix(-xn3, -yn3, -zn3));
                                let resrotate = graph3D.multMatrixes(MATH[`${key1}Matrix`](alpha), MATH[`${key3}Matrix`](alpha / 6))
                                if (xn2 === 0 && yn2 === 0 && zn2 === 0) {
                                    graph3D.twoAnimateMatrix(resultmatr1, resrotate, resultmatr2);
                                    subject.points.forEach(point => graph3D.transform(point));
                                    graph3D[`${key2}Matrix`](alpha);
                                    graph3D.transform(WINDOW.CAMERA);
                                    graph3D.transform(WINDOW.CENTER);
                                    graph3D.transform(WINDOW.P1);
                                    graph3D.transform(WINDOW.P2);
                                    graph3D.transform(WINDOW.P3);
                                } else {
                                    graph3D.threeAnimateMatrix(resultmovematrix3, resultrotatematrix2, resultmovematrix4);
                                    subject.points.forEach(point => graph3D.transform(point));
                                }
                            } else {
                                let resultrotatematrix = graph3D.multMatrixes(MATH[`${key1}Matrix`](alpha), MATH[`${key2}Matrix`](alpha));
                                let resultmovematrix1 = graph3D.multMatrixes(MATH.moveMatrix(xn1, yn1, zn1), MATH.moveMatrix(xn2, yn2, zn2));
                                let resultmovematrix2 = graph3D.multMatrixes(MATH.moveMatrix(-xn1, -yn1, -zn1), MATH.moveMatrix(-xn2, -yn2, -zn2));
                                if (xn2 === 0 && yn2 === 0 && zn2 === 0) {
                                    graph3D.animateMatrix(xn1, yn1, zn1, key1, alpha, -xn1, -yn1, -zn1);
                                    subject.points.forEach(point => graph3D.transform(point));
                                    graph3D[`${key2}Matrix`](alpha);
                                    graph3D.transform(WINDOW.CAMERA);
                                    graph3D.transform(WINDOW.CENTER);
                                    graph3D.transform(WINDOW.P1);
                                    graph3D.transform(WINDOW.P2);
                                    graph3D.transform(WINDOW.P3);
                                } else {
                                    graph3D.twoAnimateMatrix(resultmovematrix1, resultrotatematrix, resultmovematrix2);
                                    subject.points.forEach(point => graph3D.transform(point));
                                }
                            }
                        }
                    } else {
                        graph3D.animateMatrix(xn1, yn1, zn1, key1, alpha, -xn1, -yn1, -zn1);
                        subject.points.forEach(point => graph3D.transform(point));
                    }
                }
            }
        });
    }

    setInterval(animation, 10);

    let FPS = 0;
    let FPSout;
    let timestamp = (new Date()).getTime();


    (function animloop() {
        FPS++;
        const currentTimestamp = (new Date()).getTime();
        if (currentTimestamp - timestamp >= 1000) {
            timestamp = currentTimestamp;
            FPSout = FPS;
            FPS = 0;
        }
        graph3D.calcPlaneEquation();
        graph3D.calcWindowVectors();
        render();
        requestAnimationFrame(animloop);
    })();
}