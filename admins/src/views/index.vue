<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="id"
      :rules="idRules"
      :counter="10"
      label="id"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      id: '',
      idRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    })
  }
</script>