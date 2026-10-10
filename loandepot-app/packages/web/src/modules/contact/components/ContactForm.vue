<script setup lang="ts">
import ScheduleIcon from '@/shared/components/icons/ScheduleIcon.vue';
import { Field, Form, reset, setErrors, useForm } from '@formisch/vue';
import { appointmentSchema } from '../forms/appointment.schema';
import type { IAppointment } from '@loandepot/types';
import { useAppointmentStore } from '../store/appointment.store';
import BaseField from '@/shared/components/BaseField.vue';
import UserIcon from '@/shared/components/icons/UserIcon.vue';
import MailIcon from '@/shared/components/icons/MailIcon.vue';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import CalendarIcon from '@/shared/components/icons/CalendarIcon.vue';
import { datePickerFormats, formatToBackendISO } from '@/shared/utils';
import { SubmitButton } from '@/shared';
import { ref } from 'vue';

const appointmentStore = useAppointmentStore();
const calendarDate = ref<Date | null>(null);
let timerId: ReturnType<typeof setTimeout> | null = null;

const appointmentForm = useForm({
  schema: appointmentSchema,
  initialInput: {
    name: '',
    email: '',
    date: '',
  },
});

function handleDateChange(value: unknown, updateField: (value: string) => void): void {
  if (value instanceof Date) {
    calendarDate.value = value;
    updateField(formatToBackendISO(value));
  } else if (!value) {
    calendarDate.value = null;
    updateField('');
  }
}

async function handleAppointmentForm(outputData: IAppointment): Promise<void> {
  appointmentStore.success = await appointmentStore.appointmentSubmitForm(outputData);

  if (timerId) clearTimeout(timerId);

  if (appointmentStore.success) {
    reset(appointmentForm);
    calendarDate.value = null;
    timerId = setTimeout(() => {
      appointmentStore.success = false;
    }, 3000);
  } else if (appointmentStore.serverError) {
    const errorText = appointmentStore.serverError;

    if (errorText === 'Пользователь с таким email уже забронировал встречу') {
      setErrors(appointmentForm, { path: ['email'], errors: [errorText] });
    }

    if (errorText === 'На эту дату уже назначена встреча') {
      setErrors(appointmentForm, { path: ['date'], errors: [errorText] });
    }
  }
}
</script>

<template>
  <div class="contact-form">
    <ScheduleIcon class="schedule-icon" icon-color="#6d53af" />
    <div class="contact-form-details">
      <h3 class="contact-form-title">Select the time</h3>
      <Form :of="appointmentForm" class="contact-form-fields" @submit="handleAppointmentForm">
        <div class="contact-form-top">
          <Field :of="appointmentForm" :path="['name']" v-slot="field">
            <div class="field-wrapper">
              <BaseField
                v-model="field.input"
                class="field"
                type="text"
                label="Your name"
                placeholder="Your name"
                bg-color="rgba(216, 216, 216, 0.3)"
                bg-focus-color="#6d53af"
                placeholder-color="#000"
                text-color="#000"
                text-focus-color="#fff"
                icon-color="#000"
                icon-focus-color="#fff"
              >
                <UserIcon />
              </BaseField>
              <span v-if="field.errors" class="error-msg">{{ field.errors.join(', ') }}</span>
            </div>
          </Field>
          <Field :of="appointmentForm" :path="['email']" v-slot="field">
            <div class="field-wrapper">
              <BaseField
                v-model="field.input"
                class="field"
                type="text"
                label="Your email"
                placeholder="Your email"
                bg-color="rgba(216, 216, 216, 0.3)"
                bg-focus-color="#6d53af"
                placeholder-color="#000"
                text-color="#000"
                text-focus-color="#fff"
                icon-color="#000"
                icon-focus-color="#fff"
              >
                <MailIcon />
              </BaseField>
              <span v-if="field.errors" class="error-msg">{{ field.errors.join(', ') }}</span>
            </div>
          </Field>
          <Field :of="appointmentForm" :path="['date']" v-slot="field">
            <div class="field-wrapper">
              <div class="field-calendar">
                <label for="calendar">I want to meet you on</label>
                <VueDatePicker
                  v-model="calendarDate"
                  class="contact-form-calendar"
                  placeholder="When?"
                  :formats="datePickerFormats"
                  :input-attrs="{ id: 'calendar' }"
                  @update:model-value="(value) => handleDateChange(value, (v) => (field.input = v))"
                >
                  <template #input-icon>
                    <CalendarIcon class="custom-calendar-icon" />
                  </template>
                </VueDatePicker>
              </div>
              <span v-if="field.errors" class="error-msg">{{ field.errors.join(', ') }}</span>
            </div>
          </Field>
        </div>
        <SubmitButton class="submit-btn">Schedule</SubmitButton>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.contact-form-fields {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.schedule-icon {
  margin-left: auto;
  padding-top: 40px;
}

.contact-form-details {
  display: flex;
  flex-direction: column;
  gap: 35px;

  h3 {
    font-family: var(--font-mark);
    font-size: 32px;
    font-weight: 900;
  }
}

.contact-form-top {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.field-calendar {
  display: flex;
  flex-direction: column;
  gap: 11px;

  label {
    font-family: var(--font-mark);
    font-weight: 900;
    font-size: 15px;
  }
}

:deep(.dp--input-wrap) {
  position: relative;
  width: 100%;
  max-width: 340px;
}

:deep(.dp--input-icon) {
  position: absolute;
  right: 0;
}

.custom-calendar-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
}

:deep(.dp--input) {
  --dp-background-color: var(--color-bg-input);
  --dp-border-color: none;
  --dp-input-padding: 0px 50px 0px 24px;
  --dp-font-family: var(--font-roboto);
  --dp-font-size: 14px;
  --dp-text-color: var(--color-light-opacity);

  font-weight: 900;

  height: 64px;
  max-width: 340px;

  &::placeholder {
    font-family: var(--font-roboto);
    color: var(--color-dark);
    font-weight: 900;
  }
}

:deep(.dp--clear-btn) {
  display: none;
}

:deep(.dp--main) {
  width: 100%;
  max-width: 360px;
}

.error-msg {
  font-weight: 500;
  font-size: 13px;
  color: var(--color-error);
  font-family: var(--font-mark);
}

@media (hover: hover) {
  .submit-btn:hover {
    background-color: var(--color-dark);
    color: var(--color-light);
    opacity: 0.7;
  }
}
</style>
