//Script for building various modul grids with shapes
var modulo = this;

modulo.buildGUI = function(thisObj){
	thisObj.w = (thisObj instanceof Panel) ? thisObj : new Window("palette", thisObj.scriptTitle, undefined, {resizeable:true});
	thisObj.w.alignChildren = ['left', 'top']

	if (thisObj.w instanceof Window){
    thisObj.w.center();
    thisObj.w.show();
  }
  else thisObj.w.layout.layout(true);
}

var activeComp = app.project.activeItem;

var myShape = new Shape();
myShape.vertices = [[0,0], [0,100], [100,100], [100,0]];
myShape.closed = true;

var activeItem = app.project.activeItem;
if (activeItem != null && activeItem instanceof CompItem) {
  var shapeLayer = activeItem.layers.addShape();
  var contents = shapeLayer.property("ADBE Root Vectors Group");
  var g1 = contents.addProperty("ADBE Vector Group").property("ADBE Vectors Group");
  g1.addProperty("ADBE Vector Shape - Rect");
  g1.addProperty("ADBE Vector Graphic - Stroke");
  var repeater = g1.addProperty("ADBE Vector Filter - Repeater");
  repeater.property("ADBE Vector Repeater Copies").setValue(4);
  repeater.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Position").setValue([100,0]);
}


function drawGrid(cols, rows){
  var numCols = cols[0];
  var colWidth = cols[1];
  var numRows = rows[0];
  var rowWidth = rows[1];

}