<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";

import { calculateDayCount, createTourFormSchema } from "~/lib/validations/tour";

const router = useRouter();
const { getAccessToken } = useSupabaseSession();

// Form validation with vee-validate + zod
const { errors, handleSubmit, defineField } = useForm({
  validationSchema: createTourFormSchema,
  initialValues: {
    name: "",
    startDate: "",
    endDate: "",
  },
});

// Define form fields
const [name, nameAttrs] = defineField("name");
const [startDate, startDateAttrs] = defineField("startDate");
const [endDate, endDateAttrs] = defineField("endDate");

// Loading state
const isLoading = ref(false);

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    // Get the access token for authentication
    const accessToken = await getAccessToken();

    if (!accessToken) {
      toast.error("Please log in to create a tour");
      router.push("/auth/login");
      return;
    }

    // Create the tour via API
    await $fetch("/api/tours", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        name: values.name,
        startDate: values.startDate,
        endDate: values.endDate,
      },
    });

    // Calculate days (inclusive)
    const days = calculateDayCount(values.startDate, values.endDate);

    // Navigate to success page
    router.push({
      path: "/onboarding/success",
      query: {
        tourName: values.name,
        days: days.toString(),
      },
    });
  }
  catch (error: unknown) {
    console.error("Error creating tour:", error);

    // Extract error message from API response
    const apiError = error as { data?: { error?: string } };
    const errorMessage = apiError?.data?.error || "Failed to create tour. Please try again.";
    toast.error(errorMessage);
  }
  finally {
    isLoading.value = false;
  }
});

// Handle back navigation
function handleBack() {
  router.push("/onboarding");
}

// Set minimum date to today
const minDate = new Date().toISOString().split("T")[0];
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 md:p-6">
    <div class="mx-auto w-full max-w-3xl">
      <!-- Form Card -->
      <Card class="bg-white">
        <CardHeader class="space-y-4 pb-6 pt-10">
          <div class="space-y-2">
            <CardTitle class="text-3xl font-bold text-gray-900">
              Create Your Tour
            </CardTitle>
            <p class="text-base text-gray-600">
              Enter your tour details below. We'll generate a day record for each date in your range.
            </p>
          </div>
        </CardHeader>

        <CardContent class="px-8 pb-8">
          <form class="space-y-6" @submit="onSubmit">
            <!-- Tour Name -->
            <div class="space-y-2">
              <Label for="name" class="text-sm font-medium text-gray-900">
                Tour Name
                <span class="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                v-model="name"
                v-bind="nameAttrs"
                type="text"
                placeholder="e.g., Summer Tour 2025"
                class="h-12 text-base"
                :class="{ 'border-red-500': errors.name }"
              />
              <p v-if="errors.name" class="text-sm text-red-500">
                {{ errors.name }}
              </p>
            </div>

            <!-- Date Range -->
            <div class="grid gap-6 md:grid-cols-2">
              <!-- Start Date -->
              <div class="space-y-2">
                <Label for="startDate" class="text-sm font-medium text-gray-900">
                  Start Date
                  <span class="text-red-500">*</span>
                </Label>
                <div class="relative">
                  <Input
                    id="startDate"
                    v-model="startDate"
                    v-bind="startDateAttrs"
                    type="date"
                    :min="minDate"
                    class="h-12 text-base cursor-pointer"
                    :class="{ 'border-red-500': errors.startDate }"
                  />
                </div>
                <p v-if="errors.startDate" class="text-sm text-red-500">
                  {{ errors.startDate }}
                </p>
              </div>

              <!-- End Date -->
              <div class="space-y-2">
                <Label for="endDate" class="text-sm font-medium text-gray-900">
                  End Date
                  <span class="text-red-500">*</span>
                </Label>
                <div class="relative">
                  <Input
                    id="endDate"
                    v-model="endDate"
                    v-bind="endDateAttrs"
                    type="date"
                    :min="startDate || minDate"
                    class="h-12 text-base cursor-pointer"
                    :class="{ 'border-red-500': errors.endDate }"
                  />
                </div>
                <p v-if="errors.endDate" class="text-sm text-red-500">
                  {{ errors.endDate }}
                </p>
              </div>
            </div>

            <!-- Info Box -->
            <div class="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <p class="text-sm text-blue-900">
                <span class="font-medium">Tip:</span>
                We'll create a calendar day for each date in your range. You can add shows, travel days, and other events later.
              </p>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                class="flex-1 h-12"
                :disabled="isLoading"
                @click="handleBack"
              >
                Back
              </Button>
              <Button
                type="submit"
                class="flex-1 h-12 bg-gray-900 hover:bg-gray-800"
                :disabled="isLoading"
              >
                <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                {{ isLoading ? 'Creating...' : 'Create Tour' }}
              </Button>
            </div>
          </form>

          <!-- Progress Indicator -->
          <div class="pt-8">
            <div class="flex items-center justify-center gap-2">
              <div class="h-2 w-2 rounded-full bg-gray-400" />
              <div class="h-2 w-2 rounded-full bg-gray-900" />
              <div class="h-2 w-2 rounded-full bg-gray-300" />
            </div>
            <p class="mt-3 text-center text-sm text-gray-500">
              Step 2 of 3
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
