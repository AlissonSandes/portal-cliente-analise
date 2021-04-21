<template>
  <v-container class="mt-6">
    <v-row class="no-gutters">
      <v-col
        class="col-xs-12 offset-sm-2 col-sm-8 offset-lg-3 col-lg-6 px-auto"
      >
        <v-card elevation="2" class="align-self-center" outlined shaped>
          <h2 class="text-center mt-5 pt-5 text-darkgreen">
            Login - Painel do cliente
          </h2>
          <form class="ma-5 px-6">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :counter="15"
              label="Nome"
              color="light-green"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="cpf"
              :error-messages="cpfErrors"
              :counter="11"
              maxLength="11"
              label="CPF"
              color="light-green"
              required
              numeric
              @input="$v.cpf.$touch()"
              @blur="$v.cpf.$touch()"
            ></v-text-field>
            <v-row>
              <v-col v-if="!loading" class="text-center">
                <v-btn
                  v-if="isFormValidated"
                  class="justify-end text-white my-5"
                  color="light-green"
                  elevation="2"
                  @click="submit"
                >
                  <span class="text-white">Localizar cadastro</span>
                </v-btn>
                <v-btn
                  v-else
                  class="justify-end text-white my-5"
                  color="light-green"
                  elevation="2"
                  @click="submit"
                  disabled
                >
                  <span class="text-white">Localizar cadastro</span>
                </v-btn>
              </v-col>
              <v-col class="text-center" v-if="loading">
                <v-btn loading disabled class="text-white"></v-btn>
              </v-col>
            </v-row>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  numeric,
} from "vuelidate/lib/validators";
import { validate } from "gerador-validador-cpf";
import axios from "axios";
//import VueAxios from "vue-axios";

const validaCpf = (value) => validate(value);

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(15), minLength: minLength(3) },
    cpf: { required, validaCpf, numeric },
  },

  data: () => ({
    name: "",
    cpf: "",
    cadastros: [],
    loading:false
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 15 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      errors.length > 0 ? true : false;
      return errors;
    },
    cpfErrors() {
      const errors = [];
      if (!this.$v.cpf.$dirty) return errors;
      !this.$v.cpf.numeric &&
        errors.push("O campo CPF deve conter apenas números.");
      !this.$v.cpf.validaCpf &&
        errors.push("Essa combinação de dígitos não é válida para o campo CPF");
      !this.$v.cpf.required && errors.push("CPF é um campo obrigatório");
      errors.length > 0 ? true : false;
      return errors;
    },
  },

  methods: {
    isFormValidated() {
      return this.nameErrors.length == 0 && this.cpfErrors.length == 0
        ? true
        : false;
    },

    async submit() {
      this.$v.$touch();
      if (this.isFormValidated()) {
        let nome = this.name;
        let cpf = this.cpf;
        this.loading=true;
        //this.cadastros = await (await fetch(`https://cobpag-api.vercel.app/api/buscarcliente?nome=${encodeURI(nome)}&cpf=${encodeURI(cpf)}`)).body
        axios
          .get(
            `https://cobpag-api.vercel.app/api/buscarcliente?nome=${encodeURI(
              nome
            )}&cpf=${encodeURI(cpf)}`
          ).then((response) => {
            this.cadastros = response.data
            if(this.cadastros[0].id){
              console.log(response.data)
              this.$router.push({ name: 'Cadastros', params: { cadastros: this.cadastros } })
              
            }else{
              alert('Não foi possível localizar nenhum cadastro com os dados informados.')
              this.loading=false
            }
          });
          // .then((response) => (this.cadastros = response.body));
      }
    },
  },
};
</script>
<style>
h2 {
  font-size: 1.5em !important;
  font-weight: 400;
}
.text-white {
  color: white;
}
.text-darkgreen {
  color: #558b2f;
}
</style>