<script lang="ts">
    import PhotoCarousel from '$lib/components/PhotoCarousel.svelte';
    import { supabase } from "$lib/supabaseClient";

    async function listPhotos(orientation: string) {
      const response = await supabase
      .storage
      .from('photos')
      .list(orientation, {
        limit: 20,
        offset: 0
      });
  
      if(!response.error) {
        return response.data;
      } else {
        throw new Error(response.error.message);
      }
    }
  
    async function getPhotoURIArray(orientation: string) {
      let arr: string[] = [];
      const photoList = await listPhotos(orientation);
      photoList.forEach(item => {
        if(item.name.toUpperCase().includes(".JP")) {
          arr.push(`https://nuyavgdfgnfsizjcvrds.supabase.co/storage/v1/object/public/photos/${orientation}/${item.name}`);
        }
      });
      return arr;
    }
  
    async function fetchAllPhotoURIs() {
      let portraits = await getPhotoURIArray("portrait");
      let landscapes = await getPhotoURIArray("landscape");
      let allURIs = [...portraits, ...landscapes];
      return allURIs;
    }
  
    function shuffleArray(array: any[]) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
    }
  
    let photoURIs = fetchAllPhotoURIs();

    $: console.log(photoURIs);
    
    
    // let slides = Array.from({ length: 10 }, (_, i) => i + 1);
    let slides = photoURIs;
  </script>
  
  <main>
    {#await slides}
        Loading...
    {:then slides}
        <PhotoCarousel {slides} />
    {/await}
  </main>
  