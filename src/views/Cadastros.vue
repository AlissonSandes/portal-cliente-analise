<template>
  <v-container>
    <v-row class="mt-6">
      <v-col>
        <p class="text-center table-rows">Selecione o cadastro que deseja verificar:</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table class="table">
          <template>
            <thead>
              <tr class="green-border-down">
                <th class="text-left table-header">Matrícula</th>
                <th class="text-left table-header">Endereço</th>
                <th class="text-right table-header">#</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cadastros" :key="item.id">
                <td class="table-rows">{{ item.matricula }}</td>
                <td class="table-rows">{{ item.endereco }}</td>
                <td class="text-right table-rows">
                  <v-btn color="light-green text-right" small @click="selecionaCadastro(item.id)"><span class="text-white">Selecionar</span></v-btn>
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
.table{
  border-width:1px;
  border-style: solid;
  border-color: #558b2f8f;
  box-shadow: -5px -0px #558b2f;
}
.table-header{
  border-bottom: thin solid #4b792a79 !important;
  color:#558b2f8f !important;
}
.table-rows{
  color:#37581f !important;
}
</style>