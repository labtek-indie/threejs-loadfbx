var camera, scene, renderer;
var container;

init();

function init(){
    // container
    container = document.createElement('div');
    document.body.appendChild(container)

    // camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set(0, 40, 50);

    // scene
    scene = new THREE.Scene();

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
    var ambient = new THREE.AmbientLight( 0x101030);
    scene.add(ambient);

    // camera look at
    camera.lookAt(plane.position);

    // loader
    var loader = new THREE.FBXLoader();
    loader.load(
        'model/Wolf-Rigged-and-Game-Ready/Wolf_fbx.fbx',
        function(object){
            object.scale.set(0.5, 0.5, 0.5);
            scene.add(object)
        }
    )
}

function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);

}