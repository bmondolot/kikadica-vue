 <template>
  <router-link :to="{ name: 'user', params: { name: name }}">{{ name }}</router-link>
 </template>

<script>
export default {
  name: 'user-link',
  props: ['name'],
  methods: {

  }
}

</script>

