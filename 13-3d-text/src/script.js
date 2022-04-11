import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Axis Helper
 */
const axesHelper = new THREE.AxesHelper();

// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/8.png');

/**
 * Fonts
 */
const fontLoader = new FontLoader();
// FontLoader doesn't return the font you are using
fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    font => { 
        const textGeometry = new TextGeometry(
            'Bruno Bortagaray', {
                font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4,
            }
        );
        // One aspect that we have to be sure is that Three.js
        //calculate the objects that are in the screen. The
        //algorithm it uses is called Frustum Culling. We will
        //use this to center the geometry. By default, Three.js
        //uses sphere bouding. We will change to the box one
        textGeometry.computeBoundingBox();
        console.log(textGeometry.boundingBox);
        // This shows an object with the min and max
        //vertice and we can manipulate this attributes

        // After changing the geometry to be centered
        //(geometry / 2), it is not COMPLETELY
        //align because of the bevel
        // textGeometry.translate(
        //     - textGeometry.boundingBox.max.x * 0.5,
        //     - textGeometry.boundingBox.max.y * 0.5,
        //     - textGeometry.boundingBox.max.z * 0.5
        // );

        // To align and be sure it's centered, we can
        //remove the bevelSize to x and y, and the
        //bevelThickness to the z axis
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // );

        // Of course, there's a simpler way. kkk
        textGeometry.center();

        // const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
        const textMesh = new THREE.Mesh(textGeometry, material);
        scene.add(textMesh);

        console.time('donuts');

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        for(let i = 0; i < 250; i++) {
            const donutOrCube = Math.random();
            let geometry;
            if(donutOrCube >= 0.5) {
                geometry = new THREE.Mesh(donutGeometry, material);
            } else {
                geometry = new THREE.Mesh(boxGeometry, material);
            }
            // Math.random gives a value between 0 and 1. By
            //setting the value -0.5, we changed the range
            //to start at -0.5 and go until +0.5.
            // Multiplying it by 10, gives as a random
            //number starting from -5 to 5 :D
            geometry.position.x = (Math.random() - 0.5) * 20;
            geometry.position.y = (Math.random() - 0.5) * 20;
            geometry.position.z = (Math.random() - 0.5) * 20;

            // Here it is just a rotation of the donut
            //remember: It's in radients
            geometry.rotation.x = Math.random() * Math.PI;
            geometry.rotation.y = Math.random() * Math.PI;

            // To create them in different sizes, we can
            //scale them. The only trick we need to do
            //is be sure we scale to the same number
            const scale = Math.random();
            //donut.scale.x = scale;
            //donut.scale.y = scale;
            //donut.scale.z = scale;
            geometry.scale.set(scale, scale, scale);

            scene.add(geometry);
        }

        console.timeEnd('donuts');
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()