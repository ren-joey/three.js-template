import * as THREE from 'three'

let scene, renderer, camera
let pointLight
let cube

const stageInit = function () {
  scene = new THREE.Scene()

  renderer = new THREE.WebGLRenderer()
  // stage size
  renderer.setSize(window.innerWidth, window.innerHeight)
  // default background color
  renderer.setClearColor(0xEEEEEE, 1.0)
  // shadow effect enabled
  renderer.shadowMap.enabled = true

  // binding the renderer on website
  document.body.appendChild(renderer.domElement)

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(10, 10, 10)
  camera.lookAt(scene.position)

  pointLight = new THREE.PointLight(0xFFFFFF)
  pointLight.position.set(10, 10, -10)
  scene.add(pointLight)

  const geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體
  const material = new THREE.MeshPhongMaterial({
    color: 0x0000FF
  }) // 材質
  cube = new THREE.Mesh(geometry, material) // 建立網格物件
  cube.position.set(0, 0, 0)
  scene.add(cube)
}

const animate = function () {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
}

const render = function () {
  animate()
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

export default function () {
  stageInit()
  render()
}

// 監聽螢幕寬高變化來做簡單 RWD 設定
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
