if (!customElements.get('cart-drawer-2')) {
	customElements.define('cart-drawer-2', class CartDrawer2 extends HTMLElement {
		constructor() {
			super();

			this.sectionId = this.dataset.sectionId;
		}

		connectedCallback() {
			subscribe(PUB_SUB_EVENTS.cartUpdate, event => {
				this.onCartUpdateHandler()
					.then(() => {
						if (event.source !== 'cart-items') {
							this.openDrawer();
						}
					})
			})

			subscribe(PUB_SUB_EVENTS.cartToggle, event => {
				if (event.action === 'open') {
					this.openDrawer()
				} else if (event.action === 'close') {
					this.closeDrawer()
				}
			})

			this.addEventListener('click', event => {
				if (event.target.closest('[data-close-drawer]')) {
					this.closeDrawer()
				}
			})

			if (Shopify.designMode) {
				document.addEventListener('shopify:section:select', event => {
					if (event.detail.sectionId === this.sectionId) {
						this.openDrawer();
					}
				})
				document.addEventListener('shopify:section:deselect', event => {
					if (event.detail.sectionId === this.sectionId) {
						this.closeDrawer();
					}
				})
			}
		}

		async onCartUpdateHandler() {
			await fetch(`/?section_id=${this.sectionId}`)
				.then((response) => response.text())
				.then((text) => {
					this.querySelector('[data-render-element]').innerHTML = new DOMParser()
						.parseFromString(text, 'text/html')
						.querySelector('[data-render-element]')
						?.innerHTML || '';
				})
				.catch((e) => {
					console.error(e);
				});
		}

		openDrawer() {
			document.body.classList.add('is-drawer-open');
			this.classList.add('is-open');
		}

		closeDrawer() {
			document.body.classList.remove('is-drawer-open');
			this.classList.remove('is-open');
		}
	})
}