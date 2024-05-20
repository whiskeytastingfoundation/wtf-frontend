<script lang="ts">
import { defineComponent } from 'vue';
import WhiskeyForm from './WhiskeyForm.vue';
import { TastingNote } from '../types/tasting_note';

export default defineComponent({
  name: 'NoteDetail',
  components: {
    WhiskeyForm,
  },
  props: {
    note: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    startEditing() {
      this.editing = true;
    },
    updateNote(updatedNote: TastingNote) {
      this.$emit('note-updated', updatedNote);
      this.editing = false;
    },
  },
});
</script>

<template>
  <div v-if="note" class="bg-gray-800 p-4 rounded-lg shadow-md">
    <div v-if="!editing">
      <h2 class="text-xl font-bold mb-4">{{ note.whiskeyName }}</h2>
      <p><strong>Whiskey Type:</strong> {{ note.whiskeyType }}</p>
      <p><strong>Location:</strong> {{ note.location }}</p>
      <p><strong>Private Bottling:</strong> {{ note.isPrivateBottling ? 'Yes' : 'No' }}</p>
      <p v-if="note.isPrivateBottling"><strong>Bottling Company:</strong> {{ note.privateBottlingCompany }}</p>
      <p><strong>Tasting Labels:</strong> {{ note.tastingLabels.join(', ') }}</p>
      <p><strong>Notes:</strong> {{ note.notes }}</p>
      <button @click="startEditing" class="btn btn-blue mt-4">Edit</button>
    </div>
    <div v-else>
      <WhiskeyForm :note-to-edit="note" @form-submitted="updateNote" />
    </div>
  </div>
</template>

