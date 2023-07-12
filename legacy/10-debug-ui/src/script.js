import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui';

/**
 * Debug
 */
const gui = new dat.GUI({ width: 400 });

const params = {
    color: 0xff0000,
    spin: () => {
        // What I am doing is adding always 2*PI to the y axis
        // If I set a static value to y, it will work only once
        // because as soon as the mesh goes to that position,
        //it will not animate. It's already on that position
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }
}

// Changing colors is not that straight forward.
// We need to make change function in order to update the color
gui.addColor(params, 'color')
    .onChange(() => {
        material.color.set(params.color);
    });

gui.add(params, 'spin');
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: params.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Debugging...
// The add method expect an object, a name in the GUI
//The minimum, a maximum and the precision (step)
// gui.add(mesh.position, 'x', -3, 3, 0.01);
// gui.add(mesh.position, 'y', -3, 3, 0.01);
// gui.add(mesh.position, 'z', -3, 3, 0.01);

// Another way...
gui.add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('Red Cube Y');

gui.add(mesh, 'visible');

gui.add(material, 'wireframe');

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
camera.position.z = 3
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