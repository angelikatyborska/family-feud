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

    --prussian-blue: #003049ff;
    --air-superiority-blue: #669bbcff;
    --white: #ffffffff;
    --white-darker: #eeeeeeff;
    --hunter-green: #386641ff;
    --asparagus: #6a994eff;
    --yellow-green: #a7c957ff;
    --persian-red: #c44536ff;
    --burnt-umber: #772e25ff;

    --team-1-dark: var(--hunter-green);
    --team-1-light: var(--asparagus);
    --team-2-dark: var(--burnt-umber);
    --team-2-light: var(--persian-red);

    --text-color: var(--prussian-blue);
    --background-color: var(--white);
    --background-color2: var(--white-darker);

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
