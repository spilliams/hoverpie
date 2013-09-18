hoverpie
========

![hoverpie](http://f.cl.ly/items/3I2v3V3R0K341t1q2p08/Screen%20Shot%202013-09-13%20at%205.21.23%20PM.png)

A simple pie chart builder based on EaselJS

Dependencies
--------

- [jQuery](http://jquery.com/)
- [EaselJS](http://www.createjs.com/#!/EaselJS)

Compatibility
--------

Tested compatible with jQuery 1.9.1 and 2.0.3, and EaselJS 0.6.1

Tested compatible with Mac/Chrome 29 and Mac/Firefox 23.

Usage
--------

###HTML

    <canvas id="myCanvas" width="350" height="350"></canvas>
    
Note that you may pass in config parameters through the `<canvas>`'s data attributes:

    <canvas id="myCanvas" width="350" height="350" data-hoverpie-config-label-radius-factor=0.8>
    
See below for more information about config options.

###javascript

    var data = [
      {
        percentage : 0.2,
        fillColor : "#c05555",
        labelText : "red"
      },
      ...
    ];
    HoverPie.make($('#myCanvas'), data, {});
    
You can also make a group of pies at once using the same data and config!

    HoverPie.makeAll($('canvas'), data, config);

Each data point you pass in may contain any of the following options:
<table>
  <thead>
    <tr>
      <th>option name</th>
      <th>type</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>percentage</td>
      <td>[0,1]</td>
      <td>How large a slice of the pie this point represents. This is **not** validated.</td>
    </tr>
    <tr>
      <td>fillColor</td>
      <td>CSS color</td>
      <td>Overrides the <code>sectorFillColor</code> config option.</td>
    </tr>
    <tr>
      <td>labelText</td>
      <td>string</td>
      <td>The text to appear in the title label (both hover and unhover).</td>
    </tr>
    <tr>
      <td>descriptionText</td>
      <td>string</td>
      <td>The text to appear in the description label (only visible on hover)</td>
    </tr>
    <tr>
      <td>labelOffset</td>
      <td><code>{x : (float), y : (float) }</code></td>
      <td>Offsets the title label (unhover only)</td>
    </tr>
    <tr>
      <td>labelHoverOffset</td>
      <td><code>{x : (float), y : (float) }</code></td>
      <td>Offsets the title label (hover only) and description label</td>
    </tr>
    <tr>
      <td>config</td>
      <td>Object, see below</td>
      <td>Enables each particular data point to customize things like font family, text options, etc</td>
    </tr>
  </tbody>
</table>

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
      <td><code>labelRadiusFactor</code></td>
      <td>float</td>
      <td>0.66</td>
      <td>This factor is multiplied with the pie's radius to determine where the unhovered title label is positioned.</td>
    </tr>
    <tr>
      <td><code>labelHoverRadiusFactor</code></td>
      <td>float</td>
      <td>false</td>
      <td>This factor is multiplied with the pie's radius to determine where the hover title and description labels are positioned. If false, falls back to <code>labelRadiusFactor</code></td>
    </tr>
    <tr>
      <td><code>labelFontColor</code></td>
      <td>CSS color</td>
      <td>rgba(255,255,255,0.5)</td>
      <td>Affects unhovered title label.</td>
    </tr>
    <tr>
      <td><code>labelFontFamily</code></td>
      <td>CSS font family</td>
      <td>Arial</td>
      <td>Affects unhovered and hovered title labels.</td>
    </tr>
    <tr>
      <td><code>labelFontWeight</code></td>
      <td>CSS font weight</td>
      <td>normal</td>
      <td>Affects unhovered and hovered title labels.</td>
    </tr>
    <tr>
      <td><code>labelFontSize</code></td>
      <td>pixel number</td>
      <td>16</td>
      <td>Affects unhovered and hovered title labels.</td>
    </tr>
    <tr>
      <td><code>labelHoverColor</code></td>
      <td>CSS color</td>
      <td>rgba(255,255,255,1)</td>
      <td>Affects hovered title label. If false, falls back to <code>labelFontColor</code>.</td>
    </tr>
    <tr>
      <td><code>descriptionFontColor</code></td>
      <td>CSS color</td>
      <td>false</td>
      <td>Affects description label. If false, falls back to <code>labelHoverColor</code>.</td>
    </tr>
    <tr>
      <td><code>descriptionFontFamily</code></td>
      <td>CSS font family</td>
      <td>false</td>
      <td>Affects description label. If false, falls back to <code>labelFontFamily</code>.</td>
    </tr>
    <tr>
      <td><code>descriptionFontWeight</code></td>
      <td>CSS font weight</td>
      <td>false</td>
      <td>Affects description label. If false, falls back to <code>labelFontWeight</code>.</td>
    </tr>
    <tr>
      <td><code>descriptionFontSize</code></td>
      <td>px</td>
      <td>false</td>
      <td>Affects description label. If false, falls back to <code>labelFontSize</code>.</td>
    </tr>
    <tr>
      <td><code>descriptionOffsetX</code></td>
      <td>px</td>
      <td>0</td>
      <td>Positions the description label with relation to the hover title label.</td>
    </tr>
    <tr>
      <td><code>descriptionOffsetY</code></td>
      <td>px</td>
      <td>0</td>
      <td>Positions the description label with relation to the hover title label.</td>
    </tr>
    <tr>
      <td><code>descriptionAlignment</code></td>
      <td>center, left or right</td>
      <td>center</td>
      <td>Description label will align with the left, center or right of the hover label.</td>
    </tr>
    <tr>
      <td><code>descriptionLineWidth</code></td>
      <td>px</td>
      <td>false</td>
      <td>Sets the description label's line width. If false, description label will not wrap.</td>
    </tr>
    <tr>
      <td><code>descriptionLineHeight</code></td>
      <td>px</td>
      <td>false</td>
      <td>Sets the description label's line height. If false, defaults to 1.2 times the width of an 'm'.</td>
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