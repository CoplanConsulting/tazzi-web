<script setup lang="ts">
import { toast } from "vue-sonner";

import { signupSchema } from "~/lib/validations/auth";

definePageMeta({
  layout: false,
});

const router = useRouter();
const isLoading = ref(false);
const serverError = ref("");

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(signupSchema),
});

const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");
const [email, emailAttrs] = defineField("email");
const [company, companyAttrs] = defineField("company");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");

const onSubmit = handleSubmit(async (values) => {
  serverError.value = "";
  isLoading.value = true;

  try {
    const response = await $fetch("/api/auth/signup", {
      method: "POST",
      body: {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        company: values.company,
      },
    });

    if (response.success) {
      toast.success("Account created successfully!");
      router.push("/onboarding");
    }
  }
  catch (error: unknown) {
    // Handle fetch errors - H3 errors have data.data structure
    const fetchError = error as { data?: { data?: { error?: string }; error?: string } };
    const message = fetchError.data?.data?.error
      || fetchError.data?.error
      || "Something went wrong, please try again";
    serverError.value = message;
    toast.error(message);
  }
  finally {
    isLoading.value = false;
  }
});
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
        <form
          class="auth-form"
          aria-label="Sign up form"
          @submit="onSubmit"
        >
          <div class="auth-form__row">
            <div class="auth-form__field">
              <Label for="firstName" class="auth-form__label">
                First Name
              </Label>
              <Input
                id="firstName"
                v-model="firstName"
                v-bind="firstNameAttrs"
                type="text"
                autocomplete="given-name"
                class="auth-form__input"
                :class="{ 'auth-form__input--error': errors.firstName }"
                :aria-invalid="!!errors.firstName"
                :aria-describedby="errors.firstName ? 'firstName-error' : undefined"
              />
              <span
                v-if="errors.firstName"
                id="firstName-error"
                class="auth-form__field-error"
              >
                {{ errors.firstName }}
              </span>
            </div>

            <div class="auth-form__field">
              <Label for="lastName" class="auth-form__label">
                Last Name
              </Label>
              <Input
                id="lastName"
                v-model="lastName"
                v-bind="lastNameAttrs"
                type="text"
                autocomplete="family-name"
                class="auth-form__input"
                :class="{ 'auth-form__input--error': errors.lastName }"
                :aria-invalid="!!errors.lastName"
                :aria-describedby="errors.lastName ? 'lastName-error' : undefined"
              />
              <span
                v-if="errors.lastName"
                id="lastName-error"
                class="auth-form__field-error"
              >
                {{ errors.lastName }}
              </span>
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
                v-bind="emailAttrs"
                type="email"
                autocomplete="email"
                class="auth-form__input"
                :class="{ 'auth-form__input--error': errors.email }"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'email-error' : undefined"
              />
              <span
                v-if="errors.email"
                id="email-error"
                class="auth-form__field-error"
              >
                {{ errors.email }}
              </span>
            </div>

            <div class="auth-form__field">
              <Label for="company" class="auth-form__label">
                Company
              </Label>
              <Input
                id="company"
                v-model="company"
                v-bind="companyAttrs"
                type="text"
                autocomplete="organization"
                class="auth-form__input"
                :class="{ 'auth-form__input--error': errors.company }"
                :aria-invalid="!!errors.company"
                :aria-describedby="errors.company ? 'company-error' : undefined"
              />
              <span
                v-if="errors.company"
                id="company-error"
                class="auth-form__field-error"
              >
                {{ errors.company }}
              </span>
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
                v-bind="passwordAttrs"
                type="password"
                autocomplete="new-password"
                class="auth-form__input"
                :class="{ 'auth-form__input--error': errors.password }"
                :aria-invalid="!!errors.password"
                :aria-describedby="errors.password ? 'password-error' : undefined"
              />
              <span
                v-if="errors.password"
                id="password-error"
                class="auth-form__field-error"
              >
                {{ errors.password }}
              </span>
            </div>

            <div class="auth-form__field">
              <Label for="confirmPassword" class="auth-form__label">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                v-model="confirmPassword"
                v-bind="confirmPasswordAttrs"
                type="password"
                autocomplete="new-password"
                class="auth-form__input"
                :class="{ 'auth-form__input--error': errors.confirmPassword }"
                :aria-invalid="!!errors.confirmPassword"
                :aria-describedby="errors.confirmPassword ? 'confirmPassword-error' : undefined"
              />
              <span
                v-if="errors.confirmPassword"
                id="confirmPassword-error"
                class="auth-form__field-error"
              >
                {{ errors.confirmPassword }}
              </span>
            </div>
          </div>

          <!-- Server error message -->
          <div
            v-if="serverError"
            role="alert"
            aria-live="polite"
            class="auth-form__error"
          >
            {{ serverError }}
          </div>

          <div class="auth-form__actions">
            <Button
              type="submit"
              class="auth-form__button"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="auth-form__loading">
                Creating account...
              </span>
              <span v-else>Sign Up</span>
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

<style scoped>
.auth-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.auth-form__field-error {
  color: var(--destructive);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.auth-form__input--error {
  border-color: var(--destructive);
}

.auth-form__error {
  color: var(--destructive);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
}

.auth-form__loading {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
