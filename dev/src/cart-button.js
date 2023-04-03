if (!customElements.get('cart-button')) {
	customElements.define('cart-button', class CartButton extends HTMLButtonElement {
		constructor() {
			super();
		}

		connectedCallback() {
			subscribe(PUB_SUB_EVENTS.cartUpdate, event => {
				this.updateCartItemCount();
			});

			this.addEventListener('click', event => {
				event.preventDefault();
				this.onClickHandler();
			})
		}

		onClickHandler() {
			publish(PUB_SUB_EVENTS.cartToggle, {action: 'open'})
		}

		updateCartItemCount() {
			fetch(`${window.routes.cart_url}`, {
				method: 'GET',
				headers: {
					'Accept': `application/json`
				}
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.status) return;
					this.querySelector('[data-cart-item-count]').innerHTML = response.item_count;
				})
				.catch((e) => {
					console.error(e);
				});
		}
	}, {extends: 'button'})
}