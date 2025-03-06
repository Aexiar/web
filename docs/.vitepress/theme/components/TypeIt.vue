<template></template>
<script setup lang="ts">
import { onMounted } from "vue";
import TypeIt from "typeit";

onMounted(() => {
  new TypeIt(".tagline", {
    strings: ["构建网页或应用用户界面，涉及 HTML 、CSS 和 JavaScript 等技术，重点在于设计和优化用户体验。"],
    speed: 200,
  }).go();
});
</script>
