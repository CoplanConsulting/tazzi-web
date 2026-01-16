<script setup lang="ts">
definePageMeta({
  layout: false,
});

const email = ref("");
</script>

<template>
  <div class="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-[var(--spacing-6)] gap-[var(--spacing-6)]">
    <Card class="w-full max-w-sm bg-[var(--card)] shadow-card py-[var(--spacing-12)]">
      <CardHeader class="px-[var(--spacing-8)] pb-[var(--spacing-8)]">
        <CardTitle class="text-2xl font-bold text-[var(--foreground)] mb-[var(--spacing-2)]">
          Forgot your password?
        </CardTitle>
        <CardDescription class="text-[var(--muted-foreground)]">
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>

      <CardContent class="px-[var(--spacing-8)] pb-[var(--spacing-8)]">
        <form class="grid gap-[var(--spacing-6)]">
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
              class="h-[2.75rem]"
            />
          </div>

          <!-- Send Reset Link Button -->
          <Button
            type="submit"
            class="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 h-[2.75rem] mt-[var(--spacing-2)]"
          >
            Send reset link
          </Button>

          <!-- Back to Login Link -->
          <div class="text-center text-xs text-[var(--muted-foreground)]">
            Remember your password?
            <NuxtLink
              to="/auth/login"
              class="text-[var(--foreground)] font-medium hover:underline"
            >
              Back to login
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
