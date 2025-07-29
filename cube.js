/**
 * ExoByte Core Cube Animation
 * A simple rotating cube animation with drag and color change features.
 *
 * @version 1.0.2
 *
 * Usage:
 * ```HTML
 * <rotating-cube top="100px" left="100px" color="#00aaff" auto-start></rotating-cube>
 * ```
 *
 * <em>Note: attributes are not required</em>
 *
 * @author ExoByte Core Team
 * @license MIT
 */
class CubeElement extends HTMLElement {
    constructor() {
        super();

        // Create shadow root and base elements
        const shadow = this.attachShadow({mode: 'open'});

        const placement = document.querySelectorAll('rotating-cube').length;

        const wrapper = document.createElement('div');
        wrapper.className = 'cube-container';
        wrapper.style.position = 'absolute';
        wrapper.style.top = this.getAttribute('top') || `${100 * placement + 5}px`;
        wrapper.style.left = this.getAttribute('left') || `${100 * placement + 5}px`;
        wrapper.style.width = '100px';
        wrapper.style.height = '100px';
        wrapper.style.perspective = '800px';
        wrapper.style.cursor = 'grab';

        const cube = document.createElement('div');
        cube.className = 'cube';

        for (let i = 1; i <= 6; i++) {
            const face = document.createElement('span');
            face.className = `face face${i}`;
            face.style.background = this.getAttribute('color') || 'rgba(0, 150, 255, 0.8)';
            cube.appendChild(face);
        }

        wrapper.appendChild(cube);

        const style = document.createElement('style');
        style.textContent = `
      .cube-container {
        transform: translate(-50%, -50%)
      }        
      .cube {
        width: 100px;
        height: 100px;
        transform-style: preserve-3d;
        display: none;
      }

      .cube.animate {
        display: block;
        animation: spin 5s linear infinite;
      }

      .face {
        position: absolute;
        width: 100px;
        height: 100px;
        background: rgba(0, 150, 255, 0.8);
        border: 1px solid #fff;
      }

      .face1 { transform: rotateY(0deg) translateZ(50px); }
      .face2 { transform: rotateY(180deg) translateZ(50px); }
      .face3 { transform: rotateY(90deg) translateZ(50px); }
      .face4 { transform: rotateY(-90deg) translateZ(50px); }
      .face5 { transform: rotateX(90deg) translateZ(50px); }
      .face6 { transform: rotateX(-90deg) translateZ(50px); }

      @keyframes spin {
        from { transform: rotateX(0deg) rotateY(0deg); }
        to { transform: rotateX(360deg) rotateY(360deg); }
      }
    `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);

        // Drag logic
        let isMoving = false;
        let dragOffsetX = 0, dragOffsetY = 0;

        wrapper.addEventListener('mousedown', e => {
            if (!this.isDraggable) {
                e.preventDefault();
                return;
            }
            isMoving = true;
            const rect = wrapper.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            document.body.style.userSelect = 'none';
        });

        wrapper.addEventListener('mouseup', () => {
            isMoving = false;
            document.body.style.userSelect = '';
        });

        wrapper.addEventListener('mouseleave', () => {
            isMoving = false;
            document.body.style.userSelect = '';
        });

        wrapper.addEventListener('mousemove', e => {
            if (!isMoving) return;
            // Account for the -50% translation
            const width = wrapper.offsetWidth;
            const height = wrapper.offsetHeight;
            wrapper.style.left = `${e.clientX - dragOffsetX + width / 2}px`;
            wrapper.style.top = `${e.clientY - dragOffsetY + height / 2}px`;
        });

        // Double-click for random color
        wrapper.addEventListener('dblclick', () => {
            const randColor = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}cc`;
            cube.querySelectorAll('.face').forEach(f => f.style.background = randColor);
        });

        // Create API for this cube instance
        this.api = {
            start: () => {
                cube.classList.add('animate');
                return "Cube animation started";
            },
            stop: () => {
                cube.classList.remove('animate');
                return "Cube animation stopped";
            },
            color: (colorOrGradient) => {
                const isGradient = /^(linear|radial)-gradient\(.+\)$/i.test(colorOrGradient);
                const isHex = /^#([0-9A-Fa-f]{3,8})$/.test(colorOrGradient);
                if (!isGradient && !isHex) {
                    return "Invalid color format. Use #RRGGBB or CSS gradient.";
                }
                cube.querySelectorAll('.face').forEach(f => f.style.background = colorOrGradient);
                return `Cube faces color changed to ${colorOrGradient}`;
            },
            info: () => (
                "Controls:\n" +
                "- cube.start() → Start spinning\n" +
                "- cube.stop() → Stop spinning\n" +
                "- cube.color('#hex' or 'linear-gradient(...)') → Change face color\n" +
                "- Double-click → Random 80% opacity color\n" +
                "- Drag → Move the cube around the screen"
            )
        };

        // Expose cube API to the global window object
        if (!window.cube) {
            window.cube = {
                info: () => {
                    console.log(
                        "%cWelcome to ExoByte Core Cube Animation!\n\n" +
                        "%cA simple js cube animation with drag and color change features.\n\n" +
                        "Commands:\n" +
                        "- cube.info(): displays this message\n" +
                        "- cube.start(): starts all the cube animations\n" +
                        "- cube.stop(): stops all the cube animations\n" +
                        "- cube.color('#hex' or 'linear-gradient(...)'): changes the color of all cubes\n" +
                        "- cube.cubes(): returns the number of cubes on the page\n\n" +
                        "Each cube can be accessed separately by using %c`cubes[index].api`",
                        "font-style:italic;font-weight:800;color:#d000ff;font-size:20px;",
                        "font-style:normal;",
                        "font-style:italic;background-color: rgba(165, 165, 165, 0.25);"
                    );
                },
                cubes: () => {
                    return `Total cubes available: ${document.querySelectorAll('rotating-cube').length}\n` +
                        "Use `cubes[index]` to access a specific cube instance.";
                },
                start: () => {
                    const cubes = document.querySelectorAll('rotating-cube');
                    cubes.forEach(c => c.api.start());
                    return "All cube animations started.";
                },
                stop: () => {
                    const cubes = document.querySelectorAll('rotating-cube');
                    cubes.forEach(c => c.api.stop());
                    return "All cube animations stopped.";
                },
                color: (colorOrGradient) => {
                    const cubes = document.querySelectorAll('rotating-cube');
                    cubes.forEach(c => c.api.color(colorOrGradient));
                    return `All cube faces color changed to ${colorOrGradient}`;
                }
            };

            // Expose all cubes as window.cubes for direct access
            Object.defineProperty(window, 'cubes', {
                get: () => Array.from(document.querySelectorAll('rotating-cube'))
            });

            const cubes = document.querySelectorAll('rotating-cube');
            for (let i = 1; i < cubes.length; i++) {
                console.log(`[${i}] Cube instance created.`);
            }
            console.log(`Use "cube.info()" to see available commands.`);
        }
    }

    /**
     * Called when the element is added to the document.
     * Starts animation if 'auto-start' attribute is present.
     */
    connectedCallback() {
        this.initialize();
    }

    /**
     * Called when the element is removed from the document.
     * Stops animation if 'auto-start' attribute was present.
     */
    disconnectedCallback() {
        this.api.stop();
    }

    /**
     * Called when the element is updated.
     * Updates the position and color of the cube.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'top':
                this.shadowRoot.querySelector('.cube-container').style.top = newValue || '100px';
                break;
            case 'left':
                this.shadowRoot.querySelector('.cube-container').style.left = newValue || '100px';
                break;
            case 'color':
                const faces = this.shadowRoot.querySelectorAll('.face');
                faces.forEach(face => face.style.background = newValue || 'rgba(0, 150, 255, 0.8)');
                break;
            case 'draggable':
                this.isDraggable = this.hasAttribute('draggable');
                break;
            default:
                console.warn(`Attribute ${name} not recognized.`);
        }
    }

    /**
     * Initializes the cube element.
     *
     * Sets the initial position and color based on attributes.
     * Starts the animation if 'auto-start' attribute is present.
     *
     */
    initialize() {
        if (this.hasAttribute('auto-start')) {
            this.api.start();
        }
        this.shadowRoot.querySelector('.cube-container').style.top = this.getAttribute("top") || '100px';
        this.shadowRoot.querySelector('.cube-container').style.left = this.getAttribute("left") || '100px';
        this.shadowRoot.querySelectorAll('.face').forEach(face => {
            face.style.background = this.getAttribute("color") || '#d000ff88';
            face.style.borderColor = this.getAttribute("edge-color") || '#fff';
        });
        this.isDraggable = this.hasAttribute('draggable');
        if (this.hasAttribute('no-edges')) {
            this.shadowRoot.querySelectorAll('.face').forEach(face => {
                face.style.border = 'none';
            });
        }
    }
}

customElements.define('rotating-cube', CubeElement);