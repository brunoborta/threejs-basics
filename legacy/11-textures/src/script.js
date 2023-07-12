import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */

// const image = new Image();
// const texture = new THREE.Texture(image);

// image.src = "/textures/door/color.jpg";
// image.onload = () => {
//     //Texture has a needsUpdate that re-renders the texture when
//     //needed
//     texture.needsUpdate = true;
// }
    
// This simplifies a whole lot :D
// Plus, a textureLoader can load multiple textures
//Also, TextureLoader accept a load, progress and error functions
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load(
//     '/textures/door/color.jpg',
//     () => {
//         console.log('load');
//     },
//     () => {
//         console.log('progress');
//     },
//     () => {
//         console.log('error');
//     }
// );

// LoadingManager is a tool to manage all the loadings
//in the page. Image you have a loading for images,
//fonts, textures, a lot of stuff. This guy handles everything
//at once. Of course, it comes before the other loaders
const loadingManager = new THREE.LoadingManager();

// LoadingManager has a onStart that receives a function
//as well as onLoad, onProgress and onError
// loadingManager.onStart = () => console.log('onStart');
// loadingManager.onLoad = () => console.log('onLoad');
// loadingManager.onProgress = () => console.log('onProgress');
// loadingManager.onError = () => console.log('onError');

const textureLoader = new THREE.TextureLoader(loadingManager);

// Let's add more textures lol
const colorTexture = textureLoader.load('/textures/door/color.jpg');
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
// const heightTexture = textureLoader.load('/textures/door/height.jpg');
// const normalTexture = textureLoader.load('/textures/door/normal.jpg');
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// By default, the texture doesn't repeat. The last pixel
//get stretched if you add more to x/y
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;

// To fix this, we can add a wrapping
// No idea why it is wrapS and wrapT
// This will make our y showing 3 doors and
//our x to have 2 doors
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// If you want to mirror the texture, MirroredRepeatWrapping
//is a solution
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// We can also add offsets to the texture
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// We can also rotate the texture itself. It's
//in radians
colorTexture.rotation = Math.PI / 4;

// Usually, the pivot point (the base point for a rotation)
// is a (0, 0). You can control the pivot center as well
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;

// Another thing to keep in mind is minify and magnify filters
// They change the way an object is rendered depending on
//the size of the texture and the size of the geometry
// Some filters get sharp, some get smoother, but it's
//a metter of taste. Don't forget that they exist

colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter

// Also there's an algorithm that generates smaller versions
//of the models called mip mapping. for NearestFilter,
//we don't need them, but usually, it's better to have it
colorTexture.generateMipmaps = false;

/**
 * Weight, Size and Data
 */
// Don't forget to be careful about the weight of the file.
//USE TINYPNG/TINYJPG

// The size is related to the resolution. The size should be
//always in a power of 2 because of mip mapping
//creating multiple maps of the texture dividing by 2 everytime
// If you don't do it, Three.js resize to a power of 2 and
//do it anyway ;D

// Textures supports transparency. If you have alpha and
//color textures, maybe you should use only one .png
// Using masks with red, green, blue, alpha channels to 
//have a better performance

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

// Other geometriesssssss

const geometry = new THREE.BoxGeometry(1, 1, 1)
// const geometry = new THREE.SphereBufferGeometry(1, 32, 32)
// const geometry = new THREE.ConeBufferGeometry(1, 1, 32)
// const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32, 100);
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Let's talk about UV wrapping. UV Wrapping is
//like wrapping something. It's an origami before
//it is a airplane, or frog or whatever.
// We usually have a squared/retangular paper on a plane
//the same way we have a crosslike paper shape for a die
// We have a UV attribute in each geometry
console.log(geometry.attributes.uv);

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
camera.position.z = 1
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