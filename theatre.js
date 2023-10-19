
class Theatre {
    constructor($root) {
        this.$root = $root;
        this.$showcaseHeader = this.$root.querySelector('.showcase-header'); 
        
        let options = {
            //root: document.querySelector("#scrollArea"),
            //rootMargin: "0px",
            threshold: 0.0,
        };

        let showcaseHeaderObserver = new IntersectionObserver((entries, observer) => this.showcaseHeaderObserverCallback(entries, observer), options);
        showcaseHeaderObserver.observe(this.$showcaseHeader);

        this.dephaseShowcaseHeaderInitially();  
        console.log('productCard inited');
    }
    isShowcaseHeaderEmphased = false;
    showcaseHeaderObserverCallback(entries, observer) {
        const isIntersecting = entries.some(entry => entry.isIntersecting);
        if (isIntersecting && !this.isShowcaseHeaderEmphased) {
            this.isShowcaseHeaderEmphased = true;
            this.emphaseShowcaseHeader();
        }
    }
    emphaseShowcaseHeader() {
        console.log('emphase');
        this.$showcaseHeader.classList.remove('--dephased');
    }
    dephaseShowcaseHeaderInitially() {
        console.log('dephase');
        this.$showcaseHeader.classList.add('--dephased');
    }
}
     
const $theatreRoot = document.querySelector('.theatre-outer-container'); // TODO better root
const theatre = new Theatre($theatreRoot);