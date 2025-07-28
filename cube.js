class CubeElement extends HTMLElement {
    constructor() {
        super();

        // Create shadow root and base elements
        const shadow = this.attachShadow({mode: 'open'});

        const wrapper = document.createElement('div');
        wrapper.className = 'cube-container';
        wrapper.style.position = 'absolute';
        wrapper.style.top = this.getAttribute('top') || '100px';
        wrapper.style.left = this.getAttribute('left') || '100px';
        wrapper.style.width = '100px';
        wrapper.style.height = '100px';
        wrapper.style.perspective = '800px';
        wrapper.style.cursor = 'grab';

        const cube = document.createElement('div');
        cube.className = 'cube';

        for (let i = 1; i <= 6; i++) {
            const face = document.createElement('span');
            face.className = `face face${i}`;
            cube.appendChild(face);
        }

        wrapper.appendChild(cube);

        const style = document.createElement('style');
        style.textContent = `
      .cube {
        width: 100px;
        height: 100px;
        position: relative;
        transform-style: preserve-3d;
      }

      .cube.animate {
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
            isMoving = true;
            const rect = wrapper.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mouseup', () => {
            isMoving = false;
            document.body.style.userSelect = '';
        });

        document.addEventListener('mousemove', e => {
            if (!isMoving) return;
            wrapper.style.left = `${e.clientX - dragOffsetX}px`;
            wrapper.style.top = `${e.clientY - dragOffsetY}px`;
        });

        // Double-click for random color
        wrapper.addEventListener('dblclick', () => {
            const randColor = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}cc`;
            cube.querySelectorAll('.face').forEach(f => f.style.background = randColor);
        });

        // Global API
        window.cube = {
            start: () => {
                cube.classList.add('animate');
                return "Cube animation started";
            },
            stop: () => {
                cube.classList.remove('animate');
                return "Cube animation stopped";
            },
            color: (colorOrGradient) => {
                const isGradient = /^(linear|radial)-gradient\\(.+\\)$/i.test(colorOrGradient);
                const isHex = /^#([0-9A-Fa-f]{3,8})$/.test(colorOrGradient);
                if (!isGradient && !isHex) {
                    return "Invalid color format. Use #RRGGBB or CSS gradient.";
                }
                cube.querySelectorAll('.face').forEach(f => f.style.background = colorOrGradient);
                return `Cube faces color changed to ${colorOrGradient}`;
            },
            info: () => (
                "This is the ExoByte Core Cube Animation.\n\n" +
                "Controls:\n" +
                "- cube.start() → Start spinning\n" +
                "- cube.stop() → Stop spinning\n" +
                "- cube.color('#hex' or 'linear-gradient(...)') → Change face color\n" +
                "- Double-click → Random 80% opacity color\n" +
                "- Drag → Move the cube around the screen"
            )
        };

        // Autostart
        window.cube.start();
    }
}

customElements.define('rotating-cube', CubeElement);
