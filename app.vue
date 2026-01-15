<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <div class="bg-background text-foreground">
    <h1 class="text-4xl font-bold underline">
      Hello world!
    </h1>
    <Button variant="outline">
      Button
    </Button>
    <Icon name="tabler:map" size="32" />
    <Icon name="tabler:bus" size="32" />
  </div>
</template>
