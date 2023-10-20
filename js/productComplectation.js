class ProductComplectation {
    constructor($root) {
        this.$root = $root;
        this.$listItems = this.$root.querySelectorAll('.complectation-item');
        this.$listSection = this.$root.querySelector('.product-complectation__row--list-section');
        this.$endDeepLayer = this.$root.querySelector('.product-complectation__background-layer--tile-end-deep'); 
        this.$endDeeperLayer = this.$root.querySelector('.product-complectation__background-layer--tile-end-deeper'); 
        this.$schemaRoot = this.$root.querySelector('.product-schema'); // TODO better tag 
        
        let options = {
            //root: document.querySelector("#scrollArea"),
            //rootMargin: "0px",
            threshold: 0.0,
        };
        let listObserver = new IntersectionObserver((entries, observer) => this.listObserverCallback(entries, observer), options);
        listObserver.observe(this.$listSection);
        console.log('productComplectation inited');
        let schemaObserver = new IntersectionObserver((entries, observer) => this.schemaObserverCallback(entries, observer), options);
        schemaObserver.observe(this.$schemaRoot);
        this.dephaseListInitially();
        this.dephaseSchemaInitially();
        console.log('productComplectation inited');
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

    isSchemaEmphased = false;
    schemaObserverCallback(entries, observer) {
        const isIntersecting = entries.some(entry => entry.isIntersecting);
        if (isIntersecting && !this.isSchemaEmphased) {
            this.isSchemaEmphased = true;
            this.emphaseSchema();
        }
    }

    emphaseSchema() {
        console.log('emphase schema');
        this.$schemaRoot.classList.remove('--dephased');
        this.$root.classList.remove('--dephased');
    }

    dephaseSchemaInitially() {
        console.log('dephase schema');
        this.$schemaRoot.classList.add('--dephased');
        this.$root.classList.add('--dephased');
    }

    scrollCallback(ev) {
        const boundingClientRect = this.$root.getBoundingClientRect();
        const diffRatio = (360 - boundingClientRect.bottom + 45) / 360;
        const clampedLinearRatio = Math.max(0, Math.min(1, diffRatio));
        const deepOpacity = Math.pow(clampedLinearRatio, 2);
        const deeperOpacity = Math.pow(clampedLinearRatio, 4);
        
        this.changeEndDeepOpacity(deepOpacity, deeperOpacity);
    }

    changeEndDeepOpacity(deepOpacity, deeperOpacity) {
        this.$endDeepLayer.style = `opacity: ${deepOpacity};`;
        this.$endDeeperLayer.style = `opacity: ${deeperOpacity};`;
    
    }


}
     
const $productComplectationRoot = document.querySelector('.product-complectation');
const productComplectation = new ProductComplectation($productComplectationRoot);