var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
material = new THREE.MeshLambertMaterial(
    {
        color: 0xCC0000
    });

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.set(3,5,10);
camera.lookAt(new THREE.Vector3(0,0,0))


var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(10, 50, 130);
scene.add(pointLight);

axes = buildAxes(10);
scene.add(axes);

// render loop
function render() {
    requestAnimationFrame(render);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
render();

function buildAxes(length) {
  var axes = new THREE.Object3D();

  axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(length, 0, 0), 0xff725c, false)); // +X
  axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(-length, 0, 0), 0xe7040f, false)); // -X

  axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(0, length, 0), 0x137752, false)); // +Y
  axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(0, -length, 0), 0x9eebcf, false)); // -Y

  axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(0, 0, length), 0x001b44, false)); // +Z
  axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3( 0, 0, -length), 0x96ccff, false)); // -Z

  return axes;
}

function buildAxis(src, dest, colorHex, dashed) {
  var geom = new THREE.Geometry();
  var mat;

  if (dashed) {
    mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize:3 });
  } else {
    mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
  }

  geom.vertices.push(src.clone());
  geom.vertices.push(dest.clone());
  geom.computeLineDistances();

  var axis = new THREE.Line(geom, mat, THREE.LinePices);
  return axis;
}