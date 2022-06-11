class UI {
  constructor({ callbacks = {} }) {
    //callbacks
    this.move = (callbacks.move instanceof Function) ? callbacks.move : function () { };

    //составляющие фигур
    const printPoints = (callbacks.printPoints instanceof Function)
      ? callbacks.printPoints
      : function () { }
    const printEdges = (callbacks.printEdges instanceof Function)
      ? callbacks.printEdges
      : function () { }
    const printPolygons = (callbacks.printPolygons instanceof Function)
      ? callbacks.printPolygons
      : function () { }
    const printNumbers = (callbacks.printNumbers instanceof Function)
      ? callbacks.printNumbers
      : function () { }
    const printShadows = (callbacks.printShadows instanceof Function)
      ? callbacks.printShadows
      : function () { }
    //фон 
    const printStars = (callbacks.printStars instanceof Function)
      ? callbacks.printStars
      : function () { }
    const randomColor = (callbacks.printStars instanceof Function)
      ? callbacks.randomColor
      : function () { }
    const printLight = (callbacks.printLight instanceof Function)
      ? callbacks.printLight
      : function () { }
    const printLines = (callbacks.printLines instanceof Function)
      ? callbacks.printLines
      : function () { }

    //фигуры
    const printSphere = (callbacks.printSphere instanceof Function)
      ? callbacks.printSphere
      : function () { }
    const printEllipsoid = (callbacks.printEllipsoid instanceof Function)
      ? callbacks.printEllipsoid
      : function () { }
    const printHyperbolicparaboloid = (callbacks.printHyperbolicparaboloid instanceof Function)
      ? callbacks.printHyperbolicparaboloid
      : function () { }
    const printHyperboliccylinder = (callbacks.printHyperboliccylinder instanceof Function)
      ? callbacks.printHyperboliccylinder
      : function () { }
    const printParaboliccylinder = (callbacks.printParaboliccylinder instanceof Function)
      ? callbacks.printParaboliccylinder
      : function () { }
    const printEllipticcylinder = (callbacks.printEllipticcylinder instanceof Function)
      ? callbacks.printEllipticcylinder
      : function () { }
    const printEllipticparaboloid = (callbacks.printEllipticparaboloid instanceof Function)
      ? callbacks.printEllipticparaboloid
      : function () { }
    const printCone = (callbacks.printCone instanceof Function)
      ? callbacks.printCone
      : function () { }
    const printBublick = (callbacks.printBublick instanceof Function)
      ? callbacks.printBublick
      : function () { }
    const printSinglecavityhyperboloid = (callbacks.printSinglecavityhyperboloid instanceof Function)
      ? callbacks.printSinglecavityhyperboloid
      : function () { }
    const printDoublecavityhyperboloid = (callbacks.printDoublecavityhyperboloid instanceof Function)
      ? callbacks.printDoublecavityhyperboloid
      : function () { }
    //events
    //составляющие фигур
    document
      .getElementById('printPoints')
      .addEventListener('change', function () { printPoints(this.checked); })
    document
      .getElementById('printEdges')
      .addEventListener('change', function () { printEdges(this.checked); })
    document
      .getElementById('printPolygons')
      .addEventListener('change', function () { printPolygons(this.checked); })
    document
      .getElementById('printNumbers')
      .addEventListener('change', function () { printNumbers(this.checked); })

    //фон
    document
      .getElementById('printStars')
      .addEventListener('change', function () { printStars(this.checked); })
    document
      .getElementById('randomColor')
      .addEventListener('change', function () { randomColor(this.checked); })
    document
      .addEventListener('keydown', event => this.keyDown(event));
    document
      .getElementById('printLight')
      .addEventListener('change', function () { printLight(this.checked); })
    document
      .getElementById('printLines')
      .addEventListener('change', function () { printLines(this.checked); })
    document
      .getElementById('printShadows')
      .addEventListener('change', function () { printShadows(this.checked); })
    //фигуры

    $('.figure').on('click', function () {
      let figure = $(this).attr('id');
      printSphere(false);
      printEllipsoid(false);
      printHyperbolicparaboloid(false);
      printHyperboliccylinder(false);
      printParaboliccylinder(false);
      printEllipticcylinder(false);
      printEllipticparaboloid(false);
      printCone(false);
      printBublick(false);
      printSinglecavityhyperboloid(false);
      printDoublecavityhyperboloid(false);
      switch (figure) {
        case 'printSphere': {
          printSphere(true);
          break;
        }
        case 'printEllipsoid': {
          printEllipsoid(true);
          break;
        }
        case 'printHyperbolicparaboloid': {
          printHyperbolicparaboloid(true);
          break;
        }
        case 'printHyperboliccylinder': {
          printHyperboliccylinder(true);
          break;
        }
        case 'printParaboliccylinder': {
          printParaboliccylinder(true);
          break;
        }
        case 'printEllipticcylinder': {
          printEllipticcylinder(true);
          break;
        }
        case 'printEllipticparaboloid': {
          printEllipticparaboloid(true);
          break;
        }
        case 'printCone': {
          printCone(true);
          break;
        }
        case 'printBublick': {
          printBublick(true);
          break;
        }
        case 'printSinglecavityhyperboloid': {
          printSinglecavityhyperboloid(true);
          break;
        }
        case 'printDoublecavityhyperboloid': {
          printDoublecavityhyperboloid(true);
          break;
        }
      }
    });
  }

  keyDown(event) {
    switch (event.keyCode) {
      case 37: return this.move('left');
      case 38: return this.move('up');
      case 39: return this.move('right');
      case 40: return this.move('down');
    }
  }
}