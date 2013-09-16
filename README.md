hoverpie
========

![hoverpie](http://f.cl.ly/items/3I2v3V3R0K341t1q2p08/Screen%20Shot%202013-09-13%20at%205.21.23%20PM.png)

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
        label : "red",
        labelOffset : { x : -4, y : 12 }
      },
      ...
      ];
    HoverPie.make('myCanvas', data, {});
    
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
      <td><code>labelFontColor</code></td>
      <td>CSS color</td>
      <td>rgba(255,255,255,0.5)</td>
      <td>Affects unhovered title label.</td>
    </tr>
    <tr>
      <td><code>labelHoverColor</code></td>
      <td>CSS color</td>
      <td>rgba(255,255,255,1)</td>
      <td>Affects hovered title label as well as description label.</td>
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
      <td>Affects unhovered and hovered title labels, as well as description label.</td>
    </tr>
    <tr>
      <td><code>labelFontWeight</code></td>
      <td>CSS font weight</td>
      <td>normal</td>
      <td>Affects unhovered and hovered title labels, as well as description label.</td>
    </tr>
    <tr>
      <td><code>labelFontSize</code></td>
      <td>pixel number</td>
      <td>16</td>
      <td>Affects unhovered and hovered title labels, as well as description label.</td>
    </tr>
    <tr>
      <td><code>descriptionAlignment</code></td>
      <td>center, left or right</td>
      <td>center</td>
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