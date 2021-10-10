<template>
  <div class="relative pb-4">
    <h1>確認画面</h1>

    <form @submit.prevent="submit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label class="mb-4">メタデータの名前:</label>
        <input :value="form.samplePictFilePath" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readonly>
      </div>
      <div class="mt-5">
        <label class="mb-4">登録者メールアドレス:</label>
        <input type="email" :value="form.registrarEmail" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readonly>
      </div>

      <!-- サンプル画像ファイルのプレビュー ここから -->
      <div class="container mt-5 sm:flex sm:flex-row">
        <div class="p-3 w-full sm:w-1/2">
          <!-- ファイル名表示 ここから -->
          <div class="mt-5">
            <label class="text-sm font-bold text-gray-500 tracking-wide">サンプル画像ファイル名</label>
            <div class="bg-white">
              <input type="text" :value="form.samplePictFilePath" readonly class="w-full" />
            </div>
          </div>
          <!-- ファイル名表示 ここまで -->
        </div>
        <!-- プレビュー ここから -->
        <div class="flex items-center w-308  p-3 border-4 border-dashed border-gray-400">
          <div class="flex w-308 h-308 justify-center">
            <img class="object-scale-down" v-bind:src="syncedSamplePictPreview">
          </div>
        </div>
        <!-- プレビュー ここまで -->
      </div>
      <!-- サンプル画像ファイルのプレビュー ここまで -->

      <!-- イメージ画像ファイルの登録 ここから -->
      <div class="container mt-5 sm:flex sm:flex-row">
        <div class="p-3 w-full sm:w-1/2">
          <!-- ファイル名表示 ここから -->
          <div class="mt-5">
            <label class="text-sm font-bold text-gray-500 tracking-wide">イメージ画像ファイル名</label>
            <div class="bg-white">
              <input type="text" :value="form.imagePictFilePath" readonly class="w-full" />
            </div>
          </div>
          <!-- ファイル名表示 ここまで -->
        </div>
        <!-- プレビュー ここから -->
        <div class="flex items-center w-208 p-3 border-4 border-dashed border-gray-400">
          <div class="flex w-208 h-108 justify-center">
            <img class="object-scale-down" v-bind:src="syncedImagePictPreview">
          </div>
        </div>
        <!-- プレビュー ここまで -->
      </div>
      <!-- イメージ画像ファイルの登録 ここまで -->

      <!-- 一時保存、登録、戻るボタン ここから -->
      <div class="mt-2 flex items-center justify-center space-x-4">
        <button type="button" @click="$emit('back')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">戻る</button>
        <button type="button" v-on:click="saveRegistForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">一時保存</button>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">登録</button>
      </div>
      <!-- 次へ、戻るボタン ここまで -->
    </form>
  </div>
  <!--
  <div>
    <h1>確認画面</h1>

    <form @submit.prevent="submit">
      <div>サンプル画像パス: {{ form.samplePictFilePath }}</div>
      <div>登録者アドレス: {{ form.registrarEmail }}</div>
      <div>メタデータ名: {{ form.metaDataName }}</div>
      <div>データファイル画像パス: {{ form.imagePictFilePath }}</div>
      <div>
        <img v-bind:src="form.samplePictPreview">
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
  -->
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
  computed: {
    syncedSamplePictPreview: {
      get () {
        return this.form.samplePictPreview
      }
    },
    syncedImagePictPreview: {
      get () {
        return this.form.imagePictPreview
      }
    }
  },
  methods: {
    saveRegistForm () {
      alert('一時保存しました。')
      this.$store.commit('setRegistForm', this.form)
    },
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
