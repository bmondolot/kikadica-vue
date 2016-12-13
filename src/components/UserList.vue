 <template>
 	<div class="simple-list">
      <h2>{{ listTitle }}</h2>
      <ul>
        <li v-for="item in items">
          <user-link v-bind:name="item._id"></user-link> : {{ item.totalQuotes }}
        </li>
      </ul>
    </div>
 </template>

<script>
import UserLink from './UserLink.vue'

export default {
  name: 'user-list',
  props: ['items', 'listTitle'],
  components: { UserLink }
}

</script>

