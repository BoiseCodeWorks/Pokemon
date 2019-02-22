export default class Pokemon{
    constructor(data) {
        this.name = data.name
        this.imgs = this.imgUrls(data.sprites)
        this.stats = data.stats
        this.abilities = data.abilities
        this.activeImg = this.imgs[0]
        setInterval(this.newImg, 1000, this)
    }

    imgUrls(sprites){
        let imgs = []
        for(let key in sprites) {
            sprites[key] && key.includes('front') ? imgs.push(sprites[key]) : ''
        }
        return imgs
    }

    newImg(p) {
        let i = p.imgs.findIndex(url => url == p.activeImg) + 1
        p.activeImg = p.imgs[i == p.imgs.length ? 0 : i]
    }

    draw() {
        return `
        <div class="card">
            <img src="${this.activeImg}" class="card-img-top">
        </div>
        `
    }
}