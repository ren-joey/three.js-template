import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import Stats from 'stats-js'
import scene from './module/scene'
import Creeper from './module/creeper'

let camera; let renderer; let cameraControl; let statsUI
let pointLight; let sphereLightMesh; let rotateAngle = 0

// 點光源繞 Y 軸旋轉動畫
const pointLightAnimation = () => {
    if (rotateAngle > 2 * Math.PI) {
        rotateAngle = 0 // 超過 360 度後歸零
    } else {
        rotateAngle += 0.03 // 遞增角度
    }

    // 光源延橢圓軌道繞 Y 軸旋轉
    sphereLightMesh.position.x = 20 * Math.cos(rotateAngle)
    sphereLightMesh.position.z = 10 * Math.sin(rotateAngle)

    // 點光源位置與球體同步
    pointLight.position.copy(sphereLightMesh.position)
}

const render = () => {
    pointLightAnimation() // 自動更新
    requestAnimationFrame(render)
    statsUI.update()
    renderer.render(scene, camera)
}

const statsInit = () => {
    const stats = new Stats()
    stats.setMode(0) // FPS mode
    const div = document.createElement('div')
    div.id = 'stats'
    div.appendChild(stats.domElement)
    document.body.appendChild(div)
    return stats
}

const createCreeper = () => {
    const creeperObj = new Creeper()
    scene.add(creeperObj.creeper)
}

const resizeListener = () => {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })
}

const init = () => {
    // 相機設定與 OrbitControls
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    )
    camera.position.set(30, 30, 30)
    camera.lookAt(scene.position)

    // 建立 OrbitControls
    cameraControl = new OrbitControls(camera)
    cameraControl.enableDamping = true // 啟用阻尼效果
    cameraControl.dampingFactor = 0.25 // 阻尼系數
    // cameraControl.autoRotate = true    // 啟用自動旋轉

    statsUI = statsInit() // 初始化

    // 三軸座標輔助
    const axes = new THREE.AxesHelper(20)
    scene.add(axes)

    // 渲染器設定
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = 2 // THREE.PCFSoftShadowMap

    // 簡單的地板
    const planeGeometry = new THREE.PlaneGeometry(60, 60)
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI // 將平面「沿著 x 軸正方向逆時針轉 90 度」。
    plane.position.set(0, -7, 0)
    plane.receiveShadow = true
    scene.add(plane)

    // 產生苦力怕物件並加到場景
    createCreeper()

    // 設置環境光提供輔助柔和白光
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    // 設置聚光燈幫忙照亮物體
    const spotLight = new THREE.SpotLight(0xf0f0f0)
    spotLight.position.set(-10, 30, 20)
    spotLight.castShadow = true
    scene.add(spotLight)

    // 移動點光源
    pointLight = new THREE.PointLight(0xccffcc, 1, 100) // 顏色, 強度, 距離
    pointLight.castShadow = true // 投影
    scene.add(pointLight)

    // 小球體模擬點光源實體
    const sphereLightGeo = new THREE.SphereGeometry(0.5)
    const sphereLightMat = new THREE.MeshBasicMaterial({ color: 0xccffcc })
    sphereLightMesh = new THREE.Mesh(sphereLightGeo, sphereLightMat)
    sphereLightMesh.castShadow = true
    sphereLightMesh.position.y = 30
    scene.add(sphereLightMesh)

    // 將渲染出來的畫面放到網頁上的 DOM
    document.body.appendChild(renderer.domElement)
}

export default function () {
    resizeListener()
    init()
    render()
}
