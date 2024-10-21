<template>
  <v-container>
    <v-row class="mb-2">
      <v-col>
        <v-btn color="primary" @click="openAddUserModal">Crear Usuario</v-btn>
      </v-col>
    </v-row>
    <UserList
      :users="users"
      @editUser="openEditUserModal"
      @deleteUser="deleteUser"
    />
    <v-dialog v-model="userModal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            isEditing ? "Editar" : "Crear"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="userForm" v-model="formValid" @submit.prevent="saveUser">
            <v-text-field
              v-model="userForm.firstName"
              label="Nombre"
              required
            ></v-text-field>
            <v-text-field
              v-model="userForm.lastName"
              label="Apellido"
              required
            ></v-text-field>
            <v-text-field
              v-model="userForm.email"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-if="!isEditing"
              v-model="userForm.password"
              label="Contraseña"
              type="password"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeUserModal"
            >Cancelar</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="saveUser"
            :disabled="!formValid"
          >
            {{ isEditing ? "Editar" : "Crear" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import UserList from "@/components/UserList.vue";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/userService";

export default {
  components: {
    UserList,
  },
  data() {
    return {
      users: [],
      userModal: false,
      isEditing: false,
      formValid: false,
      userForm: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  created() {
    this.loadUsers(); 
  },
  methods: {
    async loadUsers() {
      try {
        const response = await getUsers();
        this.users = response;
      } catch (err) {
        console.error("Error loading users:", err.message);
      }
    },
    async saveUser() {
      try {
        if (this.isEditing) {
          await updateUser(this.userForm.id, {
            firstName: this.userForm.firstName,
            lastName: this.userForm.lastName,
            email: this.userForm.email,
          });
        } else {
          await createUser({
            firstName: this.userForm.firstName,
            lastName: this.userForm.lastName,
            email: this.userForm.email,
            password: this.userForm.password,
          });
        }
        this.loadUsers();
        this.closeUserModal();
      } catch (err) {
        console.error("Error saving user:", err.message);
      }
    },
    openAddUserModal() {
      this.isEditing = false;
      this.userForm = {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
      this.formValid = true;
      this.userModal = true;
    },
    openEditUserModal(user) {
      this.isEditing = true;
      this.userForm = { ...user, password: "" };
      this.formValid = true;
      this.userModal = true;
    },
    closeUserModal() {
      this.userModal = false;
      this.formValid = false;
    },
    resetUserForm() {
      this.userForm = {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
      this.formValid = false;
    },
    async deleteUser(id) {
      try {
        await deleteUser(id);
        this.loadUsers();
      } catch (err) {
        console.error("Error deleting user:", err.message);
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
