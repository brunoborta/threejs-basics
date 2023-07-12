import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// Mesh inherits from Object3D, so it has
// * position (with x, y, z)
// * scale(with x, y, z)
// * rotation (with x, y, z)
// * quaternion (which is a type of rotation)

// Position - Vector3
// You can add this after adding to a scene, but before
//the rendering
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;

//You can use set to set positions like that:
mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);

//Rotation - Euler
// It's like putting a stick inside the object and rotate

//Changing the order of the rotation change the way an object
//ends. We can use rotation.reorder() to set an order
// mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25; //PI is half rotation
mesh.rotation.y = Math.PI * 0.25;




scene.add(mesh)

// The length of a position gives the distance between
//the position and the center of the scene
console.log(mesh.position.length())

// Normalize a position is reducing it to 1
// mesh.position.normalize();
// console.log(mesh.position.length());


//AXES HELPER
//It will draw all the axes. The parameter is the
//length of the helper. 1 is default
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1

// Look at a Vector3 object of the scene
// camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.lookAt(mesh.position)

scene.add(camera)

// To get the distance of another object, let say the camera:
console.log(mesh.position.distanceTo(camera.position));


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)