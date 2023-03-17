import Card from './Card.js'

export default class Section {
    constructor({ data }, containerSelector) {
        this._renderedItems = data
        this._container = document.querySelector(containerSelector)
    }

    setItem(element) {
        this._container.prepend(element)
    }

    instanceClassCard(name, link, elementTemplate) {
        return new Card(name, link, elementTemplate)
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            const card = this.instanceClassCard(item.name, item.link, '#element-template')

            const cardElement = card.createCard();

            this.setItem(cardElement)
        })
    }
}