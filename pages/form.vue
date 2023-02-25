<script lang="ts" setup>
const formState = useFormState()

const handleSubmit = async (event: any) => {
  const result = await event
  if (result.valid) {
    console.log(formState.value)
  }
}

const fieldTest = (val: any, field: keyof typeof UserSchema) => {
  const res = UserSchema[field].safeParse(val)
  return res.success ? true : res.error.errors[0].message
}

const fieldRules = {
  firstName: (val: any) => fieldTest(val, 'firstName'),
  lastName: (val: any) => fieldTest(val, 'lastName'),
  email: (val: any) => fieldTest(val, 'email'),
  contact: (val: any) => fieldTest(val, 'contact'),
  address: (val: any) => fieldTest(val, 'address')
}
</script>

<template>
  <VContainer>
    <Header title="Create User" subtitle="Create a Nuew User Profile" />
    <VForm @submit.prevent="handleSubmit">
      <VContainer>
        <VRow>
          <VCol>
            <VTextField v-model="formState.firstName" :rules="[fieldRules.firstName]" label="First name"
              color="primary" />
          </VCol>
          <VCol>
            <VTextField v-model="formState.lastName" :rules="[fieldRules.lastName]" label="Last name" color="primary" />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VTextField v-model="formState.email" :rules="[fieldRules.email]" label="Email" color="primary" />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VTextField v-model="formState.contact" :rules="[fieldRules.contact]" label="Contact" color="primary" />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VTextField v-model="formState.address" :rules="[fieldRules.address]" label="Address" color="primary" />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="1">
            <VBtn type="submit" color="secondary">Submit</VBtn>
          </VCol>
          <VCol cols="1">
            <VBtn type="reset" variant="outlined" color="neutral">Reset</VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </VForm>
  </VContainer>
</template>
