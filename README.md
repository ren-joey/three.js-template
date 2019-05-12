# Three.js 基礎建構

[![document](https://img.shields.io/static/v1.svg?label=參考資料&message=Three.js%20IT鐵人賽-當個創世神系列文章&color=blue)](https://ithelp.ithome.com.tw/users/20107572/ironman/1782)

###### 相關依賴 `three.js` `three-orbitcontrols` `stats-js`

---

## 實作範例
**小遊戲範例**
[https://tympanus.net/Tutorials/TheAviator/](https://tympanus.net/Tutorials/TheAviator/)
![img](https://dl.dropboxusercontent.com/s/i4bto9vvidke5tk/day02_ExampleGame2.png)

**形象官網範例**
[http://campoallecomete.it](http://campoallecomete.it)
![img](https://dl.dropboxusercontent.com/s/sto00kii9bec1bk/day02_ExampleCollection2.png)

**視覺藝術範例**
[http://lab.samsy.ninja/](http://lab.samsy.ninja/)
![img](https://dl.dropboxusercontent.com/s/8206ctma94hy5rv/day02_ExampleArt.png)

**相容性**
![img](https://dl.dropboxusercontent.com/s/4w0pvvwm657a5tf/day02_CanIUse.png)

你也可以[從這裡](https://get.webgl.org/)測試瀏覽器對 webGL 的支援性

---

## Three.js 基本元素

- 場景（Scene）：供其他元素設置的空間。
- 相機（Camera）：在場景中建立觀察點，並確定觀察方向、角度。
    - 透視投影相機 (PerspectiveCamera)
    - 正交投影相機 (OrthographicCamera)
- 物體（Objects）：在場景中添加被觀察的物體。
    - 網格模型 (Mesh)，其組成又包含
        - 幾何體（Geometry）
        - 材質（Material）
    - 粒子模型 (Points)
- 光源（Light）：在場景中用來照亮物體的光。
    - 環境光（AmbientLight）
    - 點光源（PointLight）
    - 聚光燈（SpotLight）
    - 方向光（DirectionalLight）
    - 半球光（HemisphereLight）
- 渲染器（Renderer）：將所要呈現的場景渲染到畫面上。

採用右手座標定位
![img](https://upload.wikimedia.org/wikipedia/commons/b/b2/3D_Cartesian_Coodinate_Handedness.jpg)

---

## Hello Wrold! 場景初始化

[![document](https://img.shields.io/static/v1.svg?label=參考資料&message=(03)Hello%20Three.js!&color=blue)](https://ithelp.ithome.com.tw/articles/10199702)

引入參數
```javascript
    import * as THREE from 'three'
```

建立場景
```javascript
let scene

const init = () => {
    scene = new THREE.Scene()
}
```

建立渲染器
```javascript
let renderer

const init = () => {
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
    renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
    renderer.shadowMap.enable = true // 陰影效果

    // 將渲染器的 DOM 綁到網頁上
    document.body.appendChild(renderer.domElement)
}
```

建立相機
```javascript
let camera

const init = () => {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(10, 10, 10)
    camera.lookAt(scene.position)
}
```

建立光源
```javascript
let light

const init = () => {
    light = new THREE.PointLight(0xffffff)
    light.position.set(10, 10, -10)
    scene.add(light)
}
```

建物物體
```javascript
let geometry; let material; let cube

const init = () {
    // 宣告形狀
    geometry = new THREE.BoxGeometry(1, 1, 1)
    // 宣告材質
    material = new THREE.MeshPhongMaterial({ color: 0x0000ff })
    // 建立網格物件，並傳入前面宣告好的形狀跟材質
    cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 0, 0)
    scene.add(cube)
}
```

建立 RWD 監聽事件
```javascript
const init = () => {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })
}
```

建立動畫
```javascript
const animation = () => {
    cube.rotation.x += 0.1
    cube.rotation.y += 0.1
}
```

渲染方法
```javascript
const render = () => {
    animation()
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}
```
> requestAnimationFrame 是 HTML5 中瀏覽器提供的一個為動畫而生的接口，它能讓畫面盡可能平滑、高效地進行重新渲染，還有效節省 CPU、GPU 資源，所以一般在 Three.js 會透過它來幫忙重新渲染場景。

在頁面讀取完成後啟動
```javascript
window.onload = () => {
    init()
    render()
}
```

---

## 繪製 Creeper

[![document](https://img.shields.io/static/v1.svg?label=參考資料&message=(05)專案實作%202%20-%20基本人物模型&color=blue)](https://ithelp.ithome.com.tw/articles/10200287)

建立 Creeper 類別
```javascript
const Creeper = class {
    constructor () {
        // 宣告頭、身體、腳幾何體大小
        const headGeo = new THREE.BoxGeometry(4, 4, 4)
        const bodyGeo = new THREE.BoxGeometry(4, 8, 2)
        const footGeo = new THREE.BoxGeometry(2, 3, 2)

        // 馮氏材質設為綠色
        const creeperMat = new THREE.MeshPhongMaterial({ color: 0x00ff00 })

        // 頭
        this.head = new THREE.Mesh(headGeo, creeperMat)
        this.head.position.set(0, 6, 0)

        // 身體
        this.body = new THREE.Mesh(bodyGeo, creeperMat)
        this.body.position.set(0, 0, 0)

        // 四隻腳
        this.foot1 = new THREE.Mesh(footGeo, creeperMat)
        this.foot1.position.set(1.5, -5.5, 1.5)
        this.foot2 = new THREE.Mesh(footGeo, creeperMat)
        this.foot2.position.set(1.5, -5.5, -1.5)
        this.foot3 = new THREE.Mesh(footGeo, creeperMat)
        this.foot3.position.set(-1.5, -5.5, 1.5)
        this.foot4 = new THREE.Mesh(footGeo, creeperMat)
        this.foot4.position.set(-1.5, -5.5, -1.5)

        // 將四隻腳組合為一個 group
        this.feet = new THREE.Group()
        this.feet.add(this.foot1, this.foot2, this.foot3, this.foot4)

        // 將頭、身體、腳組合為一個 group
        this.creeper = new THREE.Group()
        this.creeper.add(this.head, this.body, this.feet)
    }
}
```

創建 Creeper 實體類別
```javascript
let creeperClass

const createCreeper = () => {
    creeperClass = new Creeper()
    scene.add(creeperClass.creeper)
}

const init () => {
    createCreeper()
}
```

創建地板
```javascript
let plane

const createPlane = () => {
    // 簡單的地板
    const planeGeo = new THREE.PlaneGeometry(60, 60)
    const planeMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
    plane = new THREE.Mesh(planeGeo, planeMat)
    plane.position.set(0, -7, 0)
    plane.rotation.x = Math.PI * -0.5
    scene.add(plane)
}

const init = () => {
    createPlane()
}
```

顯示座標參考線
```javascript
const init = () => {
    let axes = new THREE.AxesHelper(20) // 參數為座標軸長度
    scene.add(axes)
}
```

---

## 性能監控與軌道控制

[![document](https://img.shields.io/static/v1.svg?label=參考資料&message=(06)專案實作3%20-%20OrbitControls、stats.js&color=blue)](https://ithelp.ithome.com.tw/articles/10200289)

安裝相依套件
```bash
npm i --save three-orbitcontrols stats-js
```

引入相依套件
```javascript
import OrbitControls from 'three-orbitcontrols'
import Stats from 'stats-js'
```

效能監控初始化
```javascript
let statsUI

const statsInit = () => {
    const stats = new Stats()

    // FPS mode
    // 0: FPS 每秒貞數
    // 1: 畫面渲染時間
    stats.setMode(0)

    // 創建效能監控的div容器
    const div = document.createElement('div')
    div.id = 'stats'
    div.appendChild(stats.domElement)
    document.body.appendChild(div)

    return stats
}

const init = () => {
    statsUI = statsInit() // 初始化
}

const render = () => {
    statsUI.update() // 需設定 update 才會持續更新
}
```

軌道控制器
```javascript
let cameraControl

const init = () => {
    cameraControl = new THREE.OrbitControls(camera)
    cameraControl.enableDamping = true // 啟用阻尼效果
    cameraControl.dampingFactor = 0.25 // 阻尼系數
    cameraControl.autoRotate = true    // 啟用自動旋轉
}

const render = () => {
    cameraControl.update() // 需設定 update
}
```

---

## 人物材質與貼圖

[![document](https://img.shields.io/static/v1.svg?label=參考資料&message=(08)%20專案實作4%20-%20人物材質與貼圖&color=blue)](https://ithelp.ithome.com.tw/articles/10204288)

載入貼圖到專案中
```javascript
const Creeper = class {
    constructor () {
        const loader = new THREE.TextureLoader()
        // 苦力怕臉部貼圖
        const headMap = loader.load('https://dl.dropboxusercontent.com/s/bkqu0tty04epc46/creeper_face.png')
        // 苦力怕皮膚貼圖
        const skinMap = loader.load('https://dl.dropboxusercontent.com/s/eev6wxdxfmukkt8/creeper_skin.png')
    }
}
```

將貼圖新增成材質
```javascript
const Creeper = class {
    constructor () {
        // 建立皮膚材質
        const skinMat = new THREE.MeshStandardMaterial({
            roughness: 0.3, // 粗糙度
            metalness: 0.8, // 金屬感
            transparent: true, // 透明與否
            opacity: 0.95, // 透明度
            side: THREE.DoubleSide, // 雙面材質
            map: skinMap, // 皮膚貼圖
        })

        // 建立臉部材質
        const headMat = []
        for (let i = 0; i < 6; i += 1) {
            let map
            if (i === 4) map = headMap
            else map = skinMap
            headMat.push(new THREE.MeshStandardMaterial({ map }))
        }

        // 貼上材質
        this.head = new THREE.Mesh(headGeo, headMat)
        this.body = new THREE.Mesh(bodyGeo, skinMat)
        this.foot1 = new THREE.Mesh(footGeo, skinMat)
    }
}
```
> 材質設定 API 請參考 [https://threejs.org/docs/#api/en/materials/MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)

---

## 環境光源

[![document](https://img.shields.io/static/v1.svg?label=參考資料&message=(09)光源（Light）&color=blue)](https://ithelp.ithome.com.tw/articles/10204710)

基礎光源共有四種
|光源名稱|說明|圖示|
|---|---|---|
|[AmbientLight](https://threejs.org/docs/#api/en/lights/AmbientLight)|環境光。散佈在環境中的光，會將光源的顏色疊加到場景中所有物體上，不能創造陰影，通常拿來增加一些柔性的光線補強色彩。|![img](https://ithelp.ithome.com.tw/upload/images/20181021/20107572Vo3BKIKmD0.png)
|[PointLight](https://threejs.org/docs/#api/en/lights/PointLight)|點光源。從特定一點向所有方向發射光線，可以投射陰影。類似燈泡、螢火蟲的概念。|![img](https://ithelp.ithome.com.tw/upload/images/20181021/20107572qkxXSeLM11.png)
|[SpotLight](https://threejs.org/docs/#api/en/lights/SpotLight)|聚光燈。從特定一點對某個方向發射錐形的光線，可以投射陰影。類似手電筒、舞台聚光燈的概念。|![img](https://ithelp.ithome.com.tw/upload/images/20181021/20107572ULtj5jQfM0.png)
|[DirectionalLight](https://threejs.org/docs/#api/en/lights/DirectionalLight)|平行光、無限光。從一個二維平面發射光線，光線彼此平行，可以投射陰影，類似太陽光的概念。|![img](https://ithelp.ithome.com.tw/upload/images/20181021/20107572gEn7eL56Ly.png)

加入各種光源
```javascript
const init = () => {
    // 設置環境光 AmbientLight
    const ambientLight = new THREE.AmbientLight(0xeeff00)
    scene.add(ambientLight)

    // 設置點光源 PointLight
    const pointLight = new THREE.PointLight(0xeeff00)
    pointLight.position.set(-10, 20, 20)
    pointLight.castShadow = true
    scene.add(pointLight)
    const pointLightHelper = new THREE.PointLightHelper(pointLight)
    scene.add(pointLightHelper)

    // 設置聚光燈 SpotLight
    const spotLight = new THREE.SpotLight(0xeeff00)
    spotLight.position.set(-10, 20, 20)
    spotLight.castShadow = true
    scene.add(spotLight)
    const spotLightHelper = new THREE.SpotLightHelper(spotLight)
    scene.add(spotLightHelper)

    // 設置平行光 DirectionalLight
    const directionalLight = new THREE.DirectionalLight(0xeeff00)
    directionalLight.position.set(-10, 20, 20)
    directionalLight.castShadow = true
    scene.add(directionalLight)
    const directionalLightHelper = new THREE.DirectionalLightHelper(
        directionalLight,
    )
    scene.add(directionalLightHelper)
}
```

---

## 光影效果

[![document](https://img.shields.io/static/v1.svg?label=參考資料&message=(10)專案實作5%20-%20光影效果&color=blue)](https://ithelp.ithome.com.tw/articles/10204739)

設定陰影模式<br>
共分為三個陰影種類<br>
`THREE.BasicShadowMap = 0` `THREE.PCFShadowMap = 1` `THREE.PCFSoftShadowMap = 2`<br>
可以簡單理解為陰影的毛邊優化，調整成 THREE.PCFSoftShadowMap 影子會看起來比較圓滑。
```javascript
const init = () => {
    renderer.shadowMap.enabled = true // 設定需渲染陰影效果
    renderer.shadowMap.type = 2 // THREE.PCFSoftShadowMap
}
```

設定地板接收陰影
```javascript
const init = () => {
    plane.receiveShadow = true
}
```

設定 Creeper 接收陰影並製造陰影
```javascript
const Creeper = class {
    constructor () {
        // 苦力怕投影設定，利用 traverse 遍歷各個子元件設定陰影
        this.creeper.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true
                object.receiveShadow = true
            }
        })
    }
}
```
> traverse 方法是 THREE.Scene 中提供一個用來遍歷目標物件（creeper）及其所有後代（head、body、feet）的方法，透過傳入的 function，可以對苦力怕底下的所有子元件都設定陰影效果。

加入光源
```javascript
let pointLight; let sphereLightMesh

const init = () => {
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
    const sphereLightGeo = new THREE.SphereGeometry(0.3)
    const sphereLightMat = new THREE.MeshBasicMaterial({ color: 0xccffcc })
    sphereLightMesh = new THREE.Mesh(sphereLightGeo, sphereLightMat)
    sphereLightMesh.castShadow = true
    sphereLightMesh.position.y = 16
    scene.add(sphereLightMesh)
}
```

光源移動動畫
```javascript
let rotateAngle = 0

// 點光源繞 Y 軸旋轉動畫
const pointLightAnimation = () => {
  if (rotateAngle > 2 * Math.PI) {
    rotateAngle = 0 // 超過 360 度後歸零
  } else {
    rotateAngle += 0.03 // 遞增角度
  }

  // 光源延橢圓軌道繞 Y 軸旋轉
  sphereLightMesh.position.x = 8 * Math.cos(rotateAngle)
  sphereLightMesh.position.z = 4 * Math.sin(rotateAngle)

  // 點光源位置與球體同步
  pointLight.position.copy(sphereLightMesh.position)
}

const render = () => {
  pointLightAnimation() // update
}
```