if (!customElements.get('product-card')) {
	customElements.define('product-card', class ProductCard extends HTMLElement {
		constructor() {
			super();

			this.form = this.querySelector('form[action="/cart/add"]');
			this.submitButton = this.form.querySelector('button[type="submit"]');
		}

		connectedCallback() {
			this.form.addEventListener('submit', event => {
				event.preventDefault();
				this.onSubmitHandler();
			})
		}

		onSubmitHandler() {
			this.submitButton.setAttribute('disabled', 'disabled');
			this.submitButton.classList.add('is-loading');

			fetch(`${window.routes.cart_add_url}`, {
				method: 'POST',
				headers: {
					'Accept': `application/javascript`,
					'X-Requested-With': 'XMLHttpRequest'
				},
				body: new FormData(this.form)
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.status) return;
					setTimeout(() => {
						publish(PUB_SUB_EVENTS.cartUpdate, {source: 'product-form'});
					}, 1000);
				})
				.catch((e) => {
					console.error(e);
				})
				.finally(() => {
					setTimeout(() => {
						this.submitButton.removeAttribute('disabled');
						this.submitButton.classList.remove('is-loading');
					}, 1000);
				});
		}
	})
}