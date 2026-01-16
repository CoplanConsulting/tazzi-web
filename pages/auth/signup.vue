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
  <div class="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-[var(--spacing-6)] gap-[var(--spacing-6)]">
    <Card class="w-full max-w-2xl bg-[var(--card)] shadow-card">
      <CardHeader class="pb-[var(--spacing-8)]">
        <CardTitle class="text-[var(--font-size-2xl)] font-bold text-[var(--foreground)]">
          Create an account
        </CardTitle>
      </CardHeader>

      <CardContent class="px-[var(--spacing-8)] pb-[var(--spacing-8)]">
        <form class="grid gap-[var(--spacing-6)]" @submit.prevent="handleSignUp">
          <!-- Name Fields Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-4)]">
            <div class="grid gap-[var(--spacing-2)]">
              <Label for="firstName" class="text-[var(--font-size-sm)] font-medium text-[var(--foreground)]">
                First Name
              </Label>
              <Input
                id="firstName"
                v-model="firstName"
                type="text"
                class="h-11"
              />
            </div>

            <div class="grid gap-[var(--spacing-2)]">
              <Label for="lastName" class="text-[var(--font-size-sm)] font-medium text-[var(--foreground)]">
                Last Name
              </Label>
              <Input
                id="lastName"
                v-model="lastName"
                type="text"
                class="h-11"
              />
            </div>
          </div>

          <!-- Email and Company Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-4)]">
            <div class="grid gap-[var(--spacing-2)]">
              <Label for="email" class="text-[var(--font-size-sm)] font-medium text-[var(--foreground)]">
                Email Address
              </Label>
              <Input
                id="email"
                v-model="email"
                type="email"
                class="h-11"
              />
            </div>

            <div class="grid gap-[var(--spacing-4)]">
              <Label for="company" class="text-[var(--font-size-sm)] font-medium text-[var(--foreground)]">
                Company
              </Label>
              <Input
                id="company"
                v-model="company"
                type="text"
                class="h-11"
              />
            </div>
          </div>

          <!-- Password Fields Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-4)]">
            <div class="grid gap-[var(--spacing-2)]">
              <Label for="password" class="text-[var(--font-size-sm)] font-medium text-[var(--foreground)]">
                Password
              </Label>
              <Input
                id="password"
                v-model="password"
                type="password"
                class="h-11"
              />
            </div>

            <div class="grid gap-[var(--spacing-2)]">
              <Label for="confirmPassword" class="text-[var(--font-size-sm)] font-medium text-[var(--foreground)]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                class="h-11"
              />
            </div>
          </div>

          <!-- Sign Up Button -->
          <div class="flex justify-center mt-[var(--spacing-2)]">
            <Button
              type="submit"
              class="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 h-11 px-[var(--spacing-16)] transition-colors duration-[var(--transition-duration-base)]"
            >
              Sign Up
            </Button>
          </div>

          <!-- Login Link -->
          <div class="text-center text-[var(--font-size-sm)] text-[var(--muted-foreground)]">
            Already have an account?
            <NuxtLink
              to="/auth/login"
              class="text-[var(--foreground)] font-medium hover:underline"
            >
              Login
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>

    <!-- Terms Footer - OUTSIDE card -->
    <p class="text-[var(--font-size-xs)] text-[var(--muted-foreground)] text-center max-w-2xl">
      By clicking sign up, you agree to our
      <a href="#" class="underline hover:text-[var(--foreground)] transition-colors duration-[var(--transition-duration-fast)]">Terms of Service</a>
      and
      <a href="#" class="underline hover:text-[var(--foreground)] transition-colors duration-[var(--transition-duration-fast)]">Privacy Policy</a>.
    </p>
  </div>
</template>
