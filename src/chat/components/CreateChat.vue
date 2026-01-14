<script setup lang="ts">
  import {
    DialogRoot,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose
  } from 'radix-vue'
</script>

<template>
  <DialogRoot class="dialogRoot">
    <DialogTrigger as-child>
      <button class="createChatButton">
        Skapa Chatt
        <i class="pi pi-plus addIcon" aria-hidden="true"></i>
      </button>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="dialogOverlay"/>
        <DialogContent class="dialogContent">
          <DialogTitle class="dialogTitle">
            Skapa en ny chatt
          </DialogTitle>

          <DialogDescription class="dialogDescription">
            Skriv in användar id:t för den du vill skapa en ny konversation med. 
          </DialogDescription>

          <input
            type="text"
            class="dialogInput"
            placeholder="Användar id"
          />

          <div class="dialogActions">
            <DialogClose as-child>
              <button class="cancelButton">Avbryt</button>
            </DialogClose>

            <button class="acceptButton">
              Skapa
            </button>
          </div>
        </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
  .createChatButton {
    display: block;
    margin: 0 auto;
    background-color: var(--color-background-soft);
    color: var(--color-heading);
    outline: none;
    border: none;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 50%;
    font-family: "Dosis", sans-serif;
    font-size: 1rem;
    margin-top: 2rem;
    cursor: pointer;

  }

  .addIcon {
    margin-left: 1rem;
    font-size: 0.8rem;
  }

  .dialogOverlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .dialogContent {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-background-soft);
    color: var(--color-heading);
    padding: 1.5rem;
    border-radius: 0.75rem;
    width: 90%;
    max-width: 400px;
    z-index: 1001;
  }

  .dialogTitle {
    font-size: 1.25rem;
    font-weight: 600;
    font-family: "Dosis", sans-serif;
  }

  .dialogDescription {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    font-family: "Dosis", sans-serif;
  }

  .dialogInput {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--color-heading);
    background: var(--color-background);
    color: var(--color-heading);
    outline: none;
    border: none;
    font-family: "Dosis", sans-serif;
  }

  .dialogInput:focus {
    outline: none;
    border: none;
  }

  .dialogActions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.5rem;
    font-family: "Dosis", sans-serif;
  }

  .cancelButton {
    background: transparent;
    border: 1px solid var(--color-heading);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    color: var(--color-heading);
    font-family: "Dosis", sans-serif;
  }

  .acceptButton {
    background: var(--color-heading);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    color: var(--color-background);
    font-family: "Dosis", sans-serif;
  }

  @media (min-width: 1024px) {
    .createChatButton {
      width: 50%;
    }
  }
</style>