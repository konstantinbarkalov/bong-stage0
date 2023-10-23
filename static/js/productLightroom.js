class ProductLightroom {
    constructor($root) {
        this.$root = $root;
        this.$listItems = this.$root.querySelectorAll('.image-frame');
        this.$listSection = this.$root.querySelector('.product-lightroom__row--list-section');
        this.$oneLayer = this.$root.querySelector('.product-lightroom__background-layer--one'); 
        this.$twoLayer = this.$root.querySelector('.product-lightroom__background-layer--two'); 
        this.$threeLayer = this.$root.querySelector('.product-lightroom__background-layer--three'); 
        
        
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
        const parallaxDiff = diffBratio;
        this.changeParallax(parallaxDiff);
    }

    changeParallax(parallaxDiff) {
        this.$listItems.forEach((item, itemIdx) => {
            item.style = `box-shadow: 0 ${-parallaxDiff * 10}px 16px -6px #00000080;`;
        });
        this.$listSection.style = `transform: translateY(${parallaxDiff * 10}px);`;
        this.$oneLayer.style = `background-position-y: ${-parallaxDiff * 600}px`;
        this.$twoLayer.style = `background-position-y: ${-parallaxDiff * 400}px; -webkit-mask-position-y: ${-parallaxDiff * 0}px;`;
        this.$threeLayer.style = `box-shadow: inset 0 ${0 + parallaxDiff * 32}px 48px 0 #ffffff10, 0 ${-4 -parallaxDiff * 8}px 32px -16px #000000c0`;
    }

}
     
const $productLightroomRoot = document.querySelector('.product-lightroom');
const productLightroom = new ProductLightroom($productLightroomRoot);