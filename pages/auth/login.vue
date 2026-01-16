<script setup lang="ts">
definePageMeta({
  layout: false,
});

const router = useRouter();

const email = ref("");
const password = ref("");

function handleLogin() {
  console.log("Login submitted with:", {
    email: email.value,
    password: password.value,
  });

  router.push("/dashboard");
}
</script>

<template>
  <div class="auth-page">
    <Card class="auth-page__card">
      <CardHeader class="auth-page__header">
        <CardTitle class="auth-page__title">
          Welcome back
        </CardTitle>
        <CardDescription class="auth-page__description">
          Login to your TMPro account
        </CardDescription>
      </CardHeader>

      <CardContent class="auth-page__content">
        <form class="auth-form" @submit.prevent="handleLogin">
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

          <div class="auth-form__field">
            <div class="auth-form__field-header">
              <Label for="password" class="auth-form__label">
                Password
              </Label>
              <NuxtLink
                to="/auth/forgot-password"
                class="auth-form__link"
              >
                Forgot your password?
              </NuxtLink>
            </div>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="auth-form__input"
            />
          </div>

          <Button
            type="submit"
            class="auth-form__button auth-form__button--rounded"
          >
            Login
          </Button>

          <div class="auth-page__link-section">
            Don't have an account?
            <NuxtLink
              to="/auth/signup"
              class="auth-page__link"
            >
              Sign Up
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
