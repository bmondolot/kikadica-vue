<template>
    <div>
        <button @click="showModal = true">
            Ajouter une citation
        </button>
        <transition name="modal">
            <div v-if="showModal" class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                        <div class="modal-header">
                            <slot name="header">
                                Ajout d'une citation
                            </slot>
                        </div>

                        <div class="modal-body">
                            <slot name="body">
                                <div>
                                    <label>Kikiladit</label>
                                    <multiselect v-model="quotedUser" tag-placeholder="Ajouter une nouvelle personne" placeholder="Rechercher ou ajouter" :options="peopleList" :taggable="true" @tag="addNewQuotedUser" select-label="(Entrer pour sélectionner)" selected-label="Choisi" deselect-label="" :hide-selected="true"></multiselect>
                                </div>
                                <div>
                                    <label for="quoteText">Citation</label>
                                    <textarea id="quoteText" v-model="quoteText" />
                                </div>
                                <div>
                                    <label>Kikilamis</label>
                                    <multiselect v-model="author" tag-placeholder="Ajouter une nouvelle personne" placeholder="Rechercher ou ajouter" :options="peopleList" :taggable="true" @tag="addNewAuthor" select-label="(Entrer pour sélectionner)" selected-label="Choisi" deselect-label="" :hide-selected="true"></multiselect>
                                </div>
                                <div>
                                    <label for="creationDate">Quand</label>
                                    <date-picker id="creationDate" v-bind:date="creationDate" v-bind:option="timeOption">
                                </div>
                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">
                                <button class="modal-default-button" @click="showModal = false">
                                    Annuler
                                </button>
                                <button class="modal-default-button" @click="submitForm()">
                                    Valider
                                </button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import config from '../config'
import moment from 'moment'
import Datepicker from 'vue-datepicker'
import Multiselect from 'vue-multiselect'

export default {
  name: 'add-quote-modal',
  components: {
    'date-picker': Datepicker,
    Multiselect
  },
  data () {
    return {
      showModal: false,
      author: '',
      quoteText: '',
      quotedUser: '',
      creationDate: {
        time: moment().format('DD/MM/YYYY HH:mm')
      },
      timeOption: {
        type: 'min',
        week: ['Lu', 'Ma', 'Mer', 'Je', 'Ve', 'Sa', 'Di'],
        month: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        format: 'DD/MM/YYYY HH:mm',
        buttons: {
          ok: 'Ok',
          cancel: 'Annuler'
        }
      },
      peopleList: [
        'Moi',
        'Toi'
      ]
    }
  },
  created () {
    this.getPeopleList()
  },
  methods: {
    submitForm: function () {
      // TODO : Validate inputs
      let quote = {}
      quote.creationDate = this.creationDate
      quote.text = this.quoteText
      quote.authorUser = this.author
      quote.quotedUser = this.quotedUser

      this.$http.put(config.API_URL + '/quote', quote).then((response) => {
        this.showModal = false
      })
    },
    addNewAuthor (newName) {
      this.peopleList.push(newName)
      this.author = newName
    },
    addNewQuotedUser (newName) {
      this.peopleList.push(newName)
      this.quotedUser = newName
    },
    getPeopleList: function () {
      this.$http.get(config.API_URL + '/users').then((response) => {
        this.peopleList = response.data
      }, (response) => {
        console.log('People list could not be populated')
      })
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
