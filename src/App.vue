<script lang="ts">
import WhiskeyForm from './components/WhiskeyForm.vue';
import NoteSummary from './components/NoteSummary.vue';
import NoteDetail from './components/NoteDetail.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    WhiskeyForm,
    NoteSummary,
    NoteDetail,
  },
  data() {
    return {
      notes: [],
      selectedNote: null,
      showForm: false,
    };
  },
  mounted() {
    this.refreshNotes();
  },
  methods: {
    selectNote(note) {
      this.selectedNote = note;
    },
    updateNote(updatedNote) {
      const index = this.notes.findIndex(note => note.whiskeyName === updatedNote.whiskeyName);
      if (index !== -1) {
        this.notes.splice(index, 1, updatedNote);
        localStorage.setItem('submissions', JSON.stringify(this.notes));
        this.selectedNote = updatedNote;
      }
    },
    refreshNotes() {
      const storedNotes = localStorage.getItem('submissions');
      if (storedNotes) {
        this.notes = JSON.parse(storedNotes);
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
  },
});
</script>

<template>
  <div id="app" class="bg-gray-900 text-white min-h-screen">
    <header class="bg-gray-800 py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold">Whiskey Tasting Foundation</h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <button @click="toggleForm" class="btn btn-blue mt-4">
        {{ showForm ? 'Hide Form' : 'New Note' }}
      </button>

      <WhiskeyForm v-if="showForm" @form-submitted="refreshNotes" />
      <div class="mt-8">
        <NoteSummary :notes="notes" @note-selected="selectNote" />
        <NoteDetail :note="selectedNote" class="mt-4" @note-updated="updateNote" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
