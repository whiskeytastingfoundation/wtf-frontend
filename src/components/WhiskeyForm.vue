<script setup lang="ts">
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import { ref, onMounted, defineEmits, Ref } from "vue";
import { TastingNote } from "../types/tasting_note";

const props = defineProps({
  noteToEdit: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["form-submitted"]);

const form: Ref<TastingNote> = ref({
  whiskeyName: "",
  whiskeyType: "",
  location: "",
  isPrivateBottling: false,
  privateBottlingCompany: "",
  tastingLabels: [],
  notes: "",
});

const whiskeyTypes = ref(["Single Malt", "Blended", "Grain", "Rye", "Bourbon"]);

const existingLabels = [
  "Smoky",
  "Fruity",
  "Spicy",
  "Sweet",
  "Peaty",
  "Vanilla",
  "Caramel",
  "Citrus",
  "Floral",
  "Nutty",
  "Oaky",
  "Honey",
  "Chocolate",
  "Coffee",
  "Herbal",
  "Medicinal",
  "Earthy",
  "Leather",
  "Tobacco",
  "Mineral",
  // ... (add more existing labels as needed) ...
];

const tastingLabelsInput = ref();
let tagify: Tagify;

onMounted(() => {
  // Retrieve new labels from local storage
  const storedNewLabels = localStorage.getItem("newLabels");
  const newLabels = storedNewLabels ? JSON.parse(storedNewLabels) : [];

  // Combine existing labels and new labels
  const allLabels = [...existingLabels, ...newLabels];

  tagify = new Tagify(tastingLabelsInput.value, {
    whitelist: allLabels,
    enforceWhitelist: false,
    dropdown: {
      enabled: 0,
    },
  });

  tagify.on("add", () => {
    form.value.tastingLabels = tagify.value.map((tag) => tag.value);
  });

  tagify.on("remove", () => {
    form.value.tastingLabels = tagify.value.map((tag) => tag.value);
  });
  if (props.noteToEdit) {
    form.value = { ...props.noteToEdit } as TastingNote;
    tagify.addTags(props.noteToEdit.tastingLabels);
  }
});

const submitForm = () => {
  // Retrieve existing new labels from local storage
  const storedNewLabels = localStorage.getItem("newLabels");
  const existingNewLabels = storedNewLabels ? JSON.parse(storedNewLabels) : [];

  // Find new labels that are not in existingLabels or existingNewLabels
  const newUniqueLabels = form.value.tastingLabels.filter(
    (label) => !existingLabels.includes(label) && !existingNewLabels.includes(label)
  );

  if (newUniqueLabels.length > 0) {
    // Combine existing new labels with new unique labels
    const updatedNewLabels = [...existingNewLabels, ...newUniqueLabels];

    // Store updated new labels in local storage
    localStorage.setItem("newLabels", JSON.stringify(updatedNewLabels));

    // Update Tagify whitelist with new labels
    tagify.settings.whitelist = [...existingLabels, ...updatedNewLabels];
  }

  if (!props.noteToEdit) {
    // Save the new note
    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    submissions.push(form.value);
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }
  // Emit the updated/submitted note data
  emit("form-submitted", form.value);

  // Reset form after submission
  form.value = {
    whiskeyName: "",
    whiskeyType: "",
    location: "",
    isPrivateBottling: false,
    privateBottlingCompany: "",
    tastingLabels: [],
    notes: "",
  };
  tagify.removeAllTags();
};
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md text-white"
  >
    <!-- Whiskey Name -->
    <div class="mb-4">
      <label for="whiskey-name" class="label">Whiskey Name</label>
      <input
        id="whiskey-name"
        v-model="form.whiskeyName"
        type="text"
        required
        class="input input-dark"
        placeholder="Enter whiskey name"
      />
    </div>

    <!-- Whiskey Type -->
    <div class="mb-4">
      <label for="whiskey-type" class="label">Whiskey Type</label>
      <select
        id="whiskey-type"
        v-model="form.whiskeyType"
        class="input input-dark"
        required
      >
        <option value="">Select whiskey type</option>
        <option v-for="type in whiskeyTypes" :key="type" :value="type">{{ type }}</option>
      </select>
    </div>

    <!-- Location -->
    <div class="mb-4">
      <label for="location" class="label">Location</label>
      <input
        id="location"
        v-model="form.location"
        type="text"
        class="input input-dark"
        placeholder="Enter location (e.g. Islay, Scotland)"
      />
    </div>

    <!-- Private Bottling -->
    <div class="mb-4">
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="form.isPrivateBottling"
          class="form-checkbox text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
        />
        <span class="ml-2">Private Bottling</span>
      </label>
      <input
        v-if="form.isPrivateBottling"
        v-model="form.privateBottlingCompany"
        type="text"
        class="input input-dark"
        placeholder="Enter private bottling company"
      />
    </div>

    <!-- Tasting Labels -->
    <div class="mb-4">
      <label class="label">Tasting Labels</label>
      <input ref="tastingLabelsInput" class="input input-dark" />
    </div>

    <!-- Tasting Notes -->
    <div class="mb-4">
      <label for="notes" class="label">Tasting Notes</label>
      <textarea
        id="notes"
        v-model="form.notes"
        rows="4"
        class="input input-dark"
        placeholder="Enter your tasting notes"
      ></textarea>
    </div>

    <!-- Submit Button -->
    <button type="submit" class="btn btn-blue mt-4">
      {{ noteToEdit ? "Update Tasting Note" : "Save Tasting Note" }}
    </button>
  </form>
</template>
