
class ProductCard {
    constructor($root) {
        this.$root = $root;
        this.$ratings = this.$root.querySelectorAll('.product-card-detail__rating');
        this.$starsSection = this.$root.querySelector('.product-card__row--stars-section'); 
        
        this.$primaryButtonBlock = this.$root.querySelector('.product-card__row--primary-button-block'); 
        
        let options = {
            //root: document.querySelector("#scrollArea"),
            //rootMargin: "0px",
            threshold: 0.0,
        };
        let starsObserver = new IntersectionObserver((entries, observer) => this.starsObserverCallback(entries, observer), options);
        starsObserver.observe(this.$starsSection);
        let primaryButtonBlockObserver = new IntersectionObserver((entries, observer) => this.primaryButtonBlockObserverCallback(entries, observer), options);
        primaryButtonBlockObserver.observe(this.$primaryButtonBlock);

        this.dephaseStarsInitially();
        this.dephasePrimaryButtonBlockInitially();
        console.log('productCard inited');
    }
    isStarsEmphased = false;
    starsObserverCallback(entries, observer) {
        const isIntersecting = entries.some(entry => entry.isIntersecting);
        if (isIntersecting && !this.isStarsEmphased) {
            this.isStarsEmphased = true;
            this.emphaseStars();
        }
    }
    emphaseStars() {
        console.log('emphase');
        this.$ratings.forEach(($item, itemIdx) => {
            const $subitems = $item.querySelectorAll('.rating-star');
            $subitems.forEach(($subitem, subitemIdx) => {
                setTimeout(() => {
                    $subitem.classList.remove('--dephased');
                }, 100 * itemIdx + 150 * subitemIdx);
            });
        });
    }
    dephaseStarsInitially() {
        console.log('dephase');
        this.$ratings.forEach(($item, itemIdx) => {
            const $subitems = $item.querySelectorAll('.rating-star');
            $subitems.forEach(($subitem, subitemIdx) => {
                $subitem.classList.add('--dephased');
            });
        });
    }

    isPrimaryButtonBlockEmphased = false;
    primaryButtonBlockObserverCallback(entries, observer) {
        const isIntersecting = entries.some(entry => entry.isIntersecting);
        if (isIntersecting && !this.isPrimaryButtonBlockEmphased) {
            this.isPrimaryButtonBlockEmphased = true;
            this.emphasePrimaryButtonBlock();
        }
    }
    emphasePrimaryButtonBlock() {
        console.log('emphase');
        this.$primaryButtonBlock.classList.remove('--dephased');
    }
    dephasePrimaryButtonBlockInitially() {
        console.log('dephase');
        this.$primaryButtonBlock.classList.add('--dephased');
    }

}
     
const $productCardRoot = document.querySelector('.product-card');
const productCard = new ProductCard($productCardRoot);