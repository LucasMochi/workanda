<template>
    <v-data-table :items="users" :headers="headers">
      <template v-slot:item.actions="{ item }">
        <v-btn @click="$emit('editUser', item)" color="warning" class="mr-2">Editar</v-btn>
        <v-btn @click="$emit('deleteUser', item.id)" color="error">Eliminar</v-btn>
      </template>
    </v-data-table>
  </template>
  
  <script>
  export default {
    props: {
      users: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'First Name', value: 'firstName' },
          { text: 'Last Name', value: 'lastName' },
          { text: 'Email', value: 'email' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  </style>
  