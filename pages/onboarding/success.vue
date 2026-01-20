<script setup lang="ts">
import { Calendar, CheckCircle2, LayoutDashboard, Plus } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

// Get tour data from query params, or use defaults for UI preview
const tourName = computed(() => route.query.tourName as string || "Summer Tour 2025");
const daysGenerated = computed(() => Number.parseInt(route.query.days as string || "49"));

// Navigation handlers
// TODO: Enable these when calendar and events pages are implemented
function handleViewCalendar() {
  // router.push('/calendar')
  router.push("/"); // Temporary: route to home until calendar is built
}

function handleAddFirstShow() {
  // router.push('/events/add')
  router.push("/"); // Temporary: route to home until events page is built
}

function handleGoToDashboard() {
  router.push("/");
}

// Confetti animation state
const showConfetti = ref(false);

onMounted(() => {
  // Trigger confetti animation
  setTimeout(() => {
    showConfetti.value = true;
  }, 200);
});
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 md:p-6">
    <div class="mx-auto w-full max-w-3xl">
      <!-- Success Card -->
      <Card class="bg-white relative overflow-hidden">
        <!-- Animated background -->
        <div
          class="absolute inset-0 opacity-5 transition-opacity duration-1000"
          :class="{ 'opacity-10': showConfetti }"
        >
          <div class="absolute top-10 left-10 h-32 w-32 rounded-full bg-green-500 blur-3xl" />
          <div class="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-blue-500 blur-3xl" />
        </div>

        <CardHeader class="space-y-6 pb-8 pt-12 text-center relative">
          <!-- Success Icon with animation -->
          <div class="mx-auto">
            <div
              class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 transition-transform duration-500"
              :class="{ 'scale-100': showConfetti, 'scale-0': !showConfetti }"
            >
              <CheckCircle2 class="h-12 w-12 text-white" />
            </div>
          </div>

          <!-- Title -->
          <div class="space-y-3">
            <CardTitle class="text-4xl font-bold text-gray-900">
              Tour Created!
            </CardTitle>
            <div class="space-y-1">
              <p class="text-xl font-medium text-gray-700">
                {{ tourName }}
              </p>
              <p class="text-lg text-gray-600">
                {{ daysGenerated }} days generated
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent class="space-y-6 px-8 pb-12 relative">
          <!-- Success Message -->
          <div class="rounded-lg bg-green-50 border border-green-200 p-4">
            <p class="text-sm text-green-900 text-center">
              Your tour has been created successfully! You can now add shows, manage personnel, and plan your tour logistics.
            </p>
          </div>

          <!-- Action Cards -->
          <div class="space-y-3">
            <!-- View Calendar -->
            <button
              class="w-full flex items-center gap-4 p-5 rounded-lg border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 group"
              @click="handleViewCalendar"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <Calendar class="h-6 w-6 text-blue-700" />
              </div>
              <div class="flex-1 text-left">
                <h3 class="font-semibold text-gray-900">
                  View Calendar
                </h3>
                <p class="text-sm text-gray-600">
                  See all {{ daysGenerated }} days in calendar view
                </p>
              </div>
              <div class="text-gray-400 group-hover:text-gray-900 transition-colors">
                →
              </div>
            </button>

            <!-- Add First Show -->
            <button
              class="w-full flex items-center gap-4 p-5 rounded-lg border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 group"
              @click="handleAddFirstShow"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <Plus class="h-6 w-6 text-purple-700" />
              </div>
              <div class="flex-1 text-left">
                <h3 class="font-semibold text-gray-900">
                  Add First Show
                </h3>
                <p class="text-sm text-gray-600">
                  Start adding events to your tour
                </p>
              </div>
              <div class="text-gray-400 group-hover:text-gray-900 transition-colors">
                →
              </div>
            </button>

            <!-- Go to Dashboard -->
            <button
              class="w-full flex items-center gap-4 p-5 rounded-lg border-2 border-gray-900 bg-gray-900 hover:bg-gray-800 transition-all duration-200 group"
              @click="handleGoToDashboard"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <LayoutDashboard class="h-6 w-6 text-white" />
              </div>
              <div class="flex-1 text-left">
                <h3 class="font-semibold text-white">
                  Go to Dashboard
                </h3>
                <p class="text-sm text-gray-300">
                  View your tour overview
                </p>
              </div>
              <div class="text-white/60 group-hover:text-white transition-colors">
                →
              </div>
            </button>
          </div>

          <!-- Progress Indicator -->
          <div class="pt-6">
            <div class="flex items-center justify-center gap-2">
              <div class="h-2 w-2 rounded-full bg-gray-400" />
              <div class="h-2 w-2 rounded-full bg-gray-400" />
              <div class="h-2 w-2 rounded-full bg-green-600" />
            </div>
            <p class="mt-3 text-center text-sm text-gray-500">
              Onboarding Complete!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
