var HoverPie = {};

HoverPie.config = {
  canvasPadding : 25,
  hoverScaleX : 1.1,
  hoverScaleY : 1.1,
  labelRadiusFactor : 0.66,
  
  labelFontColor : "rgba(255,255,255,0.5)",
  labelFontFamily : "Arial",
  labelFontWeight : "normal",
  labelFontSize : 16,
  
  labelHoverColor : "rgba(255,255,255,1)",
  
  descriptionFontColor : false,
  descriptionFontFamily : false,
  descriptionFontWeight : false,
  descriptionFontSize : false,
  
  descriptionOffsetX : 0,
  descriptionOffsetY : 0,
  descriptionAlignment : "center",
  descriptionLineWidth : false,
  descriptionLineHeight : false,
  
  sectorFillColor : "#666",
  sectorStrokeColor : "#fff",
  sectorStrokeWidth : 2,
};
HoverPie.make = (function(canvasId, data, canvasConfig){
  
  config = $.extend({}, HoverPie.config, canvasConfig);
  
  var percent2radians = (function(percent) { return percent*Math.PI*2; });
  
  var $canvas = $("#"+canvasId);
  var ctx = $canvas[0].getContext("2d");
  var oX = ctx.canvas.width/2;
  var oY = ctx.canvas.height/2;
  var r = Math.min(oX,oY) - config.canvasPadding;
  var stage = new createjs.Stage(canvasId);
  stage.enableMouseOver(20);
  
  var cumulativeAngle = 1.5*Math.PI;
  
  for (var i=0; i<data.length; i++) {
    
    if (typeof data[i].config != "undefined") {
      config = $.extend({}, HoverPie.config, canvasConfig, data[i].config);
    } else {
      config = $.extend({}, HoverPie.config, canvasConfig);
    }
    
    var sector = new createjs.Shape();
    var container = new createjs.Container();
    container.name = container.id;
    
    // Draw the arc
    var sectorFillColor = data[i].fillColor || config.sectorFillColor;
    var sectorStrokeColor = data[i].strokeColor || config.sectorStrokeColor;
    sector.graphics.moveTo(oX,oY).beginFill(sectorFillColor).setStrokeStyle(config.sectorStrokeWidth).beginStroke(sectorStrokeColor);
    var sectorAngle = percent2radians(data[i].percentage);
    sector.graphics.arc(oX,oY,r,cumulativeAngle,cumulativeAngle+sectorAngle);
    sector.graphics.closePath();
    container.addChild(sector);
    
    var labelRadius = r*config.labelRadiusFactor;
    var labelAngle = cumulativeAngle + sectorAngle/2.0;
    var labelX = oX + labelRadius * Math.cos(labelAngle);
    var labelY = oY + labelRadius * Math.sin(labelAngle);
    if (typeof data[i].labelOffset != "undefined") {
      labelX += data[i].labelOffset.x;
      labelY += data[i].labelOffset.y;
    }
    
    // Draw the title label
    if (data[i].label) {
      
      // One for unhovered sectors
      var font = config.labelFontWeight+" "+config.labelFontSize+"px "+config.labelFontFamily;
      var unhoverLabel = new createjs.Text(data[i].label,font,config.labelFontColor);
      unhoverLabel.textAlign = "center";
      unhoverLabel.textBaseline = "bottom";
      
      // The label is to be placed such that the center of its baseline
      // is tangent to a circle of radius r*config.labelRadiusFactor
      // and a line drawn along the center of the sector
      unhoverLabel.x = labelX;
      unhoverLabel.y = labelY;
      unhoverLabel.name = "label";
      
      // and one for hovered sectors
      var fontColor = config.labelHoverColor || config.labelFontColor;
      var hoverLabel = new createjs.Text(data[i].label, font, fontColor);
      hoverLabel.textAlign = "center";
      hoverLabel.textBaseline = "bottom";
      // Because the container scales up but we don't want the hoverlabels to.
      hoverLabel.scaleX = 1/config.hoverScaleX;
      hoverLabel.scaleY = 1/config.hoverScaleY;
      
      hoverLabel.x = labelX;
      hoverLabel.y = labelY;
      hoverLabel.name = "hoverLabel";
      hoverLabel.visible = false;
      
      container.addChild(unhoverLabel);
      container.addChild(hoverLabel);
    }
    
    // Draw the description label
    if (data[i].description) {
      
      var fontWeight = config.descriptionFontWeight || config.labelFontWeight;
      var fontSize = config.descriptionFontSize || config.labelFontSize;
      var fontFamily = config.descriptionFontFamily || config.labelFontFamily;
      var fontColor = config.descriptionFontColor || config.labelHoverColor || config.labelFontColor;
      var font = fontWeight+" "+fontSize+"px "+fontFamily;
      var description = new createjs.Text(data[i].description, font, fontColor);
      description.textBaseline = "top";
      description.textAlign = config.descriptionAlignment;
      
      description.y = labelY + config.descriptionOffsetY;
      if (config.descriptionAlignment == "center") {
        description.x = labelX + config.descriptionOffsetX;
      } else  {
        var hoverWidth = container.getChildByName("hoverLabel").getMeasuredWidth() / config.hoverScaleX;
        if (config.descriptionAlignment == "left") {
          description.x = labelX - hoverWidth/2.0 + config.descriptionOffsetX;
        } else {
          description.x = labelX + hoverWidth/2.0 + config.descriptionOffsetX;
        }
      }
      
      if (config.descriptionLineWidth) {
        description.lineWidth = config.descriptionLineWidth;
      }
      
      if (config.descriptionLineHeight) {
        description.lineHeight = config.descriptionLineHeight;
      }
      
      description.scaleX = 1/config.hoverScaleX;
      description.scaleY = 1/config.hoverScaleY;
      
      description.name = "description";
      description.visible = false;
      container.addChild(description);
    }
    
    // reposition scale origin and draw origin
    container.regX = oX;
    container.regY = oY;
    container.x = oX;
    container.y = oY;
    
    cumulativeAngle+=sectorAngle;
    stage.addChild(container);
    stage.update();
  } // percentages loop
  
  // This array tracks the currently-hovered pie sectors.
  // if it is empty, there are no sectors hovered.
  var hovers = [];
  
  // This function is to be called with a list of stage IDs
  // it will revert any currently-hovered elements to their
  // original style, and apply hover style to the new set.
  var hover = (function(ids){
    //console.log(ids,stage.children);
    
    // any ids in hovers that aren't in ids need to be unhovered
    var toUnhover = [];
    for (var i=0; i<hovers.length; i++) {
      if (ids.indexOf(hovers[i]) == -1) {
        // didn't find hover[i] in ids, so add to toUnhover
        toUnhover.push(hovers[i]);
      }
    }
    for (var i=0; i<toUnhover.length; i++) {
      var child = stage.getChildByName(toUnhover[i]);
      
      
      child.scaleX = 1;
      child.scaleY = 1;
      child.getChildByName("label").visible = true;
      child.getChildByName("hoverLabel").visible = false;
      child.getChildByName("description").visible = false;
      
      
    }
    
    // and ids in ids that aren't in hovers need to be hovered
    var toHover = [];
    for (var i=0; i<ids.length; i++) {
      if (hovers.indexOf(ids[i]) == -1) {
        // didn't find ids[i] in hovers, so add to toHover
        toHover.push(ids[i]);
      }
    }
    for (var i=0; i<toHover.length; i++) {
      
      
      var container = stage.getChildByName(toHover[i]);
      container.scaleX = config.hoverScaleX;
      container.scaleY = config.hoverScaleY;
      container.getChildByName("label").visible = false;
      container.getChildByName("hoverLabel").visible = true;
      container.getChildByName("description").visible = true;
      
      
    }
    
    hovers = ids;
    stage.update();
  });
  
  // This binding fires hover() when the mouse hovers over a
  // new set of pie sectors.
  // We can't use an addEventListener on each sector because
  // the hit mask on those shapes is the size of the entire
  // pie, not the individual sector.
  // I have not yet tried using canvas clip(). Maybe that's
  // a better solution? Unsure.
  $canvas.mousemove(function(e){
    var objs = stage.getObjectsUnderPoint(e.offsetX,e.offsetY);
    var ids = $.map(objs,function(e){ return e.parent.id; });
    
    // call hover() if ids does not match current hovers
    if (ids.length != hovers.length) {
      hover(ids);
      return;
    }
    for (var i=0; i<hovers.length; i++) {
      if (ids[i] != hovers[i]) {
        hover(ids);
        return;
      }
    }
  });

  $canvas.mouseout(function(e){
    hover([]);
  });
});

