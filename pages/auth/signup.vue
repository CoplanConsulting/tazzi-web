<script setup lang="ts">
definePageMeta({
  layout: false,
});

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const company = ref("");
const password = ref("");
const confirmPassword = ref("");

function handleSignUp() {
  console.log("Sign up submitted with:", {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    company: company.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });

  router.push("/onboarding");
}
</script>

<template>
  <div class="auth-page auth-page--signup">
    <Card class="auth-page__card">
      <CardHeader class="auth-page__header">
        <CardTitle class="auth-page__title">
          Create an account
        </CardTitle>
      </CardHeader>

      <CardContent class="auth-page__content">
        <form class="auth-form" @submit.prevent="handleSignUp">
          <div class="auth-form__row">
            <div class="auth-form__field">
              <Label for="firstName" class="auth-form__label">
                First Name
              </Label>
              <Input
                id="firstName"
                v-model="firstName"
                type="text"
                class="auth-form__input"
              />
            </div>

            <div class="auth-form__field">
              <Label for="lastName" class="auth-form__label">
                Last Name
              </Label>
              <Input
                id="lastName"
                v-model="lastName"
                type="text"
                class="auth-form__input"
              />
            </div>
          </div>

          <div class="auth-form__row">
            <div class="auth-form__field">
              <Label for="email" class="auth-form__label">
                Email Address
              </Label>
              <Input
                id="email"
                v-model="email"
                type="email"
                class="auth-form__input"
              />
            </div>

            <div class="auth-form__field">
              <Label for="company" class="auth-form__label">
                Company
              </Label>
              <Input
                id="company"
                v-model="company"
                type="text"
                class="auth-form__input"
              />
            </div>
          </div>

          <div class="auth-form__row">
            <div class="auth-form__field">
              <Label for="password" class="auth-form__label">
                Password
              </Label>
              <Input
                id="password"
                v-model="password"
                type="password"
                class="auth-form__input"
              />
            </div>

            <div class="auth-form__field">
              <Label for="confirmPassword" class="auth-form__label">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                class="auth-form__input"
              />
            </div>
          </div>

          <div class="auth-form__actions">
            <Button
              type="submit"
              class="auth-form__button"
            >
              Sign Up
            </Button>
          </div>

          <div class="auth-page__link-section">
            Already have an account?
            <NuxtLink
              to="/auth/login"
              class="auth-page__link"
            >
              Login
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>

    <p class="auth-page__terms">
      By clicking sign up, you agree to our
      <a href="#" class="auth-page__terms-link">Terms of Service</a>
      and
      <a href="#" class="auth-page__terms-link">Privacy Policy</a>.
    </p>
  </div>
</template>
