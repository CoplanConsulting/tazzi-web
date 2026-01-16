<script setup lang="ts">
definePageMeta({
  layout: false,
});

const email = ref("");
</script>

<template>
  <div class="auth-page">
    <Card class="auth-page__card">
      <CardHeader class="auth-page__header">
        <CardTitle class="auth-page__title">
          Forgot your password?
        </CardTitle>
        <CardDescription class="auth-page__description">
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>

      <CardContent class="auth-page__content">
        <form class="auth-form">
          <div class="auth-form__field">
            <Label for="email" class="auth-form__label">
              Email
            </Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="name@example.com"
              class="auth-form__input"
            />
          </div>

          <Button
            type="submit"
            class="auth-form__button"
          >
            Send reset link
          </Button>

          <div class="auth-page__link-section">
            Remember your password?
            <NuxtLink
              to="/auth/login"
              class="auth-page__link"
            >
              Back to login
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>

    <p class="auth-page__terms">
      By clicking login, you agree to our
      <a href="#" class="auth-page__terms-link">Terms of Service</a>
      and
      <a href="#" class="auth-page__terms-link">Privacy Policy</a>.
    </p>
  </div>
</template>
