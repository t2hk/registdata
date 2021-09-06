<template>
  <div>
    <h1>確認画面</h1>

    <form @submit.prevent="submit">
      <div>データファイルパス: {{ form.dataFilePath }}</div>
      <div>登録者アドレス: {{ form.registrarEmail }}</div>
      <div>メタデータ名: {{ form.metaDataName }}</div>
      <div>データファイル画像パス: {{ form.dataPictFilePath }}</div>
      <div>
        <img v-bind:src="form.dataPictPreview">
      </div>

      <button
        type="button"
        @click="$emit('back')">
        戻る
      </button>

      <button type="submit">
        登録する
      </button>
    </form>
  </div>
</template>

<script>
import MetaDataForm from '@/forms/MetaDataForm'

export default {
  props: {
    form: {
      type: MetaDataForm,
      required: true
    }
  },
  methods: {
    async submit () {
      // Call API
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const formData = this.form.getFormData()

      await this.$axios.$post('/api/metadata', formData, config)
        .then(res => {
          console.log(res)
          this.form.clear()

          this.$emit('next')
        }).catch(error => {
          console.log(error.response)
        })
    }
  }
}
</script>
