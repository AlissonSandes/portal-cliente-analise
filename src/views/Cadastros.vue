<template>
  <v-container>
    <v-row class="mt-6">
      <v-col>
        <p class="text-center">Selecione o cadastro que deseja verificar:</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th class="text-left">Matrícula</th>
                <th class="text-left">Endereço</th>
                <th class="text-center">#</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cadastros" :key="item.id">
                <td>{{ item.matricula }}</td>
                <td>{{ item.endereco }}</td>
                <td>
                  <v-btn color="light-green" small @click="selecionaCadastro(item.id)"><span class="text-white">Selecionar</span></v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  created() {
    if(!this.$route.params.cadastros) {this.$router.push({name:'Home'})}
    let cadastros = this.$route.params.cadastros
    cadastros.forEach(cadastro => {
      this.cadastros.push(
        { id:cadastro.id,
          matricula:cadastro.matricula,
          endereco: `${cadastro.endereco}, ${cadastro.numero}, ${cadastro.bairro} - ${cadastro.uf}`
        }
      )
    });
  },
  data() {
    return {
      titulos: [
        { text: "Matrícula", value: "matricula" },
        { text: "Endereço", value: "endereco" },
      ],
      cadastros: [
        
      ],
    };
  },
  methods: {
    selecionaCadastro(id){
      console.log(id)
    }
  },
};
</script>
<style >
.text-white {
  color: white;
}
</style>