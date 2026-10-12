<script setup lang="ts">
import { BaseField, SubmitButton } from '@/shared';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import BriefcaseIcon from '@/shared/components/icons/BriefcaseIcon.vue';
import MailIcon from '@/shared/components/icons/MailIcon.vue';
import PhoneIcon from '@/shared/components/icons/PhoneIcon.vue';
import UserIcon from '@/shared/components/icons/UserIcon.vue';
import { Field, Form, reset, setErrors, useForm } from '@formisch/vue';
import { joinEvolutionSchema, type JoinEvolutionUser } from '../forms/join-evolution.schema';
import { useEvolutionJoinStore } from '../store/join-evolution.store';
import { onUnmounted } from 'vue';

const joinEvolutionStore = useEvolutionJoinStore();
let timerId: ReturnType<typeof setTimeout> | null = null;

const evolutionForm = useForm({
  schema: joinEvolutionSchema,
  initialInput: {
    city: '',
    name: '',
    speciality: '',
    phone: '',
    email: '',
  },
});

async function handleFormSuccess(outputData: JoinEvolutionUser): Promise<void> {
  joinEvolutionStore.success = await joinEvolutionStore.userSubmitForm(outputData);

  if (timerId) clearTimeout(timerId);

  if (joinEvolutionStore.success) {
    reset(evolutionForm);
    timerId = setTimeout(() => (joinEvolutionStore.success = false), 5000);
    return;
  }

  if (joinEvolutionStore.serverFieldErrors?.length) {
    joinEvolutionStore.serverFieldErrors.forEach((err) => {
      setErrors(evolutionForm, { path: [err.field as any], errors: [err.message] });
    });
  } else if (joinEvolutionStore.serverError) {
    const errorText = joinEvolutionStore.serverError;

    if (errorText === 'Пользователь с таким email уже существует') {
      setErrors(evolutionForm, { path: ['email'], errors: [errorText] });
    }

    if (errorText === 'Пользователь с таким номером уже существует') {
      setErrors(evolutionForm, { path: ['phone'], errors: [errorText] });
    }
  }
}

onUnmounted(() => {
  if (timerId) clearTimeout(timerId);
});
</script>

<template>
  <Form :of="evolutionForm" @submit="handleFormSuccess" class="join-evolution-form">
    <div class="form-top">
      <Field :of="evolutionForm" :path="['name']" v-slot="field">
        <div class="field-wrapper">
          <BaseField label="My name is" placeholder="Your name" type="text" v-model="field.input">
            <UserIcon />
          </BaseField>
          <span v-if="field.errors?.length" class="error-msg">{{ field.errors.join(', ') }}</span>
        </div>
      </Field>
      <Field :of="evolutionForm" :path="['city']" v-slot="field">
        <div class="field-wrapper">
          <BaseSelect placeholder="City" v-model="field.input" />
          <span v-if="field.errors?.length" class="error-msg">{{ field.errors.join(', ') }}</span>
        </div>
      </Field>
      <Field :of="evolutionForm" :path="['speciality']" v-slot="field">
        <div class="field-wrapper">
          <BaseField
            label="And I am"
            placeholder="Work place"
            type="text"
            v-model="field.input"
            v-bind="field.props"
          >
            <BriefcaseIcon />
          </BaseField>
          <span v-if="field.errors?.length" class="error-msg">{{ field.errors.join(', ') }}</span>
        </div>
      </Field>
      <Field :of="evolutionForm" :path="['phone']" v-slot="field">
        <div class="field-wrapper">
          <BaseField
            label="And here"
            placeholder="+7 (___) ___ __-__"
            mask="+7 (###) ###-##-##"
            type="text"
            v-model="field.input"
          >
            <PhoneIcon />
          </BaseField>
          <span v-if="field.errors?.length" class="error-msg">{{ field.errors.join(', ') }}</span>
        </div>
      </Field>
      <Field :of="evolutionForm" :path="['email']" v-slot="field">
        <div class="field-wrapper">
          <BaseField label="Hit me up here" placeholder="Email" type="text" v-model="field.input">
            <MailIcon />
          </BaseField>
          <span v-if="field.errors?.length" class="error-msg">{{ field.errors.join(', ') }}</span>
        </div>
      </Field>
    </div>
    <span class="success-msg" v-if="joinEvolutionStore.success">Успешная регистрация</span>
    <div class="form-bottom">
      <SubmitButton type="submit">Send</SubmitButton>
      <p>By clicking «Send» I am agreed with <RouterLink to="#">Privacy Policy.</RouterLink></p>
    </div>
  </Form>
</template>

<style scoped>
.join-evolution-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.success-msg {
  color: var(--color-success);
  font-weight: 700;
}

.form-top {
  display: grid;
  grid-template-columns: repeat(2, 340px);
  grid-template-rows: repeat(3, auto);
  column-gap: 40px;
  row-gap: 32px;
}

.form-bottom {
  display: flex;
  align-items: center;
  gap: 32px;

  p {
    font-size: 12px;
    font-weight: 900;
    width: 100%;
    max-width: 178px;

    a:hover {
      text-decoration: underline;
    }
  }
}

.form-top > :nth-child(2) {
  grid-column: 2;
  grid-row: 2;
}

.form-top > :nth-child(3) {
  grid-column: 1;
  grid-row: 2;
}

.form-top > :nth-child(4) {
  grid-column: 2;
  grid-row: 3;
}

.form-top > :nth-child(5) {
  grid-column: 1;
  grid-row: 3;
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.error-msg {
  font-weight: 500;
  font-size: 13px;
  color: var(--color-error);
  font-family: var(--font-mark);
}

@media (max-width: 1400px) {
  .form-top {
    grid-template-columns: 290px;
    grid-template-rows: repeat(4, auto);
    column-gap: 25px;
  }

  .form-top > :nth-child(2) {
    grid-row: 1;
  }

  .form-top > :nth-child(4) {
    grid-column: 1;
    grid-row: 4;
  }
}

@media (max-width: 1200px) {
  .form-top {
    grid-template-columns: 250px;
  }
}

@media (max-width: 1023px) {
  .form-top {
    grid-template-columns: 225px;
  }
}

@media (max-width: 991px) {
  .form-top {
    grid-template-columns: 360px;
  }
}

@media (max-width: 767px) {
  .form-top > :nth-child(2) {
    grid-column: auto;
    grid-row: 4;
  }

  .form-top > :nth-child(3) {
    grid-column: auto;
    grid-row: 3;
  }

  .form-top > :nth-child(4) {
    grid-column: auto;
    grid-row: 5;
  }

  .form-top > :nth-child(5) {
    grid-column: auto;
    grid-row: auto;
  }
}

@media (max-width: 480px) {
  .form-top {
    grid-template-columns: 324px;
  }
}
</style>
