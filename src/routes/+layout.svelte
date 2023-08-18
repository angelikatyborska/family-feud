<script lang="ts">
  <!--import type { LayoutData } from './$types';-->

  // export let data: LayoutData;
</script>

<main>
  <!-- +page.svelte is rendered in this <slot> -->
  <slot />
</main>

<style global>
  :root {
    --font-size-xxxl: 2.488rem;
    --font-size-xxl: 2.074rem;
    --font-size-xl: 1.728rem;
    --font-size-l: 1.44rem;
    --font-size-m: 1.2rem;
    --font-size-s: 1rem;
    --font-size-xs: 0.833rem;
    --margin-xxxl: 16rem;
    --margin-xxl: 8rem;
    --margin-xl: 4rem;
    --margin-l: 2rem;
    --margin-m: 1rem;
    --margin-s: 0.5rem;
    --margin-xs: 0.25rem;

    --bistre: #432818ff;
    --barn-red: #780000ff;
    --fire-brick: #c1121fff;
    --papaya-whip: #fdf0d5ff;
    --papaya-whip-darker: #f4e2beff;
    --prussian-blue: #003049ff;
    --air-superiority-blue: #669bbcff;

    --team-1-dark: var(--barn-red);
    --team-1-light: var(--fire-brick);
    --team-2-dark: var(--prussian-blue);
    --team-2-light: var(--air-superiority-blue);

    --text-color: var(--bistre);
    --background-color: var(--papaya-whip);
    --background-color2: var(--papaya-whip-darker);

    margin: 0;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 16px;
    color: var(--text-color);
    background: var(--background-color);
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  :global(button) {
    color: var(--text-color);
    background-color: var(--background-color);
    padding: var(--margin-xs) var(--margin-s);
    border: 3px solid var(--text-color);
  }

  :global(button:hover:not(:disabled)) {
    background-color: var(--background-color2);
    cursor: pointer;
  }

  :global(button:disabled) {
    opacity: 0.3;
  }


</style>
