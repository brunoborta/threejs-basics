import './style.css'
import * as THREE from 'three'
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// let time = Date.now();

const clock = new THREE.Clock();

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

// Animation!

const tick = () => {

    // Rotation is directly related to the FPS of the
    // users computer. If the computer is faster,
    // the rotation will be faster. Period.
    
    // One way to fix this, is using time to make the animation
    // const currentTime = Date.now();

    // Delta is the difference between the time we started
    //the app and the time it's running every tick
    // const deltaTime = currentTime - time;

    // Clock also has a clock.getDelta() method, but it is messy
    //and should not be used lol

    // console.log(deltaTime);
    
    // Update for the next tick
    // time = currentTime;

    // Another way to do the same thing is using the Clock
    //of Threejs

    // Clock initiates at 0
    const elapsedTime = clock.getElapsedTime();


    // mesh.rotation.y += 0.001 * deltaTime;
    // mesh.rotation.y = elapsedTime;
    // mesh.rotation.y = elapsedTime * Math.PI * 2;

    // And to fuck up with my mind, why not using sin and cos?
    // mesh.position.y = Math.sin(elapsedTime);
    // mesh.position.x = Math.cos(elapsedTime);

    // Of course, we can make the camera work :D
    camera.position.y = Math.sin(elapsedTime);
    camera.position.x = Math.cos(elapsedTime);

    // Yeah. That's fucked up
    camera.lookAt(mesh.position);


    // Update objects!
    renderer.render(scene, camera)
    
    
    window.requestAnimationFrame(tick);
}

tick();