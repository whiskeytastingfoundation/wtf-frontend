<script lang="ts">
import { defineComponent } from 'vue';
import { TastingNote } from '../types/tasting_note';
export default defineComponent({
  name: 'NoteSummary',
  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectNote(note: TastingNote) {
      this.$emit('note-selected', note);
    },
  },
});
</script>

<template>
  <div class="bg-gray-800 p-4 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Tasting Notes</h2>
    <ul>
      <li v-for="(note, index) in notes" :key="index" class="mb-2 cursor-pointer hover:text-blue-400"
        @click="selectNote(note)">
        {{ note.whiskeyName }} - {{ note.whiskeyType }}
      </li>
    </ul>
  </div>
</template>