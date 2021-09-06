<template>
  <div class="relative pb-4">
    <h1>メタデータ入力画面</h1>

    <form @submit.prevent="submit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label class="mb-4">メタデータの名前:</label>
        <input v-model="syncedMetaDataName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label class="mb-4">登録者メールアドレス:</label>
        <input v-model="syncedRegistrarEmail" type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <!-- データファイル画像の登録 -->
      <div class="bg-white shadow-md h-96 mx-3  rounded-3xl flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-3/5 md:w-100">
        <div
          class="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2 image-input__field"
          :class="{'over': isDragOver}"
          @dragover.prevent="onDrag('over')"
          @dragleave="onDrag('leave')"
          @drop.stop="onDrop"
        >
          <input
            type="file"
            title
            @change="onChange"
          >
          <p>
            データファイルの画像をドラッグ＆ドロップ
            <br>またはクリックでファイル選択
          </p>
        </div>

        <div class="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
          <div class="flex flex-col justify-start items-baseline">
            <h1
              v-if="dataPictFilePath && dataPictFilePath.length > 0"
              class="text-lg font-normal mb-0 text-gray-600 font-sans"
            >
              {{ dataPictFilePath }}
            </h1>
            <img v-bind:src="syncedDataPictPreview">
            <ul class="error-list">
              <li
                v-for="err in errors"
                :key="err"
              >
                {{ err }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- データファイル画像の登録 ここまで -->

      <ul class="error-list">
        <li v-for="err in errors" :key="err">{{err}}</li>
      </ul>

      <button type="button" @click="$emit('back')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">戻る</button>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">次へ</button>
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
    },
    metaDataName: {
      type: String,
      required: true
    },
    registrarEmail: {
      type: String,
      required: true
    },
    dataPictFilePath: {
      type: String,
      required: true
    },
    dataPictPreview: {
      type: String,
      required: false
    }
  },
  computed: {
    syncedMetaDataName: {
      get () {
        return this.metaDataName
      },
      set (val) {
        this.$emit('update:metaDataName', val)
      }
    },
    syncedRegistrarEmail: {
      get () {
        return this.registrarEmail
      },
      set (val) {
        this.$emit('update:registrarEmail', val)
      }
    },
    syncedDataPictFilePath: {
      get () {
        return this.dataPictFilePath
      },
      set (val) {
        this.$emit('update:dataPictFilePath', val)
      }
    },
    syncedDataPictPreview: {
      get () {
        return this.dataPictPreview
      },
      set (val) {
        this.$emit('update:dataPictPreview', val)
      }
    }
  },
  data () {
    return {
      isDragOver: false,
      errors: []
    }
  },
  methods: {
    submit () {
      this.errors = []
      this.errors = this.errors.concat(this.form.validateMetaDataName())
      this.errors = this.errors.concat(this.form.validateRegistrarEmail())
      if (this.errors.length > 0) {
        return
      }

      this.$emit('next')
    },
    onDrag (type) {
      this.isDragOver = type === 'over'
    },
    onDrop (event) {
      this.isDragOver = false
      const files = event.dataTransfer.files
      if (files.length !== 1 || files[0].type.indexOf('image') !== 0) {
        return
      }
      this.form.addDataPictFile(files[0].name, files[0])
      this.readImage(files[0])
    },
    onChange (event) {
      const files = event.target.files
      if (files.length !== 1 || files[0].type.indexOf('image') !== 0) {
        return
      }
      this.form.addDataPictFile(files[0].name, files[0])
      this.readImage(files[0])
    },
    readImage (file) {
      const reader = new FileReader()
      reader.onload = this.loadImage
      reader.readAsDataURL(file)
    },
    loadImage (e) {
      this.form.addDataPictPreview(e.target.result)
    }
  }
}
</script>
