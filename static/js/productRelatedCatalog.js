class ProductRelatedCatalog {
    constructor($root) {
        this.$root = $root;
        this.$firstHeader = this.$root.querySelector('.product-related-catalog__first-header');
        
        let options = {
            //root: document.querySelector("#scrollArea"),
            //rootMargin: "0px",
            threshold: 0.0,
        };
        let firstHeaderObserver = new IntersectionObserver((entries, observer) => this.firstHeaderObserverCallback(entries, observer), options);
        firstHeaderObserver.observe(this.$firstHeader);
        this.dephaseFirstHeaderInitially();
    }
    isFirstHeaderEmphased = false;
    firstHeaderObserverCallback(entries, observer) {
        const isIntersecting = entries.some(entry => entry.isIntersecting);
        if (isIntersecting && !this.isFirstHeaderEmphased) {
            this.isFirstHeaderEmphased = true;
            this.emphaseFirstHeader();
        }
    }
    emphaseFirstHeader() {
        console.log('emphase firstHeader');
        this.$firstHeader.classList.remove('--dephased');
    }
    dephaseFirstHeaderInitially() {
        console.log('dephase firstHeader');
        this.$firstHeader.classList.add('--dephased');
    }

}
     
const $productRelatedCatalogRoot = document.querySelector('.product-related-catalog');
const productRelatedCatalog = new ProductRelatedCatalog($productRelatedCatalogRoot);