var e;e=function(){function e(t,o){return t.length?[t[0],...e(o,t.slice(1))]:o}function t(t,...o){return e(t,o).join("")}function o(t,...o){return`<style>${e(t,o).join("")}</style>`}class n extends HTMLElement{connectedCallback(){this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.render()}style(){return o`
            :host {
                display: block;
                position: absolute;
                box-sizing: border-box;
                overflow-x: hidden;
                padding: 20px;
                width: 100%;
                height: 100%;
                transition: left 300ms ease-in-out;
            }
        `}render(){return t`
            ${this.style()}
            <slot></slot>
        `}}window.customElements.define("ziro-panel",n);class i extends HTMLElement{connectedCallback(){this.attachShadow({mode:"open"}),this.index=0,this.shadowRoot.innerHTML=this.render()}styles(){return o`
            :host {
                box-sizing: border-box;
                height: 100%;
                width: 100%;
                overflow-x: hidden;
                --panel-index: 0;
            }

            ::slotted(ziro-panel:nth-of-type(1)) {
                left: calc(-1 * var(--panel-index) * 100% + 0%);
            }

            ::slotted(ziro-panel:nth-of-type(2)) {
                left: calc(-1 * var(--panel-index) * 100% + 100%);
            }

            ::slotted(ziro-panel:nth-of-type(3)) {
                left: calc(-1 * var(--panel-index) * 100% + 200%);
            }

            ::slotted(ziro-panel:nth-of-type(4)) {
                left: calc(-1 * var(--panel-index) * 100% + 300%);
            }

            ::slotted(ziro-panel:nth-of-type(5)) {
                left: calc(-1 * var(--panel-index) * 100% + 400%);
            }

            ::slotted(ziro-panel:nth-of-type(6)) {
                left: calc(-1 * var(--panel-index) * 100% + 500%);
            }
        `}render(){return t`
            ${this.styles()}
            <slot></slot>
        `}slideTo(e){const t=this.querySelectorAll("ziro-panel").length;this.index=e>t-1?t-1:e<0?0:e,this.style.setProperty("--panel-index",this.index)}}window.customElements.define("ziro-panel-set",i);class s extends HTMLElement{connectedCallback(){this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.render(),this.addEventListener("click",(()=>{this._dispatchNavItemClicked()}))}style(){return o`
            :host {
                flex-grow: 1;
                text-align: center;
                max-width: 200px;
                padding: 20px;
                cursor: pointer;
                background-color: white;
                transition: background-color 300ms ease-in-out;
            }

            :host(:hover) {
                background-color: #bbb;
            }

            :host([selected]) {
                background-color: #ddd;
            }
        `}render(){return t`
            ${this.style()}
            <slot></slot>
        `}_dispatchNavItemClicked(){this.dispatchEvent(new CustomEvent("ziro-nav-item-selected",{bubbles:!0}))}}window.customElements.define("ziro-nav-item",s);class l extends HTMLElement{connectedCallback(){this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.render()}style(){return o`
            :host {
                display: flex;
                width: 100%;
                justify-content: center;
                box-sizing: border-box;
                position: absolute;
                bottom: 0;
                border-top: 1px solid #aaa;
                box-shadow: 0 0 20px 0px #aaa;
                background-color: white;
            }
        `}render(){return t`
            ${this.style()}
            <slot></slot>
        `}}window.customElements.define("ziro-nav",l);class r extends HTMLElement{connectedCallback(){this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.render(),this.addEventListener("ziro-nav-item-selected",(e=>this.navItemClicked(e.target))),this.querySelectorAll("ziro-nav ziro-nav-item").forEach(((e,t)=>{void 0!==e.attributes.selected&&this.slideTo(t)}))}style(){return o`
            :host {
                display: block;
                box-sizing: border-box;
                position: relative;
                height: 100vh;
                width: 100vw;
                overflow-x: hidden;
            }
        `}navItemClicked(e){this.querySelectorAll("ziro-nav ziro-nav-item").forEach(((t,o)=>{t===e?(t.setAttribute("selected",""),this.slideTo(o)):t.removeAttribute("selected")}))}render(){return t`
            ${this.style()}
            <slot></slot>
        `}slideTo(e){this.querySelector("ziro-panel-set").slideTo(e)}}window.customElements.define("ziro-screen",r)},"function"==typeof define&&define.amd?define(e):e();
