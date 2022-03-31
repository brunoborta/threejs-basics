import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', event => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
})


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Perspective Camera
// The first value is the Field of View (FOV)
//This is the vertical field of a camera. 75 is quite a lot
//Simon recommends something between 45 and 75

// The second param is the aspect ratio, so the width / height

// The last params are the near and far params. They represent
//how close and how far the camera can see, so if we have an object closer than
//the near param or further than the far param, it will not show up.

// It is important to not get super extreme to prevent z-fighting glitch
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// Orthographic Camera
// The idea is that this camera don't have a perspective, so we have a big screen
//(not a cone) and things will not change size being far or close.
// If the camera is a square (-1, 1, 1, -1, on left, right, top, bottom)
//and the rendering is not, the object will be squized, like a box instead of cube
//To fix that, let's use the aspect ratio
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
console.log(camera.position.length());
camera.lookAt(mesh.position)
scene.add(camera)

// Controls

// Orbit Controls needs a camera and the DOM Element
const controls = new OrbitControls(camera, canvas);
// Dumping
// The controls need to update on each frame
// (Continue on the update section)
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update the camera to mouse moving
    // To be able to make a full revolution (☭) we need to use the
    //x and z axes (left, right and front, back).
    //If we make them using the cursor x, we can use it to rotate them
    //with sin and cos. PI * 2 is a full circle
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = -cursor.y * 5;
    // camera.lookAt(mesh.position);

    // We will use orbit controls to control the cube. This way, we don't have to
    //handle by itself


    // So the Dumping needs to be updating
    controls.update();


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()