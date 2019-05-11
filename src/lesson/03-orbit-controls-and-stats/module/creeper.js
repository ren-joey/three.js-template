import * as THREE from 'three'

export default class {
    constructor() {
    // defined Creeper's head, body and foot
        const headGeo = new THREE.BoxGeometry(4, 4, 4)
        const bodyGeo = new THREE.BoxGeometry(4, 8, 2)
        const footGeo = new THREE.BoxGeometry(2, 3, 2)

        // Phong Material
        const creeperMat = new THREE.MeshPhongMaterial({ color: 0x00FF00 })

        // head
        this.head = new THREE.Mesh(headGeo, creeperMat)
        this.head.position.set(0, 6, 0)

        // body
        this.body = new THREE.Mesh(bodyGeo, creeperMat)
        this.body.position.set(0, 0, 0)

        // foot
        this.foot1 = new THREE.Mesh(footGeo, creeperMat)
        this.foot1.position.set(-1, -5.5, 2)
        this.foot2 = this.foot1.clone()
        this.foot2.position.set(-1, -5.5, -2)
        this.foot3 = this.foot1.clone()
        this.foot3.position.set(1, -5.5, 2)
        this.foot4 = this.foot1.clone()
        this.foot4.position.set(1, -5.5, -2)

        // group 4 foot
        this.feet = new THREE.Group()
        this.feet.add(this.foot1)
        this.feet.add(this.foot2)
        this.feet.add(this.foot3)
        this.feet.add(this.foot4)

        // group head, body, feet
        this.creeper = new THREE.Group()
        this.creeper.add(this.head)
        this.creeper.add(this.body)
        this.creeper.add(this.feet)
    }
}
