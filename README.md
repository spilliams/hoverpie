hoverpie
========

A simple pie chart builder based on EaselJS

Dependencies
--------

- [jQuery](http://jquery.com/)
- [EaselJS](http://www.createjs.com/#!/EaselJS)

Usage
--------

###HTML

    <canvas id="myCanvas" width="350" height="350"></canvas>

###javascript

    var data = [
      {
        percentage : 0.2,
        color : "#c05555",
        label : "red"
      },{
        percentage : 0.2,
        color : "#ce7b2b",
        label : "orange"
      },{
        percentage : 0.2,
        color : "#dba000",
        label : "yellow"
      },{
        percentage : 0.2,
        color : "#6e8c5f",
        label : "green"
      },{
        percentage : 0.2,
        color : "#0078bd",
        label : "blue"
      }];
    var canvas = $('#myCanvas');
    HoverPie.make(canvas, data, {});
    
The third argument in `HoverPie.make(...)` refers to a `config` parameter. Acceptable config options:

<table>
  <thead>
    <tr>
      <th>option name</th>
      <th>type</th>
      <th>default</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>canvasPadding</code></td>
      <td>integer</td>
      <td>25</td>
      <td>pixels between unhovered pie and canvas edge</td>
    </tr>
    <tr>
      <td><code>hoverScaleX</code></td>
      <td>float</td>
      <td>1.1</td>
      <td>scale for the x axis of a hovered pie sector</td>
    </tr>
    <tr>
      <td><code>hoverScaleY</code></td>
      <td>float</td>
      <td>1.1</td>
      <td>scale for the y axis of a hovered pie sector</td>
    </tr>
    <tr>
      <td><code>labelColor</code></td>
      <td>CSS color</td>
      <td>rgba(255,255,255,0.5)</td>
      <td></td>
    </tr>
    <tr>
      <td><code>labelHoverColor</code></td>
      <td>CSS color</td>
      <td>rgba(255,255,255,1)</td>
      <td></td>
    <tr>
      <td><code>labelRadiusFactor</code></td>
      <td>float</td>
      <td>0.66</td>
      <td>This factor is multiplied with the pie's radius to determine where the labels are centered.</td>
    </tr>
    <tr>
      <td><code>labelFontFamily</code></td>
      <td>CSS font family</td>
      <td>Arial</td>
      <td></td>
    </tr>
    <tr>
      <td><code>labelFontWeight</code></td>
      <td>CSS font weight</td>
      <td>normal</td>
      <td></td>
    </tr>
    <tr>
      <td><code>labelFontSize</code></td>
      <td>pixel number</td>
      <td>16</td>
      <td></td>
    </tr>
    <tr>
      <td><code>sectorFillColor</code></td>
      <td>CSS color</td>
      <td>#666</td>
      <td></td>
    </tr>
    <tr>
      <td><code>sectorStrokeColor</code></td>
      <td>CSS color</td>
      <td>#fff</td>
      <td></td>
    </tr>
    <tr>
      <td><code>sectorStrokeWidth</code></td>
      <td>float</td>
      <td>2</td>
      <td></td>
    </tr>
  </tbody>
</table>

License
-------

This library is available under the MIT License. See LICENSE for more information.