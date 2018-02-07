var camera, scene, renderer, renderermov;
var container, mesh, meshMov;
var video, image, imageContext,
imageReflection, imageReflectionContext, imageReflectionGradient,
texture, textureReflection;

var wolf = 'model/Wolf-Rigged-and-Game-Ready/Wolf_fbx.fbx';
var capoeira = 'model/Capoeira.fbx';
var minion = 'Minion_FBX1.fbx';
var box = 'assets/aaa.fbx'

init();
animate();

function init(){
    // container
    container = document.createElement('div');
    document.body.appendChild(container)

    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set(0, 0, 500);
    // camera.position.z = 1000;
    // camera.position.y = -90;    

    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x55f5f5 );

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // ambient light
    var ambient = new THREE.AmbientLight( 0x101030, 1.0);
    scene.add(ambient);

    light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
	light.position.set(0, 1, 0);
	scene.add(light);

    // spotlight
    var spotlight = new THREE.SpotLight( 0xffffff );
    spotlight.position.set(10,-10,10);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    spotlight.shadow.camera.near = 500; 
    spotlight.shadow.camera.far = 4000;
    spotlight.shadow.camera.fov = 30;
    scene.add(spotlight);
    
    // loader
    var loader = new THREE.FBXLoader();
    loader.load(
        // wolf,
        // capoeira,
        minion,
        // box,
        function(object){
            mesh = object;
            mesh.scale.set(5, 5, 5);
            mesh.rotation.x = (35*Math.PI) / 180 ;
            scene.add(mesh);
        }
    ) 

    video = document.createElement('video');
    video.width = 1920;
    video.height= 1080;
    video.loop = true;
    video.muted = true;
    video.src ="assets/BEI-uang-inflasi-movie/UANG _ INFLASI ASSET-09.mp4";
    video.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );
    video.play();
    
    texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    // var material   = new THREE.MeshBasicMaterial( { map : texture } );

    // plane movie 
    var planeGeometry = new THREE.PlaneBufferGeometry( 800, 450, 32 );
    var planeMaterial = new THREE.MeshBasicMaterial( { map : texture } );
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.set( 0, 0, -100);
    scene.add( plane );


    stats = new Stats();
    container.appendChild( stats.dom );

    // camera look at
    camera.lookAt(plane.position);

}

function render(){
    renderer.render(scene, camera);
}

function animate(){

    requestAnimationFrame(animate);
    render();
    stats.update();

}