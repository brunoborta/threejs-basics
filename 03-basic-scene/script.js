// Basic Scene
const scene = new THREE.Scene();

// Objetos chamados de Meshes. Um Mesh é a junção de uma
//forma geometrica (que é formado por pontos) e um material
//que dará aspectos/cor/reação a luz daquela forma

// Criando a geometria e o material do Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Criando o cubo
const cube = new THREE.Mesh(geometry, material);

// Adicionando o cubo para a cena
scene.add(cube);

// Para que apareça algo na tela, é necessário que haja uma
//camera, que terá um POV que nós conseguimos ver as coisas
// Os parametros para uma camera são o field of view (que é
//basicamente o angulo de amplitude da camera) e o aspect ratio
const sizes = {
    width: 1920,
    height: 1080,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
/**
 * Isso é bastante importante. Se não reposicionarmos a camera,
 * os objetos são renderizados no mesmo lugar por default.
 * Também é importante dizer que o eixo x e y são os eixos horizontal
 * e vertical, como conhecemos e o z, por default, fica em direção
 * do observador. Dessa forma, setando z pra 3, estamos afastando
 * um pouco a camera do cubo.
 */
camera.position.z = 3;
camera.position.x = 2;
camera.position.y = 1;
scene.add(camera);



// Ao final, deve-se renderizar a cena. Isso fará com que
//a cena apareça pelos olhos da câmera. Isso será renderizado
//num canvas do HTML
const canvas = document.querySelector('.webgl');

// Agora que já temos o elemento da DOM para isso, renderizamos
//a cena. Passamos onde será renderizado (canvas), o tamanho da tela
//(sizes)
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Finalmente, renderizamos a cena
renderer.render(scene, camera);