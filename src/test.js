import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import Stats from 'stats-js'

let scene; let renderer; let camera; let light; let creeperClass; let plane; let cameraControl; let statsUI

const animation = () => {
}

const render = () => {
    animation()
    requestAnimationFrame(render)
    cameraControl.update()
    statsUI.update() // 需設定 update 才會持續更新
    renderer.render(scene, camera)
}

const Creeper = class {
    constructor() {
        const headGeo = new THREE.BoxGeometry(4, 4, 4)
        const bodyGeo = new THREE.BoxGeometry(4, 8, 2)
        const footGeo = new THREE.BoxGeometry(2, 3, 2)

        const loader = new THREE.TextureLoader()
        // 苦力怕臉部貼圖
        const headMap = loader.load('https://dl.dropboxusercontent.com/s/bkqu0tty04epc46/creeper_face.png')

        // 苦力怕皮膚貼圖
        const skinMap = loader.load('https://dl.dropboxusercontent.com/s/eev6wxdxfmukkt8/creeper_skin.png')

        const skinMat = new THREE.MeshStandardMaterial({
            roughness: 0.3, // 粗糙度
            metalness: 0.8, // 金屬感
            transparent: true, // 透明與否
            opacity: 0.95, // 透明度
            side: THREE.DoubleSide, // 雙面材質
            map: skinMap, // 皮膚貼圖
        })

        const headMat = []
        for (let i = 0; i < 6; i += 1) {
            let map
            if (i === 4) map = headMap
            else map = skinMap
            headMat.push(new THREE.MeshStandardMaterial({ map }))
        }

        // const creeperMat = new THREE.MeshPhongMaterial({ color: 0x00ff00 })

        this.head = new THREE.Mesh(headGeo, headMat)
        this.head.position.set(0, 6, 0)
        this.head.rotation.y = Math.PI * 0.25

        this.body = new THREE.Mesh(bodyGeo, skinMat)
        this.body.position.set(0, 0, 0)

        this.foot1 = new THREE.Mesh(footGeo, skinMat)
        this.foot1.position.set(1.5, -5.5, 1.5)
        this.foot2 = new THREE.Mesh(footGeo, skinMat)
        this.foot2.position.set(1.5, -5.5, -1.5)
        this.foot3 = new THREE.Mesh(footGeo, skinMat)
        this.foot3.position.set(-1.5, -5.5, 1.5)
        this.foot4 = new THREE.Mesh(footGeo, skinMat)
        this.foot4.position.set(-1.5, -5.5, -1.5)
        this.feet = new THREE.Group()
        this.feet.add(this.foot1, this.foot2, this.foot3, this.foot4)

        this.creeper = new THREE.Group()
        this.creeper.add(this.head, this.body, this.feet)
    }
}

const createCreeper = () => {
    creeperClass = new Creeper()
    scene.add(creeperClass.creeper)
}

const createPlane = () => {
    const planeGeo = new THREE.PlaneGeometry(60, 60)
    const planeMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
    plane = new THREE.Mesh(planeGeo, planeMat)
    plane.position.set(0, -7, 0)
    // 使平面與 y 軸垂直，並讓正面朝上
    plane.rotation.x = -0.5 * Math.PI
    scene.add(plane)
}

const statsInit = () => {
    const stats = new Stats()
    stats.setMode(0) // FPS mode

    // 創建效能監控的div容器
    const div = document.createElement('div')
    div.id = 'stats'
    div.appendChild(stats.domElement)
    document.body.appendChild(div)

    return stats
}

const init = () => {
    scene = new THREE.Scene()
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xeeeeee, 1.0)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(60, 60, 60)
    camera.lookAt(scene.position)

    cameraControl = new THREE.OrbitControls(camera)
    cameraControl.enableDamping = true // 啟用阻尼效果
    cameraControl.dampingFactor = 0.25 // 阻尼系數
    cameraControl.autoRotate = true // 啟用自動旋轉

    light = new THREE.PointLight(0xffffff)
    light.position.set(20, 30, 20)
    scene.add(light)

    statsUI = statsInit() // 初始化

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    createCreeper()
    createPlane()

    const axes = new THREE.AxesHelper(40) // 參數為座標軸長度
    scene.add(axes)
}

window.onload = () => {
    init()
    render()
}
