var camera, scene, renderer;
var container, mesh;

var wolf = 'model/Wolf-Rigged-and-Game-Ready/Wolf_fbx.fbx';
var capoeira = 'model/Capoeira.fbx';
var minion = 'Minion_FBX1.fbx';
var box = 'assets/aaa.fbx'

init();
render();

function init(){
    // container
    container = document.createElement('div');
    document.body.appendChild(container)

    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set(0, -90, 0);
    camera.position.z = 1000;
    // camera.position.y = -90;    

    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x55f5f5 );


    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // plane ground 
    var planeGeometry = new THREE.PlaneBufferGeometry( 10, 20, 32 );
    var planeMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00} );
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.set( 0, 0, -1);
    scene.add( plane );

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

    // camera look at
    camera.lookAt(plane.position);

    // loader
    var loader = new THREE.FBXLoader();
    loader.load(
        // wolf,
        // capoeira,
        minion,
        // box,
        function(object){
            mesh = object;
            mesh.scale.set(20, 20, 20);
            // mesh.scale.set(1, 1, 1);
            mesh.rotation.x = 0;
            scene.add(mesh);
        }
    )

    // texture loader
    // var textureLoader = new THREE.TextureLoader();
    // textureLoader.setCrossOrigin("anonymous");
    // textureLoader.load('Textures/jeans_texture.jpg', function (texture) {
    //     // mesh is a group contains multiple sub-objects. Traverse and apply texture to all. 
    //     mesh.traverse(function (child) {
    //         if (child instanceof THREE.Mesh) {

    //         // apply texture
    //         child.material.map = texture
    //         child.material.needsUpdate = true;
    //         }
    //     });
    // });
}

function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}