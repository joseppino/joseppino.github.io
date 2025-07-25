<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import "../global.css";

	let { children } = $props();
</script>

<header>
    <Navbar />
</header>
<main>
    {@render children()}
</main>
<footer></footer>
