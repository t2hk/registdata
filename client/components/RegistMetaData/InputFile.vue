<template>
  <div class="relative pb-4">
    <h1>ファイルアップロード画面</h1>

    <form @submit.prevent="submit">
      <!-- データファイルの登録 -->
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
            データファイルをドラッグ＆ドロップ
            <br>またはクリックでファイル選択
          </p>
        </div>

        <div class="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
          <div class="flex flex-col justify-start items-baseline">
            <h1
              v-if="dataFilePath && dataFilePath.length > 0"
              class="text-lg font-normal mb-0 text-gray-600 font-sans"
            >
              {{ dataFilePath }}
            </h1>
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
      <!-- データファイルの登録 ここまで -->

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        次へ
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
    },
    dataFilePath: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isDragOver: false,
      errors: []
    }
  },
  computed: {
    syncedDataFilePath: {
      get () {
        return this.dataFilePath
      },
      set (val) {
        this.$emit('update:dataFilePath', val)
      }
    }
  },
  methods: {
    submit () {
      this.errors = []
      this.errors = this.errors.concat(this.form.validateDataFilePath())
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
      if (files.length !== 1) {
        return
      }
      this.form.addDataFile(files[0].name, files[0])
    },
    onChange (event) {
      const files = event.target.files
      if (files.length !== 1) {
        return
      }
      this.errors = []
      this.form.addDataFile(files[0].name, files[0])
    }
    /**
    ,
    readBinary (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      console.log(reader.result)
    }
    */
  }
}
</script>

<style>
.data-input {
  background-color: #eee;
  width: 300px;
  height: 100px;
}
.image-input {
  background-color: #eee;
  width: 300px;
  height: 300px;
}
.image-input__field {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-input__field.over {
  background-color: #666;
}
.image-input__field > input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
.image-input__field > p {
  color: #aaa;
  text-align: center;
}
</style>
