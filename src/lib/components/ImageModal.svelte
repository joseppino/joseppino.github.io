<script lang="ts">
	export let showModal: boolean;
	export let photoURI: string;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
{#if photoURI}
	<dialog
		bind:this={dialog}
		on:close={() => {
			showModal = false;
			photoURI = "";
		}}
		on:click|self={() => dialog.close()}
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click|stopPropagation>
			<img class="modal-img" src={photoURI} alt="">
			<!-- svelte-ignore a11y-autofocus -->
             <footer style="align-items:end;">
			<button type="button" class="outline secondary" autofocus
			style="font-size: 70%;"
			on:click={() => dialog.close()}>Close &times;</button>
             </footer>
		</div>
	</dialog>
{/if}

<style>
	.modal-img {
		max-width: 95vw;
		max-height: 80vh;
	}
	
	/* Hide dialog popup if screen is smaller than 500px in width or height */
	@media only screen and (max-width: 500px){
		dialog {
			display: none;
		}
	}

	@media only screen and (max-height: 500px){
		dialog {
			display: none;
		}
	}

	dialog {
		max-width: 96em;
		border-radius: 0.4em;
		border: none;
		padding: 0;
		background-color: rgba(0, 0, 0, 0.6);
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 0.4em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
    footer {
        display: flex;
        justify-content: flex-end;
    }
</style>
