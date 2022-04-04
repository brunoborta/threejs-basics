import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1)

// Float32Array is the type that can be converted
//to a BufferAttribute (that Three.js handles) to create
//geometries. It is a typed array with fixed length
// The 9 positions is for each vertex of the geometry
// const positionsArray = new Float32Array(9);

// // First vertices
// positionsArray[0] = 0; //x
// positionsArray[1] = 0; //y
// positionsArray[2] = 0; //z

// positionsArray[3] = 0;
// positionsArray[4] = 1;
// positionsArray[5] = 0;

// positionsArray[6] = 1;
// positionsArray[7] = 0;
// positionsArray[8] = 0;



//Another way to do it would be:
// const positionsArray = new Float32Array([
//      0, 0, 0,
//      0, 1, 0,
//      1, 0, 0,
// ]);

// 50 triangles. Each triangle has 3 vertices and each
//vertice has 3 values
// const count = 10;
// const positionsArray = new Float32Array(count * 3 * 3);

// for(let i = 0; i < count * 3 * 3; i++) {
//     positionsArray[i] = Math.random() - 0.5;
// }


// By using the BufferAttribute, we can set how many positions
//of the array we are using to create one face. In this example, 3
// const positionsAttribute = new THREE.BufferAttribute(positionsArray,  3);


// const geometry = new THREE.BufferGeometry();
// Position is the name of the attribute needed by the
//Three.js shaders. It can't be another thing. 
// Another thing worth mention is that BufferGeometry
//can be more performant if you have indexes to vertices
//that are used by multiple triangles. (read docs)
// geometry.setAttribute('position', positionsAttribute);

// The wireframe attribute shows the triagles of the 
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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