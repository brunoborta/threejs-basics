import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import * as dat from 'dat.gui';

/**
 * Debug
 */

const gui = new dat.GUI();

/**
 * Environment
 */
const cubeTextureLoader = new THREE.CubeTextureLoader();

// You have to provider positive X, negative X. Then Y, then z
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
]);


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const matcapTexture = textureLoader.load('/textures/matcaps/1.png');
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg');
// For the gradient on toonMaterial work fine, we will
//remove the mipmapping on the gradient
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial();

// Normals create a material in colors of blue, green, purple
//and looks great! It is used to see errors and shit
// const material = new THREE.MeshNormalMaterial();

// The matcap takes a texture and apply the colors of that
//texture related to the normals of the image. It is
//pretty complicated
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// This one gets white when the camera is close to the
// object and dark if the camera is far
// const material = new THREE.MeshDepthMaterial();

// The simplest one that reacts to light!
// const material = new THREE.MeshLambertMaterial();

// Phong react to light, and it has a reflection of the
//light on the material. It is not as performant as Lambert
//but it is ok :D
// const material = new THREE.MeshPhongMaterial();
// It has a property called shininess that show how much
// the reflection shines. The specular is the color of the
//shininess
// material.shininess = 1000;
// material.specular.set('blue')

// Here is a cartoonish material that also reacts
//to light. Also, it can use a gradient. Beware with the size
//of it. If it is too small as the one we are using here
//the mipmapping will try to fix it, and we will lose
//the toonish part. It will look like a MeshLambertMaterial
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// And the most important one:
// This one uses a better algorithm for realism.
//Also, it supports light of course. And have some
//better parameters for roughness and metalness.
// Standard Material uses physically based rendering (PBR)

// const material = new THREE.MeshStandardMaterial();
// material.map = doorColorTexture;
// The ambient Occlusion will darken some parts. The idea
//is another layer to make the details more visible
// material.aoMap = ambientOcclusionTexture

// The displacement map will give height to the model
//It uses the the amount of vertices to make it height
// This will make the door have some depth. It uses the white to
//pop up, the gray to stay at the same plane and the black to ignore
// material.displacementMap = heightTexture;
// material.roughness = 0.45;
// material.metalness = 0.45;
// The displacement scale is the actual scale of the height
// material.displacementScale = 0.1;

// The metalnessMap and roughnessMap works exactly the same way
// In the end, we will have a lot of layers to create a door.
// This will create some extra textures on the door
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;

// Finally, the normal will give some crazy details. Trust me.
// material.normalMap = normalTexture;

// Here, the alpha map to remove everything in the model that it is
//not "a door". The black part will be removed, and
//the white will be shown. Remember that alpha can only be used
//with transparent = true
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// This mesh is the MeshPhysicalMaterial. It is basically
//equal to the stardard, but with a fine coat of brightness to make
//it shine. This is not as performant, but it is really realistic.
//use at your own risk :D
// const material = new THREE.MeshPhysicalMaterial();

// PointsMaterial is to create particles! More next ;D

// ShaderMaterial and RawShaderMaterial. This will be seen in the future
//but it is used to create your own materials

// Environment Map is used to create a environment to the scene <3
// We are going to use standardMaterial for this. Three.js only uses
//cubes to create environments (don't ask why)
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.2;
material.metalness = 0.7;
material.envMap = environmentMapTexture;

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001);
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001);


// Another way of adding a texture
// material.map = doorColorTexture;
// About colors: Remember:
// Three.js uses a instance of Three.Color() to hold the
//value. You will have to use it in order to reset it
//like this:
// material.color = new THREE.Color('red');
// Or you can use set to add a color as normal
// material.color.set('green');

// material.wireframe = true;

// Opacity and alphaMap just work 
//in conjuntion with transparent attribute
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;

// the Alpha Map for the door, will show only one door now :D

// The plane just shows 1 side (the back side doesn't appear)
// That's because the side of a material is default to 
//FrontSide. To show only the back side there's the
//BackSide. And show both, we have DoubleSide. Be careful
//when using DoubleSide. GPU has to do a lot of calculations
//to use this one
// material.side = THREE.DoubleSide;

// This is awesome
// material.flatShading = true;

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
);

sphere.position.x = -1.5;

sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(
        sphere.geometry.attributes.uv.array,
        2
    )
);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
);

plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(
        plane.geometry.attributes.uv.array,
        2
    )
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.2, 64, 128),
    material
);

torus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(
        torus.geometry.attributes.uv.array,
        2
    )
);


torus.position.x = 1.5;


// Scene
const scene = new THREE.Scene()

scene.add(sphere, plane, torus);

/**
 * Lights, because why not?
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(ambientLight, pointLight);
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
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    plane.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()