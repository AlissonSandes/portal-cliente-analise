<template>
  <v-container class="mt-6">
    <v-row>
      <v-col>
        <v-simple-table fixed-header height="80vh" class="table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left table-header">Numdoc</th>
                <th class="text-left table-header">Vencimento</th>
                <th class="text-left table-header">Valor</th>
                <th class="text-center table-header">Copiar Cod.Barras</th>
                <th class="text-center table-header">Baixar PDF</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in titulos" :key="item.id">
                <td v-bind:class="{ 'baixado' : isBaixado(item)}">{{ item.numdoc }}</td>
                <td v-bind:class="{ 'baixado' : isBaixado(item)}">{{ formatarData(item.vencimento) }}</td>
                <td v-bind:class="{ 'baixado' : isBaixado(item)}">{{ item.valor }}</td>
                <td class="text-center">
                  <button v-if="item.situacao == 'A'" @click="copiarCodBarras(item.codbarras)">
                    <v-icon>mdi-barcode</v-icon>
                  </button>
                  <v-icon v-else>mdi-success</v-icon>
                </td>
                <td class="text-center">
                  <button v-if="item.situacao == 'A'">
                    <v-icon>mdi-download</v-icon>
                  </button>
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
  data() {
    return {
      titulos: [],
    };
  },
  mounted() {
    this.titulos = this.$route.params.titulos;
  },
  methods: {
    copiarCodBarras(codbarras) {
      navigator.clipboard.writeText(codbarras);
      alert("Código de barras copiado com sucesso!");
    },
    formatarData(data){
        let ano = data.substring(0,4)
        let mes = data.substring(5,7)
        let dia = data.substring(8,10)
        return `${dia}/${mes}/${ano}`
    },
    formatarValor(){
        //todo
    },
    downloadPDF(){
        //todo
    },
    isBaixado(item){
        if(item.situacao == 'B'){
            return true
        }
        return false
    }
  },
};
</script>
<style>
.table {
  border-width: 1px;
  border-style: solid;
  border-color: #558b2f8f;
  box-shadow: -5px -0px #558b2f;
}
.table-header {
  border-bottom: thin solid #4b792a79 !important;
  color: #558b2f8f !important;
}
.baixado{
    color:#558b2f !important;
}
</style>