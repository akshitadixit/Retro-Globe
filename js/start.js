//akshitadixit@github.com
import { OrbitControls } from "./OrbitControls.js";
import { Points } from "./three.module.js";

const radius = 6;
const text = "Akshita Dixit";
var images = ["images/akshay.jpg", "images/amir.jpg", "images/amitabh.jpg", "images/devanand.jpg", "images/dharmendra.jpg", "images/dilip kumar.jpg", "images/govinda.jpg", "images/jitendra.jpg", "images/kishore kumar.jpg", "images/manoj kumar.jpg", "images/mithun.jpg", "images/raj kapoor.jpg", "images/rajendra-kumar.jpg", "images/rajesh khanna.jpg", "images/rishi kapoor.jpg", "images/ritik roshan.jpg", "images/salman.jpg", "images/Shashi_Kapoor.png", "images/srk.jpg", "images/sunny deol.jpg"
]

const sounds = ["songs/akshay.mp3", "songs/amir.mp3", "songs/amitabh.mp3", "songs/devanand.mp3", "songs/dharmendra.mp3", "songs/dilip kumar.mp3", "songs/govinda.mp3", "songs/jitendra.mp3", "songs/kishore kumar.mp3", "songs/manoj kumar.mp3", "songs/mithun.mp3", "songs/raj kapoor.mp3", "songs/rajendra kumar.mp3", "songs/rajesh khanna.mp3", "songs/rishi kapoor.mp3", "songs/ritik.mp3", "songs/salman.mp3", "songs/shashi kapoor.mp3", "songs/srk.mp3", "songs/sunny deol.mp3"];

//loading
const textureloader = new THREE.TextureLoader();
//const map = textureloader.load();


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 30000 );

const group = new THREE.Group();

/*

We no more need the WebGL renderer and now using the CSS 3D renderer
*/
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
/*
const renderer = new CSS3DRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('cards').appendChild( renderer.domElement );
*/
const geometry2 = new THREE.SphereBufferGeometry(radius, 64, 64);
const material2 = new THREE.MeshLambertMaterial({ color: 0x00ff });
material2.shininess = 500;

const geometry3 = new THREE.SphereBufferGeometry(radius+0.5, 64, 64);
const material3 = new THREE.MeshPhongMaterial({ color: 0x00ff });
material2.shininess = 500;

const sphere2 = new THREE.Mesh(geometry2, material2);
//group.add(sphere2);
scene.add(sphere2);
const sphere3 = new THREE.Mesh(geometry3, material3);
scene.add(sphere3);

const geometry = new THREE.SphereBufferGeometry(7.5, 8, 520);
const material = new THREE.PointsMaterial({ color: 0x00ffc2 });
material.size = 0.1;

const sphere = new THREE.Points( geometry, material );
scene.add(sphere);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.08));

var light1 = new THREE.PointLight(0xffffff, 1.75);
light1.position.set(2, 1, -0.5)
camera.add(light1)

var light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(10,1,1);
camera.add(light2);
scene.add(camera)//since the camera now has children

camera.position.z = 15;

// controls

const controls = new OrbitControls(camera, renderer.domElement);
//controls.minPolarAngle = Math.PI/2;
//controls.maxPolarAngle = Math.PI/2;
controls.update();

const animate = function () {
    requestAnimationFrame( animate );

    group.rotation.x += 0.0005;
    group.rotation.y += 0.0005;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    controls.update();
    renderer.render( scene, camera );
};


/*let mesh = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.1, 20, 20),
    new THREE.MeshBasicMaterial({color:0xff0000})
)

mesh.position.set(0, 0, 2.6);
scene.add(mesh);

mesh.position.set(0, 2.6, 0);
scene.add(mesh);*/

class mine{
    constructor(x, y, z, n) {
        x = (radius+0.5) * x;
        y = (radius+0.5) * y;
        z = (radius + 0.5
        ) * z;
        var m = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ map: textureloader.load(images[n])})
        )
        m.position.set(x, y, z);
        this.mesh = m;
    }
}

function generateRandom(max, min) {
    return Math.random() * (max - min) + min;
}

function getCoordinates(lat, long) {
    lat = lat * Math.PI / 180 -lat;
    long = long * Math.PI / 180;

    return [Math.cos(long) * Math.sin(lat), Math.sin(long) * Math.sin(lat), Math.cos(lat)];
}

function coord(x) {
    var c = getCoordinates(generateRandom(89.9999, -89.9999), generateRandom(179.9999, -179.9999));
    c = new mine(c[0], c[1], c[2], x).mesh;
    return c;
}

var points = [];

function placeCoordinates(n) {
    for (let x = 0; x < n; x++){
        points.push(coord(x));
        scene.add(points[x]);
    }
}

placeCoordinates(images.length);
//scene.add(group);

/*
Adding cards for the points' images, let's see how far we go ;)

<div class="card">
    <img class="card-img" src="">
    <div class="card-img-overlay text-white d-flex flex-column justify-content-center">
        <h4 class="card-title">Bologna</h4>
        <h6 class="card-subtitle mb-2">Emilia-Romagna Region, Italy</h6>
    </div>
</div>

const objectCSS = new CSS3DObject( element );

*/

console.table(group);

animate();

const listener = new THREE.AudioListener();
camera.add( listener );
// create a global audio source
const sound = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();

function compare_uuid(given) {
    for (let i = 0; i < points.length; i++){
        let temp = points[i].uuid;
        if (temp == given)
            return i;
    }
    return -1;
}

function playsoundclick(n) {
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);
    
    for (let i = 0; i < intersects.length; i++) {
        var res = compare_uuid(intersects[i].object.uuid);
        if (res != -1) {                
            if (sound.isPlaying) {
                sound.stop();
            }
            audioLoader.load( sounds[res], function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 1 );
                sound.play();
            });
        }
    }
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function winResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function playsoundtouch(event) {
    event.preventDefault();
    if (sound.isPlaying) {
        sound.stop();
    }
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);
    
    for (let i = 0; i < intersects.length; i++) {
        var res = compare_uuid(intersects[i].object.uuid);
        if (res != -1) {                
            audioLoader.load( sounds[res], function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 1 );
                sound.play();
            });
        }
    }
}

renderer.setPixelRatio(window.devicePixelRatio);
window.addEventListener('resize', winResize);
window.addEventListener('click', playsoundclick);
window.addEventListener( 'mousemove', onMouseMove, false );
//window.addEventListener('touchmove', onTouchMove);
window.addEventListener('touchend', playsoundtouch, false);
window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
