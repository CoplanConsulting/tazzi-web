<script setup lang="ts">
import { ArrowRight, PartyPopper } from "lucide-vue-next";

const router = useRouter();

function handleCreateTour() {
  router.push("/onboarding/create-tour");
}

function handleSkip() {
  // Skip onboarding and go to home
  router.push("/");
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 md:p-6">
    <div class="mx-auto w-full max-w-3xl">
      <!-- Welcome Card -->
      <Card class="bg-white">
        <CardHeader class="space-y-6 pb-8 pt-12 text-center">
          <!-- Icon -->
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-gray-700">
            <PartyPopper class="h-10 w-10 text-white" />
          </div>

          <!-- Title -->
          <div class="space-y-2">
            <CardTitle class="text-4xl font-bold text-gray-900">
              Welcome to Tazzi!
            </CardTitle>
            <p class="text-lg text-gray-600">
              Let's get your tour set up in just a few steps
            </p>
          </div>
        </CardHeader>

        <CardContent class="space-y-4 px-8 pb-12">
          <!-- Create New Tour - Primary Action -->
          <Button
            size="lg"
            class="w-full justify-between text-lg h-16 bg-gray-900 hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            @click="handleCreateTour"
          >
            <span class="flex items-center gap-3">
              <PartyPopper class="h-5 w-5" />
              Create Your First Tour
            </span>
            <ArrowRight class="h-5 w-5" />
          </Button>

          <!-- Skip - Secondary Action -->
          <div class="pt-2 text-center">
            <Button
              variant="ghost"
              class="text-gray-500 hover:text-gray-700"
              @click="handleSkip"
            >
              Skip for now
            </Button>
          </div>

          <!-- Progress Indicator -->
          <div class="pt-8">
            <div class="flex items-center justify-center gap-2">
              <div class="h-2 w-2 rounded-full bg-gray-900" />
              <div class="h-2 w-2 rounded-full bg-gray-300" />
              <div class="h-2 w-2 rounded-full bg-gray-300" />
            </div>
            <p class="mt-3 text-center text-sm text-gray-500">
              Step 1 of 3
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Additional Help Text -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>
          Need help? Check out our
          <a href="#" class="font-medium text-gray-900 hover:underline">getting started guide</a>
        </p>
      </div>
    </div>
  </div>
</template>
