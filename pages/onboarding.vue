<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="onboarding-page">
    <Card class="onboarding-page__card">
      <CardHeader>
        <CardTitle class="onboarding-page__title">
          Welcome to Tazzi!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="onboarding-page__message">
          Your account has been created successfully.
        </p>
        <p class="onboarding-page__message">
          Onboarding flow coming soon...
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.onboarding-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

.onboarding-page__card {
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.onboarding-page__title {
  font-size: 1.5rem;
}

.onboarding-page__message {
  color: var(--muted-foreground);
  margin-bottom: 0.5rem;
}
</style>
