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
  <div class="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-[var(--spacing-6)] gap-[var(--spacing-6)]">
    <Card class="w-full max-w-md py-[var(--spacing-12)] bg-[var(--card)] shadow-card">
      <CardHeader class="pb-[var(--spacing-8)]">
        <CardTitle class="text-2xl font-bold text-[var(--foreground)] mb-[var(--spacing-2)]">
          Welcome back
        </CardTitle>
        <CardDescription class="text-[var(--muted-foreground)]">
          Login to your TMPro account
        </CardDescription>
      </CardHeader>

      <CardContent class="px-[var(--spacing-8)] pb-[var(--spacing-8)]">
        <form class="grid gap-[var(--spacing-6)]" @submit.prevent="handleLogin">
          <!-- Email Field -->
          <div class="grid gap-[var(--spacing-2)]">
            <Label for="email" class="text-sm font-medium text-[var(--foreground)]">
              Email
            </Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="name@example.com"
              class="h-11"
            />
          </div>

          <!-- Password Field -->
          <div class="grid gap-[var(--spacing-2)]">
            <div class="flex items-center justify-between">
              <Label for="password" class="text-sm font-medium text-[var(--foreground)]">
                Password
              </Label>
              <NuxtLink
                to="/auth/forgot-password"
                class="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-[var(--transition-duration-fast)]"
              >
                Forgot your password?
              </NuxtLink>
            </div>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="h-11"
            />
          </div>

          <!-- Login Button -->
          <Button
            type="submit"
            class="w-full rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 h-11 mt-[var(--spacing-2)] transition-opacity duration-[var(--transition-duration-base)]"
          >
            Login
          </Button>

          <!-- Sign Up Link -->
          <div class="text-center text-sm text-[var(--muted-foreground)]">
            Don't have an account?
            <NuxtLink
              to="/auth/signup"
              class="text-[var(--foreground)] font-medium hover:underline"
            >
              Sign Up
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>

    <!-- Terms Footer - OUTSIDE card -->
    <p class="text-xs text-[var(--muted-foreground)] text-center max-w-md">
      By clicking login, you agree to our
      <a href="#" class="underline hover:text-[var(--foreground)] transition-colors duration-[var(--transition-duration-fast)]">Terms of Service</a>
      and
      <a href="#" class="underline hover:text-[var(--foreground)] transition-colors duration-[var(--transition-duration-fast)]">Privacy Policy</a>.
    </p>
  </div>
</template>
