# 🧊 ExoByte CORE Cube.js

A lightweight JavaScript library to display a customizable, rotating 3D cube on your web page.

---

## 📖 Table of Contents

<!-- TOC -->
* [🧊 ExoByte CORE Cube.js](#-exobyte-core-cubejs)
  * [📖 Table of Contents](#-table-of-contents)
  * [🚀 Usage](#-usage)
  * [🎨 Customization](#-customization)
    * [Cube Color](#cube-color)
    * [Position](#position)
    * [Autostart Animation](#autostart-animation)
    * [Edge Color](#edge-color)
  * [🛠️ Additional Functionality](#-additional-functionality)
    * [Draggable](#draggable)
    * [Hide Edges](#hide-edges)
    * [Random Color on Double-Click](#random-color-on-double-click)
  * [🖥️ Console API](#-console-api)
  * [📬 Feedback](#-feedback)
  * [📄 License](#-license)
<!-- TOC -->

---

## 🚀 Usage

1. **Import the Library**  
   Add the script to your HTML via jsDelivr:
   ```html
   <script src="https://cdn.jsdelivr.net/gh/heldertheking/cube.js@latest/cube.js"></script>
   ```
2. **Add the Custom Element**
   Place the cube in your HTML:
   <rotating-cube></rotating-cube>

---

## 🎨 Customization

### Cube Color

Set the cube’s color:

```html

<rotating-cube color="#ff0000"></rotating-cube>
```

### Position

Set position with top and left:

```html

<rotating-cube top="100px" left="100px"></rotating-cube>
```

### Autostart Animation

Start rotation automatically:

```html

<rotating-cube autostart></rotating-cube>
```

### Edge Color

Customize edge color:

```html

<rotating-cube edge-color="#00ff00"></rotating-cube>
```

---

## 🛠️ Additional Functionality

### Draggable

Make the cube draggable:

```html

<rotating-cube draggable></rotating-cube>
```

### Hide Edges

Hide cube edges:

```html

<rotating-cube no-edges></rotating-cube>
```

### Random Color on Double-Click

Double-click the cube to change its color randomly.

---

## 🖥️ Console API

Control the cube via the browser console using the global Cube API.
For more info, run:

```javascript
cube.info()
```

---

## 📬 Feedback

Have fun with your rotating cube!
Questions or suggestions? [Open an issue](https://github.com/heldertheking/cube.js) on GitHub.

---

## 📄 License

MIT License. See the [LICENSE](LICENSE) file for details.

