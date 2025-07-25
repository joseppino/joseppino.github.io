<script lang="ts">
    import EmblaCarousel from 'embla-carousel'
    import { onMount } from 'svelte'
  
    export let slides: any[] = []
    export let options = {}
    export let thumbOptions = {
      containScroll: 'keepSnaps',
      dragFree: true
    }
  
    let mainCarousel
    let thumbCarousel
    let mainViewport: HTMLElement
    let thumbViewport: HTMLElement
  
    onMount(() => {
      if (!slides || slides.length === 0) return
  
      const emblaApiMain = EmblaCarousel(mainViewport, options)
      const emblaApiThumb = EmblaCarousel(thumbViewport, thumbOptions)
  
      const slidesThumbs = emblaApiThumb.slideNodes()
  
      // Add click handlers for thumbnail buttons
      const scrollToIndex = slidesThumbs.map((_, index) => 
        () => emblaApiMain.scrollTo(index)
      )
  
      slidesThumbs.forEach((slideNode, index) => {
        slideNode.addEventListener('click', scrollToIndex[index], false)
      })
  
      // Add active state handling for thumbnails
      const toggleThumbBtnsState = () => {
        emblaApiThumb.scrollTo(emblaApiMain.selectedScrollSnap())
        const previous = emblaApiMain.previousScrollSnap()
        const selected = emblaApiMain.selectedScrollSnap()
        slidesThumbs[previous]?.classList.remove('embla-thumbs__slide--selected')
        slidesThumbs[selected]?.classList.add('embla-thumbs__slide--selected')
      }
  
      emblaApiMain.on('select', toggleThumbBtnsState)
      emblaApiThumb.on('init', toggleThumbBtnsState)
      toggleThumbBtnsState()
  
      return () => {
        slidesThumbs.forEach((slideNode, index) => {
          slideNode.removeEventListener('click', scrollToIndex[index], false)
        })
        slidesThumbs[selected]?.classList.remove('embla-thumbs__slide--selected')
      }
    })
</script>

<div class="embla" bind:this={mainCarousel}>
    <div class="embla__viewport" bind:this={mainViewport}>
      <div class="embla__container">
        {#if slides && slides.length > 0}
          {#each slides as slide, index}
            <div class="embla__slide">
              <img src={slide} alt="">
              <!-- <div class="embla__slide__number">
                {index}
              </div> -->
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
  
  <div class="embla-thumbs" bind:this={thumbCarousel}>
    <div class="embla-thumbs__viewport" bind:this={thumbViewport}>
      <div class="embla-thumbs__container">
        {#if slides && slides.length > 0}
          {#each slides as slide, index}
            <div class="embla-thumbs__slide" class:embla-thumbs__slide--selected={index === 0}>
              <button type="button" class="embla-thumbs__slide__number">
                <img src={slide} alt="">
              </button>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
  
<style>
    .embla {
      max-width: 48rem;
      margin: auto;
      --slide-height: 19rem;
      --slide-spacing: 1rem;
      --slide-size: 100%;
    }
  
    .embla__viewport {
      overflow: hidden;
    }
  
    .embla__container {
      display: flex;
      touch-action: pan-y pinch-zoom;
      margin-left: calc(var(--slide-spacing) * -1);
    }
  
    .embla__slide {
      transform: translate3d(0, 0, 0);
      flex: 0 0 var(--slide-size);
      min-width: 0;
      padding-left: var(--slide-spacing);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .embla__slide img {
      height: auto;
      width: auto;
      max-width: 100%;
      max-height: 500px;
    }
  
    .embla__slide__number {
      box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
      border-radius: 1.8rem;
      font-size: 4rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--slide-height);
      user-select: none;
    }
  
    .embla-thumbs {
      --thumbs-slide-spacing: 0.8rem;
      --thumbs-slide-height: 6rem;
      margin-top: var(--thumbs-slide-spacing);
    }
  
    .embla-thumbs__viewport {
      overflow: hidden;
    }
  
    .embla-thumbs__container {
      display: flex;
      flex-direction: row;
      margin-left: calc(var(--thumbs-slide-spacing) * -1);
    }
  
    .embla-thumbs__slide {
      flex: 0 0 22%;
      min-width: 0;
      padding-left: var(--thumbs-slide-spacing);
    }
  
    .embla-thumbs__slide__number {
      border-radius: 1.8rem;
      -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
      -webkit-appearance: none;
      appearance: none;
      background-color: transparent;
      touch-action: manipulation;
      display: inline-flex;
      text-decoration: none;
      cursor: pointer;
      border: 0;
      padding: 0;
      margin: 0;
      box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--detail-high-contrast);
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--thumbs-slide-height);
      width: 100%;
    }
  
    .embla-thumbs__slide--selected .embla-thumbs__slide__number {
      color: var(--text-body);
    }
  
    @media (min-width: 576px) {
      .embla-thumbs__slide {
        flex: 0 0 15%;
      }
    }
</style>