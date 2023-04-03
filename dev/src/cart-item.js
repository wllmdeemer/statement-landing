if (!customElements.get('cart-item')) {
	customElements.define('cart-item', class CartItem extends HTMLElement {
		constructor() {
			super();
		}

		connectedCallback() {

			this.addEventListener('click', event => {
				event.preventDefault();

				const targetButton = event.target.closest('[data-remove-item]');
				if (targetButton) {
					targetButton.setAttribute('disabled', 'disabled');
					fetch(targetButton.dataset.removeUrl).then(() => {
						targetButton.removeAttribute('disabled');
						publish(PUB_SUB_EVENTS.cartUpdate, {source: 'cart-items'})
					})
				}
			})

		}
	})
}