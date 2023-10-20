class ProductLightroom {
    constructor($root) {
        this.$root = $root;
        this.$listItems = this.$root.querySelectorAll('.image-frame');
        this.$listSection = this.$root.querySelector('.product-lightroom__row--list-section');

        
        let options = {
            threshold: 0.0,
        };
        let listObserver = new IntersectionObserver((entries, observer) => this.listObserverCallback(entries, observer), options);
        listObserver.observe(this.$listSection);
        console.log('productLightroom inited');
        this.dephaseListInitially();
        window.addEventListener('scroll', (ev) => this.scrollCallback(ev))
    }
    isListEmphased = false;
    listObserverCallback(entries, observer) {
        const isIntersecting = entries.some(entry => entry.isIntersecting);
        if (isIntersecting && !this.isListEmphased) {
            this.isListEmphased = true;
            this.emphaseList();
        }
    }
    emphaseList() {
        console.log('emphase list');
        this.$listItems.forEach((item, itemIdx) => {
            setTimeout(() => {
                item.classList.remove('--dephased');
            }, 125 * itemIdx);
        });
    }
    dephaseListInitially() {
        console.log('dephase list');
        this.$listItems.forEach((item, itemIdx) => {
            item.classList.add('--dephased');
        });
    }


    scrollCallback(ev) {
        const boundingClientRect = this.$root.getBoundingClientRect();
        const diffRatio = (boundingClientRect.bottom + boundingClientRect.top) / 2 / window.innerHeight;
        const diffBratio = diffRatio * 2 - 1;
        const parallaxDiff = diffBratio * 10;
        this.changeParallax(parallaxDiff);
    }

    changeParallax(parallaxDiff) {
        this.$listItems.forEach((item, itemIdx) => {
            item.style = `box-shadow: 0 ${-parallaxDiff}px 16px -6px black;`;
        });
        this.$root.style = `background-position-y: ${-parallaxDiff * 10}px;`;
    }


}
     
const $productLightroomRoot = document.querySelector('.product-lightroom');
const productLightroom = new ProductLightroom($productLightroomRoot);